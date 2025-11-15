import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const VerificationSuccessPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="text-xl font-semibold text-green-600">
        Email Verified Successfully!
      </h2>
      <p className="mt-4 text-gray-500">
        Your email has been successfully verified. You can now access all the
        features.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="outline">Go to Homepage</Button>
      </Link>
      <Link to="/create-patient-profile" className="mt-6">
        <Button variant="outline">Create patient profile</Button>
      </Link>
    </div>
  );
};

export default VerificationSuccessPage;
