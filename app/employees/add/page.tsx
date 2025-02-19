"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const [form, setForm] = useState({ name: "",  department: "", position: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.department || !form.position) {
      setError("All fields kkkkkkkkkare required.");
      return;
    }

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Failed to add employee.");
        return;
      }

      router.push("/employees");
    } catch {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add Employee</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          className="border p-2 w-full mb-2"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          className="border p-2 w-full mb-2"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Add Employee
        </button>
      </form>
    </div>
  );
}
