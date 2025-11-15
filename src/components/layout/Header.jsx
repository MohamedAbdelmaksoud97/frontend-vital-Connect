import React, { use } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import Dropdown, { DropdownItem, DropdownSeparator } from "../ui/Dropdown";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
const assetsBase = import.meta.env.VITE_ASSETS_BASE;
export default function Header() {
  const { data: user, isLoading } = useUser();
  console.log(user);
  const { logout, isLoading: loggingOut } = useLogout();
  const imageUrl = user?.profilePic
    ? `${assetsBase + "/" + "img" + "/" + "profilePics" + "/" + user?.profilePic}`
    : "";
  console.log(imageUrl);
  const navigate = useNavigate();
  const location = useLocation();
  const go = (path) => {
    // 1️⃣ If doctor has not created a profile → force create profile first
    if (user.role === "doctor" && !user.doctorProfile) {
      navigate("/create-doctor-profile");
      return;
    }

    // 2️⃣ If patient has not created a profile → send to patient profile
    if (user.role === "patient" && !user.patientProfile) {
      navigate("/create-patient-profile");
      return;
    }

    // 3️⃣ Normal navigation if destination is not current
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="images/logo.png"
            alt="Vital Connect"
            className="hidden h-8 w-10 sm:inline-block"
          />
          <span className="text-lg font-extrabold tracking-tight">
            Vital Connect
          </span>
        </Link>

        {/* Right side nav */}
        <nav className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-9 w-28 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          ) : user ? (
            <>
              {/* Appointments (always visible when signed in) */}
              {user.role === "doctor" && (
                <Button variant="ghost" onClick={() => go("/dashboard")}>
                  Dashpord
                </Button>
              )}
              {user.role === "patient" && (
                <Button variant="ghost" onClick={() => go("/appointments")}>
                  Appointments
                </Button>
              )}
              {/* Prescriptions (patient only) */}
              {user.role === "patient" && (
                <Button variant="ghost" onClick={() => go("/prescriptions")}>
                  Prescriptions
                </Button>
              )}
              {/* Avatar dropdown */}
              <Dropdown
                button={
                  <div className="flex items-center gap-2 rounded-full border border-transparent px-2 py-1 hover:border-gray-200 dark:hover:border-gray-800">
                    <Avatar src={imageUrl} name={user.name} size={36} />
                    <span className="hidden text-sm font-semibold sm:inline">
                      {user.name?.split(" ")[0]}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="hidden sm:block"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                }
              >
                <div className="px-3 py-2">
                  <div className="text-xs text-gray-500">Signed in as</div>
                  <div className="truncate text-sm font-medium">
                    {user.email}
                  </div>
                </div>
                <DropdownSeparator />

                <DropdownItem onClick={() => go("/profile")}>
                  Profile
                </DropdownItem>
                <DropdownItem onClick={() => go("/settings")}>
                  Settings
                </DropdownItem>

                <DropdownSeparator />
                <DropdownItem danger onClick={() => !loggingOut && logout()}>
                  {loggingOut ? "Logging out…" : "Log out"}
                </DropdownItem>
              </Dropdown>
            </>
          ) : (
            // Signed out state unchanged
            <>
              <Link to="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign up
                </Button>
              </Link>
              <Link to="/joinForDoctors">
                <Button className="ml-1">Join as a Doctor</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
