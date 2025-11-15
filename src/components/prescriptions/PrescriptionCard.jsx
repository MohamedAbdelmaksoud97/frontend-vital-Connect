import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
      <span className="w-40 shrink-0 text-xs font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export default function PrescriptionCard({ rx }) {
  // doctorId/patientId are populated objects in your sample, but only with _id & userId.
  // Display IDs gracefully; you can enhance later by populating user names.
  const docLabel = rx?.doctorName;
  //typeof rx?.doctorId === "object" ? rx?.doctorId?._id : rx?.doctorId;
  const patLabel = rx?.patientName;
  //typeof rx?.patientId === "object" ? rx?.patientId?._id : rx?.patientId;

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">
            Prescription #{rx?._id?.slice(-6)}
          </h3>
          <span className="text-xs text-gray-500">
            {rx?.createdAt ? new Date(rx.createdAt).toLocaleString() : ""}
          </span>
        </div>

        <div className="space-y-2">
          <Row label="Appointment">
            {`DR ${docLabel} At ${rx.createdAt ? new Date(rx.createdAt).toLocaleString() : ""}`}
          </Row>
          <Row label="Doctor">{docLabel}</Row>
          <Row label="Patient">{patLabel}</Row>
        </div>

        <div className="mt-3">
          <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Medications
          </div>
          {rx?.medications?.length ? (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {rx.medications.map((m) => (
                <li key={m._id || `${m.name}-${m.dosage}`}>
                  <span className="font-medium">{m.name}</span>
                  {m.dosage ? ` — ${m.dosage}` : ""}
                  {m.frequency ? ` • ${m.frequency}` : ""}
                  {m.duration ? ` • ${m.duration}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No medications.</p>
          )}
        </div>

        {rx?.notes && (
          <div className="pt-2">
            <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
            </div>
            <p className="rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-800">
              {rx.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
