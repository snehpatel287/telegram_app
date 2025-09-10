"use client";
import React, { useEffect, useState } from "react";

type ActiveCard = {
  id: number;
  character: {
    name: string;
    rarity: string;
    multiplier: number;
    durationSec: number;
  };
  startedAt: string;
};

export default function ActiveCards({ userId }: { userId: string }) {
  const [cards, setCards] = useState<ActiveCard[]>([]);
  const [timeLeft, setTimeLeft] = useState<Record<number, number>>({});

  const fetchCards = async () => {
    const res = await fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({ id: userId }),
      headers: { "Content-Type": "application/json" },
    });
    const user = await res.json();

    if (user.purchases) {
      const activeCards = user.purchases.filter((p:any) => p.active);
      setCards(activeCards);
    }
  };

  useEffect(() => {
    fetchCards();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated: Record<number, number> = {};
        cards.forEach((c) => {
          const elapsed =
            (Date.now() - new Date(c.startedAt).getTime()) / 1000;
          const remaining = c.character.durationSec - elapsed;
          if (remaining > 0) updated[c.id] = Math.floor(remaining);
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cards]);

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur p-4 rounded-xl shadow mt-4">
      <h3 className="text-lg font-bold mb-2">⚡ Active Cards</h3>
      {cards.length === 0 ? (
        <p className="text-sm opacity-70">No active cards</p>
      ) : (
        <div className="space-y-2">
          {cards.map((c) => (
            <div
              key={c.id}
              className="flex justify-between bg-white/5 p-2 rounded-lg"
            >
              <div>
                <p className="font-semibold">{c.character.name}</p>
                <p className="text-sm opacity-70">{c.character.rarity}</p>
              </div>
              <p className="font-bold text-yellow-300">
                ⏱ {timeLeft[c.id] ?? c.character.durationSec}s
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
