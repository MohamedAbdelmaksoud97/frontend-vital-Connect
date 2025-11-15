import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePatientProfile } from "@/hooks/useCreatePatientProfile"; // Importing the custom hook
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { set } from "zod";

const CreatePatientProfile = () => {
  const navigate = useNavigate();

  // Local state for the form
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bloodType: "",
    medicalHistory: [], // Initially an empty array
    phone: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMedicalHistoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      medicalHistory: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean), // Split by comma, trim spaces, and filter out empty entries
    }));
  };

  // Use the custom hook for the POST request
  const { mutate, isLoading, isError, error } = useCreatePatientProfile();

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData); // Call the mutation function with form data
    window.location.reload();
    // navigate("/"); // Redirect to the profile page after success
    setTimeout(() => {
      toast.success("Patient profile created successfully!");
    }, 1500);
  };

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-xl space-y-6">
        <h2 className="text-2xl font-bold">Create Patient Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium">
              Blood Type
            </label>
            <input
              id="bloodType"
              name="bloodType"
              type="text"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="medicalHistory"
              className="block text-sm font-medium"
            >
              Medical History (comma separated)
            </label>
            <input
              id="medicalHistory"
              name="medicalHistory"
              type="text"
              value={formData.medicalHistory.join(", ")}
              onChange={handleMedicalHistoryChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Create Profile"}
            </Button>
          </div>
        </form>

        {isError && (
          <div className="text-sm text-red-500">{error?.message}</div>
        )}
      </div>
    </section>
  );
};

export default CreatePatientProfile;
