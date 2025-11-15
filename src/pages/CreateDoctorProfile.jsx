import React, { useState } from "react";
//import { useCreateDoctorProfile } from "@/hooks/useCreateDoctorProfile";
import { useCreateDoctorProfile } from "@/pages/useCreateDoctorProfile";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SPECIALTIES } from "@/lib/data";

export default function CreateDoctorProfile() {
  const { createProfile, isPending } = useCreateDoctorProfile();

  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    consultationFee: "",
    bio: "",
    clinicName: "",
    clinicAddress: "",
    clinicCity: "",
    availableDays: [],
    availableSlots: [],
  });

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const addSlot = () => {
    const newSlot = prompt("Enter slot (e.g., 09:00–12:00)");
    if (newSlot) {
      setForm((prev) => ({
        ...prev,
        availableSlots: [...prev.availableSlots, newSlot],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      specialization: form.specialization,
      experience: Number(form.experience),
      consultationFee: Number(form.consultationFee),
      bio: form.bio,
      clinic: {
        name: form.clinicName,
        address: form.clinicAddress,
        city: form.clinicCity,
      },
      availableDays: form.availableDays,
      availableSlots: form.availableSlots,
    };

    createProfile(payload);
  };

  return (
    <section className="mx-auto mt-10 max-w-3xl">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h1 className="text-2xl font-bold">Create Doctor Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Specialization */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Specialization
              </label>
              <select
                value={form.specialization}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    specialization: e.target.value,
                  }))
                }
                required
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="">Select specialization</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Experience (years)
              </label>
              <input
                type="number"
                value={form.experience}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, experience: e.target.value }))
                }
                required
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Consultation Fee
              </label>
              <input
                type="number"
                value={form.consultationFee}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    consultationFee: e.target.value,
                  }))
                }
                required
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="mb-1 block text-sm font-medium">Bio</label>
              <textarea
                rows="3"
                value={form.bio}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
              ></textarea>
            </div>

            {/* Clinic */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={form.clinicName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, clinicName: e.target.value }))
                  }
                  className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  value={form.clinicAddress}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      clinicAddress: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">City</label>
                <input
                  type="text"
                  value={form.clinicCity}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, clinicCity: e.target.value }))
                  }
                  className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
            </div>

            {/* Available Days */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Available Days
              </label>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`rounded-full border px-3 py-1 ${
                        form.availableDays.includes(day)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Slots */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Available Slots
              </label>

              <div className="space-y-2">
                {form.availableSlots.map((slot, i) => (
                  <div
                    key={i}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {slot}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addSlot}
                className="mt-2"
              >
                Add Slot
              </Button>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating profile…" : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
