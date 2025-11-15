import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMyAppointments } from "@/hooks/useMyAppointments";
import { useCancelAppointment } from "@/hooks/useCancelAppointment";

import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const tz = "Africa/Cairo";
const egp = (n) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

/* ---------- Small UI helpers ---------- */
function StatusBadge({ status }) {
  const map = {
    pending: "border-amber-500/40 text-amber-700 dark:text-amber-400",
    confirmed: "border-emerald-500/40 text-emerald-700 dark:text-emerald-400",
    completed: "border-sky-500/40 text-sky-700 dark:text-sky-400",
    cancelled: "border-red-500/40 text-red-700 dark:text-red-400",
  };
  const cls =
    map[status] ||
    "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${cls}`}
    >
      {status || "unknown"}
    </span>
  );
}

function PaymentBadge({ status }) {
  const map = {
    paid: "border-emerald-500/40 text-emerald-700 dark:text-emerald-400",
    unpaid:
      "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200",
    refunded: "border-sky-500/40 text-sky-700 dark:text-sky-400",
  };
  const cls =
    map[status] ||
    "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${cls}`}
    >
      {status || "—"}
    </span>
  );
}

/* ---------- Simple Confirmation Modal ---------- */
function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Keep appointment
          </Button>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? "Cancelling…" : "Confirm cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */
function Tabs({ value, onChange }) {
  const items = [
    { key: "active", label: "Active" },
    { key: "cancelled", label: "Cancelled" },
  ];
  return (
    <div className="no-scrollbar flex w-full gap-2 overflow-x-auto">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={`rounded-full border px-4 py-2 text-sm whitespace-nowrap transition ${
            value === it.key
              ? "border-[#377b87] bg-[#377b87] text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- One appointment card ---------- */
function AppointmentItem({ appt, refetchKey }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: cancelAppt, isPending } = useCancelAppointment({
    refetchKey,
  });

  const dateObj = appt?.date ? new Date(appt.date) : null;
  const dateStr = dateObj
    ? dateObj.toLocaleDateString("en-EG", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: tz,
      })
    : "—";

  const timeStr =
    appt?.timeSlot ||
    (dateObj
      ? dateObj.toLocaleTimeString("en-EG", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
        })
      : "—");

  const docId = appt?.doctorId?._id;
  const docSpec = appt?.doctorId?.specialization || "—";

  const isCancelled = appt?.status === "cancelled";
  const cancellable =
    !isCancelled && ["pending", "confirmed"].includes(appt?.status);

  const triggerCancel = () => {
    if (!cancellable) return;
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    cancelAppt(appt._id, {
      onSettled: () => setConfirmOpen(false),
    });
  };

  return (
    <>
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left (primary info) */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-semibold">
                  {docSpec} appointment
                </h3>
                <StatusBadge status={appt?.status} />
                <PaymentBadge status={appt?.paymentStatus} />
              </div>

              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex flex-wrap items-center gap-2">
                  <span>{dateStr}</span>
                  <span className="text-gray-400">•</span>
                  <span>{timeStr}</span>
                  {typeof appt?.bookingFee === "number" && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{egp(appt.bookingFee)}</span>
                    </>
                  )}
                </div>
                {appt?.notes && (
                  <div className="mt-1 italic">“{appt.notes}”</div>
                )}
              </div>
            </div>

            {/* Right (actions) */}
            <div className="flex shrink-0 items-center gap-2">
              {docId ? (
                <Link to={`/doctors/${docId}`}>
                  <Button variant="outline">View doctor</Button>
                </Link>
              ) : null}
              {/* Hide cancel button entirely for cancelled appointments */}
              {cancellable && (
                <Button
                  variant="outline"
                  onClick={triggerCancel}
                  disabled={isPending}
                  title="Cancel this appointment"
                >
                  {isPending ? "Cancelling…" : "Cancel"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Cancel appointment?"
        message="This action cannot be undone. Are you sure you want to cancel this appointment?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmCancel}
        loading={isPending}
      />
    </>
  );
}

/* ---------- Page ---------- */
export default function AppointmentsPage() {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("active"); // 'active' | 'cancelled'
  const limit = 10;
  const sort = "-createdAt";

  const params = { page, limit, sort };
  const refetchKey = ["appointments:me", params];

  const { data, isLoading, isError, error, isFetching } =
    useMyAppointments(params);
  // In AppointmentsPage()

  const all = data?.appointments ?? [];
  // ...
  // Split into tabs
  const cancelled = all.filter((a) => a.status === "cancelled");
  const active = all.filter((a) => a.status !== "cancelled");

  const list = tab === "cancelled" ? cancelled : active;

  const canPrev = page > 1;
  const canNext = all.length === limit; // <--- THE FIX

  const metaText = useMemo(() => {
    if (!list.length) return "No appointments found";
    const first = (page - 1) * limit + 1;
    const last = first + list.length - 1;
    return `Showing ${first}–${last}${isFetching ? " (updating…)" : ""}`;
  }, [list.length, page, limit, isFetching]);

  if (isLoading) {
    return (
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-12 md:mt-16">
        <Card>
          <CardContent className="text-sm text-red-600 dark:text-red-400">
            Failed to load appointments: {error?.message || "Unknown error"}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Appointments</h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {metaText}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5">
          <Tabs value={tab} onChange={setTab} />
        </div>

        {list.length === 0 ? (
          <Card>
            <CardContent className="text-center text-gray-600 dark:text-gray-300">
              {tab === "cancelled"
                ? "No cancelled appointments."
                : "You have no active appointments yet."}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {list.map((a) => (
              <AppointmentItem key={a._id} appt={a} refetchKey={refetchKey} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-gray-500">Page {page}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev}
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!canNext}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
