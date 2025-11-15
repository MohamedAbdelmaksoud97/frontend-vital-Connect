import React from "react";
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
        <div>
          <h5 className="text-sm font-semibold">Company</h5>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="#" className="hover:text-[#377b87]">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#377b87]">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#377b87]">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold">Support</h5>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="#" className="hover:text-[#377b87]">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#377b87]">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#377b87]">
                Terms & Privacy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold">Get the App</h5>
          <div className="mt-3 flex gap-3">
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
