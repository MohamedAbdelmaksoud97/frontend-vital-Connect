import React from "react";
import { Card, CardContent } from "../ui/Card";
import InitialsAvatar from "../ui/InitialsAvatar";
import Button from "../ui/Button";

export default function UserProfile({ profile }) {
  if (!profile) return null;
  const {
    clinic = {},
    userId = {},
    specialization,
    experience,
    consultationFee,
    availableDays = [],
    availableSlots = [],
    rating = 0,
    reviewsCount = 0,
  } = profile;

  const formatMoney = (n) =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-EG", {
          style: "currency",
          currency: "EGP",
          maximumFractionDigits: 0,
        }).format(n)
      : "—";
  const InfoRow = ({ label, children }) => (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-40 shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
  const Pill = ({ children }) => (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-gray-700 dark:border-gray-700 dark:text-gray-200">
      {children}
    </span>
  );
  const SectionTitle = ({ children }) => (
    <h3 className="text-base font-semibold">{children}</h3>
  );

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <InitialsAvatar name={userId?.name || "Doctor"} />
            <div>
              <h2 className="text-xl leading-tight font-bold">
                {userId?.name || "—"}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {specialization || "—"}
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                <div
                  className="flex items-center gap-1"
                  title={`${rating} / 5`}
                >
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
                </div>
                <span className="text-gray-500">•</span>
                <span>{reviewsCount || 0} reviews</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={profile?.onBook}>Book Appointment</Button>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
              <SectionTitle>Clinic</SectionTitle>
              <div className="mt-3 space-y-2 text-sm">
                <InfoRow label="Name">{clinic?.name || "—"}</InfoRow>
                <InfoRow label="Address">
                  {clinic?.address ? (
                    <span>
                      {clinic.address}
                      {clinic?.city ? `, ${clinic.city}` : ""}
                    </span>
                  ) : (
                    "—"
                  )}
                </InfoRow>
                <InfoRow label="Phone">
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
                </InfoRow>
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
              <SectionTitle>Details</SectionTitle>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label="Experience">
                  {typeof experience === "number" ? `${experience} years` : "—"}
                </InfoRow>
                <InfoRow label="Consultation Fee">
                  {formatMoney(consultationFee)}
                </InfoRow>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
              <SectionTitle>Availability</SectionTitle>
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
