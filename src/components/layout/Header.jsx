import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import Dropdown, { DropdownItem, DropdownSeparator } from "../ui/Dropdown";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";

const assetsBase = import.meta.env.VITE_ASSETS_BASE;

export default function Header() {
  const { data: user, isLoading } = useUser();
  const { logout, isLoading: loggingOut } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const imageUrl = user?.profilePic
    ? `${assetsBase + "/" + "img" + "/" + "profilePics" + "/" + user?.profilePic}`
    : "";

  const go = (path) => {
    if (user?.role === "doctor" && !user.doctorProfile) {
      navigate("/create-doctor-profile");
      setMobileOpen(false);
      return;
    }

    if (user?.role === "patient" && !user.patientProfile) {
      navigate("/create-patient-profile");
      setMobileOpen(false);
      return;
    }

    if (location.pathname !== path) {
      navigate(path);
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    if (!loggingOut) logout();
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src="images/logo.png" alt="Vital Connect" className="h-8 w-10" />
          <span className="text-lg font-extrabold tracking-tight">
            Vital Connect
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 sm:flex">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-9 w-28 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          ) : user ? (
            <>
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
              {user.role === "patient" && (
                <Button variant="ghost" onClick={() => go("/prescriptions")}>
                  Prescriptions
                </Button>
              )}

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
                <DropdownItem danger onClick={handleLogout}>
                  {loggingOut ? "Logging out…" : "Log out"}
                </DropdownItem>
              </Dropdown>
            </>
          ) : (
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

        {/* Mobile: avatar + burger */}
        <div className="flex items-center gap-2 sm:hidden">
          {!isLoading && user && (
            <Avatar src={imageUrl} name={user.name} size={32} />
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 text-sm shadow-sm sm:hidden dark:border-gray-800 dark:bg-gray-950">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          ) : user ? (
            <div className="space-y-2">
              {user.role === "doctor" && (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => go("/dashboard")}
                >
                  Dashpord
                </Button>
              )}
              {user.role === "patient" && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => go("/appointments")}
                  >
                    Appointments
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => go("/prescriptions")}
                  >
                    Prescriptions
                  </Button>
                </>
              )}

              <hr className="my-2 border-gray-200 dark:border-gray-800" />

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go("/profile")}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go("/settings")}
              >
                Settings
              </Button>

              <hr className="my-2 border-gray-200 dark:border-gray-800" />

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                {loggingOut ? "Logging out…" : "Log out"}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/login");
                }}
              >
                Log in
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/signup");
                }}
              >
                Sign up
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/joinForDoctors");
                }}
              >
                Join as a Doctor
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
