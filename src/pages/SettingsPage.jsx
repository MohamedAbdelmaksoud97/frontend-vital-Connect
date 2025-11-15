import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useUser } from "@/hooks/useUser";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";

// Field helper component for cleaner code
function Field({ label, children, hint, error }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      {hint && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </label>
  );
}

// Tabs Component
function Tabs({ value, onChange }) {
  const items = [
    { key: "profile", label: "Profile" },
    { key: "security", label: "Security" },
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

export default function SettingsPage() {
  const assetsBase = import.meta.env.VITE_ASSETS_BASE;
  const { data: user, isLoading } = useUser();
  const { mutate: updateMe, isPending: savingProfile } = useUpdateMe();
  const { mutate: updatePassword, isPending: savingPassword } =
    useUpdatePassword();

  const [tab, setTab] = useState("profile");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preview, setPreview] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const fileRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const imageUrl = `${assetsBase + "/" + "img" + "/" + "profilePics" + "/" + user?.profilePic}`;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      // Set the preview to either the uploaded image or the fallback URL
      setPreview(
        user.profilePic
          ? `${assetsBase}/img/profilePics/${user.profilePic}`
          : null,
      ); // Set to default if no uploaded image
    }
  }, [user, assetsBase]);

  // Handle file selection
  const onPickFile = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use URL.createObjectURL to create a local URL for the file
    const url = URL.createObjectURL(file);
    setPreview(url); // Update the preview immediately when a file is selected
  };

  const onSaveProfile = (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (name) fd.append("name", name);
    if (phone) fd.append("phone", phone);
    if (fileRef.current?.files?.[0])
      fd.append("profilePic", fileRef.current.files[0]);

    updateMe(fd);
  };

  const onSavePassword = (e) => {
    e.preventDefault();
    // Clear previous error messages
    setErrorMessages({});

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      setErrorMessages({
        ...errorMessages,
        missingField: "All fields are required",
      });
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setErrorMessages({
        ...errorMessages,
        passwordMismatch: "Passwords do not match",
      });
      return;
    }

    updatePassword(
      { currentPassword, newPassword, newPasswordConfirm },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setNewPasswordConfirm("");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900" />
          <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900" />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Tabs */}
        <div className="mb-5">
          <Tabs value={tab} onChange={setTab} />
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Profile</h2>
              <form className="mt-4 space-y-4" onSubmit={onSaveProfile}>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                    {preview ? (
                      <img
                        src={preview} // Immediately display the selected file as preview
                        alt="avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500 dark:bg-gray-800">
                        No pic
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onPickFile}
                    >
                      Change photo
                    </Button>
                    {fileRef.current?.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          fileRef.current.value = "";
                          setPreview(user?.profilePic || user?.image || null); // Reset to default image if no file
                        }}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Phone" hint="Example: +201001112223">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
                      placeholder="+2010…"
                    />
                  </Field>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={savingProfile}>
                    {savingProfile ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Security Tab */}
        {tab === "security" && (
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Security</h2>
              <form className="mt-4 space-y-4" onSubmit={onSavePassword}>
                {errorMessages.missingField && (
                  <div className="text-sm text-red-500">
                    {errorMessages.missingField}
                  </div>
                )}
                {errorMessages.passwordMismatch && (
                  <div className="text-sm text-red-500">
                    {errorMessages.passwordMismatch}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Current password"
                    error={errorMessages.missingField ? "Required" : ""}
                  >
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
                      placeholder="••••••"
                    />
                  </Field>
                  <div />
                  <Field
                    label="New password"
                    error={errorMessages.missingField ? "Required" : ""}
                  >
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
                      placeholder="At least 6 characters"
                    />
                  </Field>
                  <Field
                    label="Confirm new password"
                    error={errorMessages.missingField ? "Required" : ""}
                  >
                    <input
                      type="password"
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
                      placeholder="Repeat password"
                    />
                  </Field>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={savingPassword}>
                    {savingPassword ? "Updating…" : "Update password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
