import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DOCTORS, toProfile } from "../lib/data";
import UserProfile from "../components/doctors/UserProfile";
import BookingModal from "../components/doctors/BookingModal";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const doc = useMemo(() => {
    return DOCTORS.find((d) => d.id === parseInt(id));
  }, [id]);

  const profile = useMemo(() => {
    return doc ? toProfile(doc) : null;
  }, [doc]);

  const openBookingWithProfile = () => {
    if (!profile) return;
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (payload) => {
    console.log("Booking Confirmed:", payload);
    setIsBookingOpen(false);
    alert(
      `Appointment successfully booked with ${payload.profile.userId.name} on ${payload.date} at ${payload.slot}!`,
    );
  };

  if (!profile) {
    return (
      <section>
        <div className="mb-5 flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/")}>
            ← Back
          </Button>
        </div>
        <Card>
          <CardContent>Doctor profile not found.</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <>
      <section>
        <div className="mb-5 flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>
        <div className="mx-auto max-w-5xl">
          <UserProfile
            profile={{ ...profile, onBook: openBookingWithProfile }}
          />
        </div>
      </section>

      <BookingModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        profile={profile}
        onConfirm={handleConfirmBooking}
      />
    </>
  );
}
