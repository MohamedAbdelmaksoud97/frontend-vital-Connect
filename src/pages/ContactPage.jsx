import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.", {
      duration: 4000,
    });

    // reset form
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">Contact Us</h1>

      <Card>
        <CardContent className="space-y-4 p-6 text-gray-700 dark:text-gray-300">
          <p>
            Have questions? Need support? Our team is here to help you anytime.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
                rows="4"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            We typically respond within 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
