const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchDoctors() {
  const res = await fetch(`${API_BASE}/doctors`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch doctors");
  // assuming { status: 'success', data: { doctors: [...] } } OR { status, data: [...] }
  const payload = await res.json();
  // Normalize to always return an array of doctor objects
  return Array.isArray(payload.data)
    ? payload.data
    : payload.data?.doctors || [];
}

export async function fetchDoctorById(id) {
  const res = await fetch(`${API_BASE}/doctors/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch doctor");
  const json = await res.json();
  // Response shape: { status, data: { doctor } }
  return json?.data?.doctor;
}

export async function createDoctorProfile(payload) {
  const res = await fetch(`${API_BASE}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Failed to create doctor profile");
  }

  return res.json(); // expected response: { status, data: { doctor } }
}
