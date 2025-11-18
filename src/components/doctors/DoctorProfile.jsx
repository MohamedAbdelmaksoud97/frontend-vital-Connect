import React, { use, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDoctor } from "@/hooks/useDoctors"; // or "@/hooks/useDoctor" if that's your file
import { useUser } from "@/hooks/useUser";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import InitialsAvatar from "@/components/ui/InitialsAvatar";
import BookingModal from "@/components/doctors/BookingModal";
import { useNavigate } from "react-router-dom";

function money(n, currency = "EGP") {
  return typeof n === "number"
    ? new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(n)
    : "—";
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-gray-700 dark:border-gray-700 dark:text-gray-200">
      {children}
    </span>
  );
}

// BookingModal-friendly profile
function toProfileFromApiDoctor(d) {
  const u = d?.userId || {};
  const clinic = d?.clinic || {};
  return {
    clinic: {
      name: clinic.name || `${d?.specialization || "General"} Care Clinic`,
      address: clinic.address || "—",
      city: clinic.city || "—",
    },
    userId: {
      name: u.name || "Unknown Doctor",
      email: u.email || "",
      phone: u.phone || "",
    },
    specialization: d?.specialization || "General",
    experience: d?.experience ?? "—",
    consultationFee: d?.consultationFee,
    availableDays: d?.availableDays || [],
    availableSlots: d?.availableSlots || [],
    rating: d?.rating ?? 0,
    reviewsCount: d?.reviewsCount ?? 0,
  };
}

export default function ProfilePage() {
  const { id } = useParams();
  const { data: doctor, isLoading, isError, error } = useDoctor(id);
  const navigate = useNavigate();

  console.log("DoctorProfile doctor:", doctor);

  const { data: me } = useUser();
  const patientId = me?.patientProfile?._id; // from your API
  console.log(patientId);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const bookingProfile = useMemo(
    () => (doctor ? toProfileFromApiDoctor(doctor) : null),
    [doctor],
  );

  const handleConfirmBooking = (payload) => {
    setIsBookingOpen(false);
    alert(
      `Appointment successfully booked with ${payload.profile.userId.name} on ${payload.date} at ${payload.slot}!`,
    );
  };

  if (isLoading) {
    return (
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-48 animate-pulse rounded-2xl bg-gray-200 lg:col-span-2 dark:bg-gray-800" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !doctor) {
    return (
      <section className="mt-12 md:mt-16">
        <Link to="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <Card className="mt-4">
          <CardContent className="text-sm text-red-600 dark:text-red-400">
            {error?.message || "Doctor not found."}
          </CardContent>
        </Card>
      </section>
    );
  }

  const {
    userId,
    clinic,
    specialization,
    experience,
    consultationFee,
    rating,
    reviewsCount,
    availableDays,
    availableSlots,
    status,
  } = doctor;
  const name = userId?.name || "Unknown Doctor";

  return (
    <section className="mt-12 md:mt-16">
      <div className="mb-5 flex items-center gap-3">
        <Link to="/">
          <Button variant="outline">← Back</Button>
        </Link>
      </div>

      {/* Header */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <InitialsAvatar name={name} doc={doctor} size={56} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl leading-tight font-bold">{name}</h1>
                  <Pill>{specialization || "General"}</Pill>
                  {status && <Pill>{status}</Pill>}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
                  <span className="inline-flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="font-medium">
                      {Number(rating || 0).toFixed(1)}
                    </span>
                    <span className="text-gray-500">({reviewsCount || 0})</span>
                  </span>
                  <span className="text-gray-500">•</span>
                  <span>
                    {typeof experience === "number"
                      ? `${experience} years experience`
                      : "Experience —"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() =>
                  me ? setIsBookingOpen(true) : navigate("/login")
                }
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-base font-semibold">Clinic</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                    Name
                  </span>
                  <span>{clinic?.name || "—"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                    Address
                  </span>
                  <span>
                    {clinic?.address
                      ? `${clinic.address}${clinic?.city ? `, ${clinic.city}` : ""}`
                      : "—"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                    Fee
                  </span>
                  <span>{money(consultationFee)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-base font-semibold">Availability</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    Days
                  </p>
                  {availableDays?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {availableDays.map((d, i) => (
                        <Pill key={`day-${i}`}>{d}</Pill>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No days set</p>
                  )}
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    Slots
                  </p>
                  {availableSlots?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((s, i) => (
                        <Pill key={`slot-${i}`}>{s}</Pill>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No slots set</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="text-base font-semibold">Contact</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                    Email
                  </span>
                  <span>{userId?.email || "—"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                    Phone
                  </span>
                  {userId?.phone ? (
                    <a
                      className="text-[#377b87] hover:underline"
                      href={`tel:${userId.phone}`}
                    >
                      {userId.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        profile={bookingProfile}
        doctorId={doctor._id} // required for POST
        patientId={patientId} // from useUser()
        bookingFee={consultationFee} // use doctor’s fee
        onConfirm={handleConfirmBooking}
      />
    </section>
  );
}
