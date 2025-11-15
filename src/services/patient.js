// services/patient.js
const API_BASE = import.meta.env.VITE_API_BASE;
export const createPatientProfile = async (patientData) => {
  const response = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Failed to create patient profile.");
  }

  const data = await response.json();
  return data;
};
