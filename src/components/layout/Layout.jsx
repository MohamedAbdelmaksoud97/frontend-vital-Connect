import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pt-4 pb-16 md:pt-4">
        <Outlet /> {/* Pages will be rendered here */}
      </main>
      <Footer />
    </div>
  );
}
