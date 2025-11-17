import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h4 className="font-semibold">Vital Connect</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Find trusted doctors and book appointments with ease.
          </p>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-sm font-semibold">Company</h5>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/about" className="hover:text-[#377b87]">
                About
              </Link>
            </li>
            {/* Keep Careers as placeholder for now */}
            <li>
              <span className="cursor-default text-gray-400">
                Careers (coming soon)
              </span>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#377b87]">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-sm font-semibold">Support</h5>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/help" className="hover:text-[#377b87]">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#377b87]">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#377b87]">
                Terms &amp; Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* App buttons */}
        <div>
          <h5 className="text-sm font-semibold">Get the App</h5>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button variant="outline">App Store</Button>
            <Button variant="outline">Google Play</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:border-gray-800">
        © {new Date().getFullYear()} Vital Connect. All rights reserved.
      </div>
    </footer>
  );
}
