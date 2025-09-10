"use client";
import React from "react";

export default function UserInfo({ user }: { user: any }) {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur p-4 rounded-xl shadow text-center">
      <h2 className="text-xl font-bold mb-2">👤 {user.firstName}</h2>
      <p className="text-sm opacity-80">
        @{user.username || "no-username"}
      </p>
      <p className="mt-2 text-lg font-semibold">
        💰 Balance: <span className="text-yellow-300">{user.balance}</span>
      </p>
    </div>
  );
}
