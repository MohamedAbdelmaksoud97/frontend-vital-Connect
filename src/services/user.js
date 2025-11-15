const API_BASE = import.meta.env.VITE_API_BASE;

export async function signup(payload) {
  const res = await fetch(`${API_BASE}/users/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Signup failed");
  }

  return res.json(); // backend should return { status, data: { user } }
}

export async function login(values) {
  const res = await fetch(`${API_BASE}/users/logIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.error(err.data);
    throw err;
  }

  return data?.data.user;
}

export async function fetchUser() {
  const res = await fetch(`${API_BASE}/users/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.data.user;
}

/** PATCH /users/me (multipart) */
export async function updateMe(formData) {
  const res = await fetch(`${API_BASE}/users/me`, {
    method: "PATCH",
    credentials: "include",
    body: formData, // must be FormData (profilePic/name/phone)
  });
  if (!res.ok) {
    const err = await safeErr(res);
    throw new Error(err);
  }
  const data = await res.json();
  return data.data.user;
}

/** PATCH /users/updateMyPassword (JSON) */
export async function updateMyPassword(payload) {
  const res = await fetch(`${API_BASE}/users/updateMyPassword`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await safeErr(res);
    throw new Error(err);
  }
  const data = await res.json();
  return data.data?.user || true;
}

async function safeErr(res) {
  try {
    const j = await res.json();
    return j?.message || j?.error || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

// services/auth.js

export const logout = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE}/users/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Send cookies with the request
    },
  );

  if (!response.ok) {
    throw new Error("Failed to log out.");
  }

  const data = await response.json();
  return data;
};
