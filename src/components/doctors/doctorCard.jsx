import React from "react";
import { Card, CardContent } from "../ui/Card";
import InitialsAvatar from "../ui/InitialsAvatar";
import Button from "../ui/Button";

export default function DoctorCard({ doc, onViewProfile, onBook }) {
  const name = doc?.userId?.name || "Unknown Doctor";
  const specialty = doc?.specialization || "General";
  const ratingNum = typeof doc?.rating === "number" ? doc.rating : 0;
  const location = doc?.clinic?.city || doc?.clinic?.address || "—";
  const years = typeof doc?.experience === "number" ? doc.experience : 0;
  console.log("DoctorCard doc:", doc);
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-5">
        {/* Top section */}
        <div className="flex items-start gap-4">
          <InitialsAvatar name={name} />

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-lg font-semibold">{name}</h3>
              <div
                className="flex shrink-0 items-center gap-1 text-sm text-amber-600 dark:text-amber-400"
                title={`${ratingNum} / 5`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="inline-block"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="font-medium">
                  {Number(ratingNum).toFixed(1)}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {specialty}
            </p>
          </div>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs dark:bg-gray-800">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
              className="inline-block"
            >
              <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs dark:bg-gray-800">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
              className="inline-block"
            >
              <path d="M6 2v6h12V2M6 22h12M12 8v14" />
            </svg>
            {years} yrs exp
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          {!doc.consultationFee && (
            <Button className="flex-1" onClick={() => onBook?.(doc)}>
              Book
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewProfile?.(doc)}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
