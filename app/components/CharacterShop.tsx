"use client";
import React, { useEffect, useState } from "react";

type Character = {
  id: number;
  name: string;
  rarity: string;
  multiplier: number;
  price: number;
  durationSec: number;
};

export default function CharacterShop({
  userId,
  onUpdate,
}: {
  userId: string;
  onUpdate: (user: any) => void;
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  const handleBuy = async (characterId: number) => {
    setLoading(true);
    const res = await fetch("/api/purchase", {
      method: "POST",
      body: JSON.stringify({ userId, characterId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!data.error) {
      // Refresh user
      const userRes = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ id: userId }),
        headers: { "Content-Type": "application/json" },
      });
      const userData = await userRes.json();
      onUpdate(userData);
    } else {
      alert(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur p-4 rounded-xl shadow mt-4">
      <h3 className="text-lg font-bold mb-2">🛒 Character Shop</h3>
      <div className="space-y-2">
        {characters.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center bg-white/5 p-2 rounded-lg"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm opacity-70">
                {c.rarity} • {c.multiplier}x • ⏱ {c.durationSec}s
              </p>
            </div>
            <button
              disabled={loading}
              onClick={() => handleBuy(c.id)}
              className="px-3 py-1 bg-green-500 text-white rounded-lg disabled:opacity-50"
            >
              Buy ({c.price} 💰)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
