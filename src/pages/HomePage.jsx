import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import Tabs from "../components/ui/Tabs";
import DoctorCard from "../components/doctors/DoctorCard";
import BookingModal from "../components/doctors/BookingModal";
import { Card, CardContent } from "../components/ui/Card";
import { SPECIALTIES } from "../lib/data";
import { useDoctors } from "@/hooks/useDoctors";
import { useUser } from "@/hooks/useUser";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFor, setBookingFor] = useState(null);
  const [selectedDoctorMeta, setSelectedDoctorMeta] = useState(null);

  const navigate = useNavigate();
  const { data: me } = useUser();
  const patientId = me?.patientProfile?._id; // from your API
  const { data: doctors = [], isLoading, isError, error } = useDoctors();

  const filteredDoctors = useMemo(() => {
    let list = doctors;
    if (activeTab !== "All")
      list = list.filter((d) => d.specialization === activeTab);
    if (!query.trim()) return list;

    const q = query.trim().toLowerCase();
    return list.filter((d) => {
      const name = d?.userId?.name?.toLowerCase() || "";
      const spec = d?.specialization?.toLowerCase() || "";
      const loc = (d?.clinic?.city || d?.clinic?.address || "").toLowerCase();
      return name.includes(q) || spec.includes(q) || loc.includes(q);
    });
  }, [doctors, activeTab]);

  const handleViewProfile = (doc) => {
    const id = String(doc?._id || doc?.id);
    if (id) navigate(`/doctors/${id}`);
  };

  const performSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toProfileFromApi = (d) => {
    const u = d?.userId || {};
    const clinic = d?.clinic || {};
    return {
      clinic: {
        name: clinic.name || `${d?.specialization || "General"} Care Clinic`,
        address: clinic.address || "—",
        city: clinic.city || "—",
        lat: clinic.lat,
        lng: clinic.lng,
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
  };

  const openBookingWithDoc = (doc) => {
    setBookingFor(toProfileFromApi(doc));
    setSelectedDoctorMeta({
      doctorId: doc._id || doc.id,
      bookingFee: doc.consultationFee,
    });
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (payload) => {
    console.log("Booking Confirmed:", payload);
    setIsBookingOpen(false);
    alert(
      `Appointment successfully booked with ${payload.profile.userId.name} on ${payload.date} at ${payload.slot}!`,
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <span className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-[#377b87]/10 px-3 py-1 text-xs font-medium text-[#377b87]">
          <span className="h-2 w-2 rounded-full bg-[#377b87]" />
          Your health, one search away
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Find a trusted doctor near you
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
          Search by doctor name or specialization, compare profiles, and book in
          minutes.
        </p>
        <div className="mt-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={performSearch}
          />
        </div>
      </section>

      {/* Browse */}
      <section className="mt-12 md:mt-16">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold md:text-2xl">Browse Doctors</h2>
        </div>

        <Tabs tabs={SPECIALTIES} value={activeTab} onChange={setActiveTab} />

        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-6">
            <Card>
              <CardContent className="text-sm text-red-600 dark:text-red-400">
                Failed to load doctors: {error?.message || "Unknown error"}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDoctors.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="text-center text-gray-600 dark:text-gray-300">
                    No doctors found. Try a different filter.
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredDoctors.map((doc) => (
                <DoctorCard
                  key={String(doc._id || doc.id)}
                  doc={doc}
                  onViewProfile={handleViewProfile}
                  onBook={openBookingWithDoc}
                />
              ))
            )}
          </div>
        )}
      </section>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        profile={bookingFor}
        doctorId={selectedDoctorMeta?.doctorId} // required for POST
        patientId={patientId} // from useUser()
        bookingFee={selectedDoctorMeta?.bookingFee}
        onConfirm={handleConfirmBooking}
      />
    </>
  );
}
