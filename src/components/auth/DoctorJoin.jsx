import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { SPECIALTIES } from "../../lib/data";

export default function DoctorJoin({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fee, setFee] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess({ name, email, phone, specialization, fee });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        value={name}
        onChange={setName}
        placeholder="Dr. Your Name"
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@clinic.com"
      />
      <Input
        label="Phone"
        value={phone}
        onChange={setPhone}
        placeholder="+2010…"
      />
      <label className="block text-sm">
        <span className="mb-1 block text-gray-700 dark:text-gray-200">
          Specialization
        </span>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
        >
          <option value="">Select specialization</option>
          {SPECIALTIES.filter((s) => s !== "All").map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <Input
        label="Consultation Fee (EGP)"
        value={fee}
        onChange={setFee}
        placeholder="e.g., 400"
      />
      <Button type="submit" className="w-full">
        Submit application
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        We’ll review your info and get back to you.
      </p>
    </form>
  );
}
