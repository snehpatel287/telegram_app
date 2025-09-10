"use client";
import React, { useState } from "react";

export default function TapButton({
  userId,
  onUpdate,
}: {
  userId: string;
  onUpdate: (user: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleTap = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/tap", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!data.error) {
      onUpdate((prev: any) => ({ ...prev, balance: data.balance }));
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleTap}
      disabled={loading}
      className="px-6 py-4 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition disabled:opacity-50"
    >
      {loading ? "⏳ Tapping..." : "🧠 Tap Brain Root"}
    </button>
  );
}
