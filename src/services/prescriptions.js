const API_BASE = import.meta.env.VITE_API_BASE;
/**
 * Fetch prescriptions for the current user (scoped by backend).
 * @param {Object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.sort e.g. "-createdAt"
 */
export async function fetchPrescriptions({
  page = 1,
  limit = 10,
  sort = "-createdAt",
} = {}) {
  const url = new URL(`${API_BASE}/prescriptions`);
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (sort) url.searchParams.set("sort", sort);

  const res = await fetch(url.toString(), {
    credentials: "include",
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Failed to fetch prescriptions");
  }

  const json = await res.json();
  // shape: { status, results, data: { prescriptions: [...] } }
  return {
    results: json?.results ?? 0,
    prescriptions: json?.data?.prescriptions ?? [],
  };
}

/** (Optional) Single prescription by id */
export async function fetchPrescriptionById(id) {
  const res = await fetch(`${API_BASE}/prescriptions/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Failed to fetch prescription");
  }
  const json = await res.json();
  return json?.data?.prescription;
}
