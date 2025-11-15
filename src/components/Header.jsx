import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#377b87]"></div>
          <span className="text-lg font-extrabold tracking-tight">
            Vital Connect
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
          <Button className="ml-1" onClick={() => navigate("/join")}>
            Join as a Doctor
          </Button>
        </nav>
      </div>
    </header>
  );
}
