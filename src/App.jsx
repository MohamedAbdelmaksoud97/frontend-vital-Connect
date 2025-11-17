import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JoinDoctorPage from "./pages/JoinDoctorPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import { Toaster } from "react-hot-toast";
import UserProfilePage from "./pages/UserProfilePage";
import DoctorProfile from "@/components/doctors/DoctorProfile";
import AppointmentsPage from "./pages/AppointmentsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import SettingsPage from "./pages/SettingsPage";
import VerifyEmailPage from "./pages/SendVerificationPage";
import AccountCreated from "./pages/AccountCreated";
import VerificationSuccessPage from "./pages/VerificationSuccessPage";
import CreatePatientProfile from "./pages/CreatePatientProfile";
import CreateDoctorProfile from "./pages/CreateDoctorProfile";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ContactPage from "./pages/ContactPage";
import TermsPrivacyPage from "./pages/TermsPrivacyPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/joinForDoctors" element={<SignupPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/account-created" element={<AccountCreated />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verify-success" element={<VerificationSuccessPage />} />
          <Route
            path="/create-patient-profile"
            element={<CreatePatientProfile />}
          />
          <Route
            path="/create-doctor-profile"
            element={<CreateDoctorProfile />}
          />

          {/* You can add a 404 Not Found route here */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPrivacyPage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Add this */}
    </>
  );
}
