import React, { useState } from "react";
import { usePrescriptions } from "@/hooks/usePrescriptions";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PrescriptionCard from "@/components/prescriptions/PrescriptionCard";

export default function PrescriptionsPage() {
  // simple pagination state; backend supports page/limit/sort
  const [page, setPage] = useState(1);
  const limit = 10;
  const sort = "-createdAt";

  const { data, isLoading, isError, error, isFetching } = usePrescriptions({
    page,
    limit,
    sort,
  });

  const prescriptions = data?.prescriptions || [];
  const results = data?.results ?? 0;

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Prescriptions</h2>
          <div className="text-xs text-gray-500">
            {isFetching ? "Updating…" : results ? `${results} result(s)` : ""}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
              />
            ))}
          </div>
        ) : isError ? (
          <Card>
            <CardContent className="text-sm text-red-600 dark:text-red-400">
              Failed to load prescriptions: {error?.message || "Unknown error"}
            </CardContent>
          </Card>
        ) : prescriptions.length === 0 ? (
          <Card>
            <CardContent className="text-gray-600 dark:text-gray-300">
              No prescriptions found.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((rx) => (
              <PrescriptionCard key={rx._id} rx={rx} />
            ))}

            {/* Simple pager (previous/next) */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
              >
                ← Previous
              </Button>
              <span className="text-sm text-gray-500">Page {page}</span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={prescriptions.length < limit || isFetching}
              >
                Next →
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
