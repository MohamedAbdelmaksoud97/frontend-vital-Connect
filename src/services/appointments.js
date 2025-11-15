const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Fetch current user's appointments.
 * Supports paging/sorting to match your endpoint.
 */
export async function fetchMyAppointments({
  page = 1,
  limit = 10,
  sort = "-createdAt",
} = {}) {
  const params = new URLSearchParams({ page, limit, sort });
  const res = await fetch(`${API_BASE}/appointments/me?${params.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to fetch appointments");
  }

  const json = await res.json(); // { status, results, data: { appointments: [...] } }
  const data = json?.data || {};
  return {
    appointments: data.appointments || [],
    results: json?.results ?? data.appointments?.length ?? 0,
  };
}

export async function createAppointment(payload) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create appointment");
  }

  const json = await res.json(); // assume { status, data: { appointment } }
  return json?.data?.appointment || json;
}

export async function cancelAppointment(appointmentId) {
  const res = await fetch(`${API_BASE}/appointments/${appointmentId}/cancel`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Failed to cancel appointment");
  }
  const json = await res.json();
  // { status: "success", data: { appointment } }
  return json.data.appointment;
}
