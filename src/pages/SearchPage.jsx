import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetDoctors } from "../hooks/useGetDoctors";
import { useUser } from "../hooks/useUser"; // For patientId
import SearchBar from "../components/ui/SearchBar";
import DoctorCard from "../components/doctors/DoctorCard";
import BookingModal from "../components/doctors/BookingModal";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

// This helper transforms the raw API data into the shape
// the BookingModal and DoctorCard expect.
// We had this in HomePage, and it's needed here too.
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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Get query param from URL
  const q = searchParams.get("q") || "";

  const [query, setQuery] = useState(q); // Local state for the search bar input
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFor, setBookingFor] = useState(null);
  const [selectedDoctorMeta, setSelectedDoctorMeta] = useState(null);

  // Get user data to find the patientId for booking
  const { data: me } = useUser();
  const patientId = me?.patientProfile?._id;

  // Sync URL query param to local state when URL changes
  useEffect(() => {
    setQuery(q);
  }, [q]);

  // 2. Build the filter object for our API hook
  const filters = {
    q: q, // We map the URL's 'q' param to the API's 'name' filter
    // We could add more here, e.g., city: searchParams.get('city')
  };

  // 3. Call the API hook
  const {
    data: doctors, // This is the array of doctors from the API
    isLoading,
    isError,
    error,
  } = useGetDoctors(filters, {
    enabled: !!q, // Only run the query if 'q' is not empty
  });

  const handleViewProfile = (doc) => {
    navigate(`/doctors/${doc._id}`); // API uses _id
  };

  // This function updates the URL, which triggers a refetch
  const performSearch = () => {
    setSearchParams({ q: query });
  };

  const openBookingWithDoc = (doc) => {
    // 'doc' is the raw API data
    setBookingFor(toProfileFromApi(doc)); // Transform it for the modal
    setSelectedDoctorMeta({
      doctorId: doc._id,
      bookingFee: doc.consultationFee,
    });
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (payload) => {
    console.log("Booking Confirmed:", payload);
    setIsBookingOpen(false);
    // You should show a success toast/modal here instead of alert
    alert(
      `Appointment successfully booked with ${payload.profile.userId.name} on ${payload.date} at ${payload.slot}!`,
    );
  };

  const resultsCount = doctors ? doctors.length : 0;

  return (
    <>
      <section>
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              ← Back
            </Button>
            <h2 className="text-xl font-bold">Search Results</h2>
          </div>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={performSearch}
          />
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            {isLoading
              ? "Searching..."
              : `${resultsCount} result(s)${q ? ` for "${q}"` : ""}`}
          </p>

          {/* Render states: Loading, Error, No Results, Success */}
          {isLoading && (
            <div className="mt-6 text-center">Loading...</div> // Add skeleton loaders here
          )}

          {isError && (
            <Card className="mt-6">
              <CardContent className="text-center text-red-500">
                Failed to load results: {error?.message || "Unknown error"}
              </CardContent>
            </Card>
          )}

          {!isLoading && !isError && (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {doctors && doctors.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="text-center text-gray-600 dark:text-gray-300">
                    No matches. Try another search.
                  </CardContent>
                </Card>
              ) : (
                doctors &&
                doctors.map((doc) => (
                  <DoctorCard
                    key={doc._id}
                    doc={doc} // Pass the raw API doc data
                    onViewProfile={handleViewProfile}
                    onBook={openBookingWithDoc}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <BookingModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        profile={bookingFor}
        doctorId={selectedDoctorMeta?.doctorId}
        patientId={patientId}
        bookingFee={selectedDoctorMeta?.bookingFee}
        onConfirm={handleConfirmBooking}
      />
    </>
  );
}
