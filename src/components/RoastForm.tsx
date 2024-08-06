"use client";

import { useState } from "react";
import { roastInstagram } from "@/app/actions/roastingInstagram";
import axios from "axios";

export default function RoastForm() {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const profile = await roastInstagram(username);
      const response = await axios.post(
        "/api/generate-roast",
        {
          username,
          profile,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRoast(response.data.roasting);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError("Failed to roast. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Instagram username"
          className="w-full p-2 border rounded text-black"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Roasting..." : "Roast"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {roast && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2 text-black">
            Roast Result🔥🔥🔥:
          </h2>
          <p className="text-black">{roast}</p>
        </div>
      )}
    </div>
  );
}
