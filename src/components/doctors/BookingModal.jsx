import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import DatePicker from "../ui/DatePicker";
import TimePicker from "../ui/TimePicker";
import { useCreateAppointment } from "@/hooks/useCreateAppointment";

/**
 * Props:
 * - open, onClose, profile
 * - onConfirm?: (createdOrPayload) => void
 * - doctorId (required for POST), patientId (required), bookingFee (required)
 */
export default function BookingModal({
  open,
  onClose,
  profile,
  onConfirm,
  doctorId: doctorIdProp,
  patientId,
  bookingFee: bookingFeeProp,
}) {
  console.log(doctorIdProp, patientId, bookingFeeProp);
  // ---- Hooks: always called in the same order, before any conditional returns
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [note, setNote] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useCreateAppointment();
  const firstInvalidRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setPatientName("");
      setPatientPhone("");
      setDate("");
      setSlot("");
      setNote("");
      setErrors({});
      setSubmitted(false);
    }
  }, [open]);

  // ---- Derived values (no hooks)
  const doctorId =
    doctorIdProp || profile?.doctorId || profile?._id || profile?.id || null;
  const bookingFee =
    typeof bookingFeeProp === "number"
      ? bookingFeeProp
      : typeof profile?.consultationFee === "number"
        ? profile.consultationFee
        : undefined;

  const demoSlots = profile?.availableSlots?.length
    ? profile.availableSlots
    : ["09:00", "10:00", "11:00", "12:00", "13:00", "15:00", "16:00"];

  // ---- Early return AFTER hooks are set up is fine
  if (!open || !profile) return null;

  // ---- Validation helpers (no hooks)
  const validate = () => {
    const next = {};
    if (!patientName.trim()) next.patientName = "Your name is required.";
    if (!patientPhone.trim()) next.patientPhone = "Phone is required.";
    if (!date) next.date = "Date is required.";
    if (!slot) next.slot = "Time is required.";
    if (!doctorId) next.doctorId = "Missing doctor id.";
    //if (!patientId) next.patientId = "Missing patient id.";
    if (typeof bookingFee !== "number")
      next.bookingFee = "Missing booking fee.";
    setErrors(next);
    return next;
  };

  const invalidProps = (key) => {
    const invalid = submitted && errors[key];
    return {
      "aria-invalid": invalid ? "true" : "false",
      "aria-describedby": invalid ? `${key}-error` : undefined,
      ref: !firstInvalidRef.current && invalid ? firstInvalidRef : undefined,
      className:
        "w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:bg-gray-950 " +
        (invalid
          ? "border-red-500 dark:border-red-500"
          : "border-gray-300 dark:border-gray-700"),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const next = validate();
    if (Object.keys(next).length > 0) {
      firstInvalidRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstInvalidRef.current?.focus();
      return;
    }

    const payload = {
      doctorId,
      patientId,
      date: new Date(date).toISOString(), // adjust if you need to merge timeSlot
      timeSlot: slot,
      bookingFee,
      notes: note || "",
    };

    mutate(payload, {
      onSuccess: (created) => {
        onClose?.();
        onConfirm?.(created || { ...payload, profile });
      },
      onError: (err) => {
        setErrors((prev) => ({
          ...prev,
          api: err?.message || "Failed to create appointment",
        }));
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/30 p-0 sm:items-center sm:p-6">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <h3 className="text-lg font-semibold">Book Appointment</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {submitted && errors.api && (
            <div className="mb-3 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
              {errors.api}
            </div>
          )}

          <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm dark:bg-gray-800/50">
            <div className="font-medium">{profile?.userId?.name}</div>
            <div className="text-gray-600 dark:text-gray-300">
              {profile?.specialization} •{" "}
              {profile?.clinic?.city || profile?.clinic?.address}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Fee:{" "}
              {typeof profile?.consultationFee === "number"
                ? `${profile.consultationFee} EGP`
                : "—"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-gray-700 dark:text-gray-200">
                Your Name
              </span>
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g., Sara Ali"
                {...invalidProps("patientName")}
              />
              {submitted && errors.patientName && (
                <p id="patientName-error" className="mt-1 text-xs text-red-600">
                  {errors.patientName}
                </p>
              )}
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-gray-700 dark:text-gray-200">
                Phone
              </span>
              <input
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="e.g., +2010…"
                {...invalidProps("patientPhone")}
              />
              {submitted && errors.patientPhone && (
                <p
                  id="patientPhone-error"
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.patientPhone}
                </p>
              )}
            </label>

            <div className="text-sm">
              <span className="mb-1 block text-gray-700 dark:text-gray-200">
                Date
              </span>
              <DatePicker value={date} onChange={setDate} />
              {submitted && errors.date && (
                <p id="date-error" className="mt-1 text-xs text-red-600">
                  {errors.date}
                </p>
              )}
            </div>

            <div className="text-sm">
              <span className="mb-1 block text-gray-700 dark:text-gray-200">
                Time
              </span>
              <TimePicker value={slot} onChange={setSlot} slots={demoSlots} />
              {submitted && errors.slot && (
                <p id="slot-error" className="mt-1 text-xs text-red-600">
                  {errors.slot}
                </p>
              )}
            </div>
          </div>

          {submitted &&
            (errors.doctorId || errors.patientId || errors.bookingFee) && (
              <div className="mt-3 text-xs text-red-600">
                {errors.doctorId && <div>• {errors.doctorId}</div>}
                {errors.patientId && <div>• {errors.patientId}</div>}
                {errors.bookingFee && <div>• {errors.bookingFee}</div>}
              </div>
            )}

          <label className="mt-4 block text-sm">
            <span className="mb-1 block text-gray-700 dark:text-gray-200">
              Notes (optional)
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
              placeholder="Anything the doctor should know?"
            />
          </label>

          <div className="mt-6 flex items-center justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Booking…" : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
