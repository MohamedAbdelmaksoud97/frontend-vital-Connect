import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";
import { PRIMARY } from "@/constants/theme";

export default function DoctorJoinPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    clinicName: "",
    city: "",
    address: "",
    specialization: "",
    experience: "",
    fee: "",
  });
  const [message, setMessage] = useState("");

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: call API to create doctor profile with status: 'pending'
    // Example: POST /api/v1/doctors (protected) body: {...form}
    setMessage("Profile submitted. You'll appear after admin approval.");
    setTimeout(() => navigate("/verify-email", { replace: true }), 800);
  };

  return (
    <AuthCard
      title="Join as a doctor"
      subtitle="Submit your details. Your profile shows after admin approval."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {message && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-2 text-sm text-emerald-700">
            {message}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="clinicName">Clinic name</Label>
          <Input
            id="clinicName"
            value={form.clinicName}
            onChange={onChange("clinicName")}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={form.city}
              onChange={onChange("city")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.address}
              onChange={onChange("address")}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={form.specialization}
              onChange={onChange("specialization")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of experience</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              value={form.experience}
              onChange={onChange("experience")}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fee">Consultation fee (EGP)</Label>
          <Input
            id="fee"
            type="number"
            min="0"
            value={form.fee}
            onChange={onChange("fee")}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          Submit
        </Button>
      </form>
    </AuthCard>
  );
}
