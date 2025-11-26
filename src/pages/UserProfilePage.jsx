import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";

/** Small UI helpers */
const InfoRow = ({ label, children }) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
    <span className="w-40 shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
      {label}
    </span>
    <div className="text-sm">{children ?? "—"}</div>
  </div>
);

const Pill = ({ children, tone = "default" }) => {
  const tones = {
    default:
      "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200",
    success: "border-emerald-500/40 text-emerald-700 dark:text-emerald-400",
    warning: "border-amber-500/40 text-amber-700 dark:text-amber-400",
    danger: "border-red-500/40 text-red-700 dark:text-red-400",
    brand: "border-[#377b87] text-[#377b87]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const Section = ({ title, children }) => (
  <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
    <h3 className="text-base font-semibold">{title}</h3>
    <div className="mt-3 space-y-2">{children}</div>
  </div>
);

/** Money formatter (EGP by default) */
const money = (n, currency = "EGP") =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

/** Status badge for doctor approval flow */
const StatusBadge = ({ status }) => {
  const map = {
    approved: { label: "Approved", tone: "success" },
    pending: { label: "Pending", tone: "warning" },
    rejected: { label: "Rejected", tone: "danger" },
  };
  const conf = map[status] || { label: "Unknown", tone: "default" };
  return <Pill tone={conf.tone}>{conf.label}</Pill>;
};

export default function UserProfilePage() {
  const assetsBase = import.meta.env.VITE_ASSETS_BASE;
  const { data: user, isLoading, isError, error } = useUser();
  const imageUrl = user?.profilePic
    ? `${assetsBase + "/" + "img" + "/" + "profilePics" + "/" + user?.profilePic}`
    : "";
  if (isLoading) {
    return (
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-48 animate-pulse rounded-2xl bg-gray-200 lg:col-span-2 dark:bg-gray-800" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section className="mt-12 md:mt-16">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Profile</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {error?.message || "We couldn’t load your profile."}
                </p>
              </div>
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  const {
    name,
    email,
    image,
    role,
    phone,
    isVerified,
    createdAt,
    patientProfile,
    doctorProfile, // support if you attach/populate this client/server side
  } = user;

  const createdDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "—";

  // Derive doctor fields if available (structure mirrors your schema)
  const doc = doctorProfile || null;
  const clinic = doc?.clinic || {};

  return (
    <section className="mt-12 md:mt-16">
      {/* Header card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <Avatar
                src={imageUrl}
                name={name}
                size={56}
                className="ring-2 ring-white dark:ring-gray-900"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl leading-tight font-bold">
                    {name || "—"}
                  </h2>
                  <Pill tone="brand">{role || "user"}</Pill>
                  {isVerified && <Pill tone="success">Verified</Pill>}
                </div>
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate">{email}</span>
                    <span className="text-gray-500">•</span>
                    <span>{phone || "No phone"}</span>
                    <span className="text-gray-500">•</span>
                    <span>Member since {createdDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/settings">
                <Button variant="outline">Settings</Button>
              </Link>
              <Link to="/appointments">
                <Button>My appointments</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-1">
        {/* Account section */}
        <div className="lg:col-span-1">
          <Section title="Account">
            <InfoRow label="Name">{name}</InfoRow>
            <InfoRow label="Email">{email}</InfoRow>
            <InfoRow label="Phone">
              {phone ? (
                <a
                  className="text-[#377b87] hover:underline"
                  href={`tel:${phone}`}
                >
                  {phone}
                </a>
              ) : (
                "—"
              )}
            </InfoRow>
            <InfoRow label="Role">{role}</InfoRow>
            <InfoRow label="Verified">{isVerified ? "Yes" : "No"}</InfoRow>
            <InfoRow label="Joined">{createdDate}</InfoRow>
          </Section>
        </div>

        {/* Role-specific section(s) */}
        <div className="space-y-6 lg:col-span-2">
          {role === "patient" && (
            <Section title="Patient details">
              <InfoRow label="Age">{patientProfile?.age}</InfoRow>
              <InfoRow label="Gender">{patientProfile?.gender}</InfoRow>
              <InfoRow label="Blood type">{patientProfile?.bloodType}</InfoRow>
              <InfoRow label="Medical history">
                {patientProfile?.medicalHistory?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {patientProfile.medicalHistory.map((m, i) => (
                      <Pill key={i}>{m}</Pill>
                    ))}
                  </div>
                ) : (
                  "—"
                )}
              </InfoRow>
            </Section>
          )}

          {/* If your API attaches doctorProfile to user OR you fetch and place it here, it will render */}
          {role === "doctor" && (
            <>
              <Section title="Doctor profile">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={doc?.status} />
                  {typeof doc?.rating === "number" && (
                    <span className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="font-medium">
                        {Number(doc?.rating || 0).toFixed(1)}
                      </span>
                      <span className="text-gray-500">
                        ({doc?.reviewsCount || 0})
                      </span>
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoRow label="Specialization">
                    {doc?.specialization}
                  </InfoRow>
                  <InfoRow label="Experience">
                    {typeof doc?.experience === "number"
                      ? `${doc.experience} years`
                      : "—"}
                  </InfoRow>
                  <InfoRow label="Consultation fee">
                    {money(doc?.consultationFee)}
                  </InfoRow>
                  <InfoRow label="Available days">
                    {doc?.availableDays?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {doc.availableDays.map((d, i) => (
                          <Pill key={i}>{d}</Pill>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </InfoRow>
                  <InfoRow label="Available slots">
                    {doc?.availableSlots?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {doc.availableSlots.map((s, i) => (
                          <Pill key={i}>{s}</Pill>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </InfoRow>
                </div>
                <InfoRow label="Bio">{doc?.bio || "—"}</InfoRow>
              </Section>

              <Section title="Clinic">
                <InfoRow label="Name">{clinic?.name}</InfoRow>
                <InfoRow label="Address">
                  {clinic?.address ? (
                    <span>
                      {clinic.address}
                      {clinic?.city ? `, ${clinic.city}` : ""}
                    </span>
                  ) : (
                    "—"
                  )}
                </InfoRow>
                <InfoRow label="Location">
                  {typeof clinic?.lat === "number" &&
                  typeof clinic?.lng === "number"
                    ? `${clinic.lat.toFixed(4)}, ${clinic.lng.toFixed(4)}`
                    : "—"}
                </InfoRow>
              </Section>
            </>
          )}

          {/* If role is doctor but no profile yet */}
          {role === "doctor" && !doctorProfile && (
            <Card>
              <CardContent className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold">
                    Complete your doctor profile
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Add your specialization, experience, fees, and availability
                    to appear in search.
                  </p>
                </div>
                <Link to="/doctor-dashboard">
                  <Button>Open dashboard</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
