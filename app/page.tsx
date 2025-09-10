"use client";
import { useEffect, useState } from "react";
import TapButton from "@/app/components/TapButton";
import UserInfo from "@/app/components/UserInfo";
import CharacterShop from "@/app/components/CharacterShop";
import ActiveCards from "@/app/components/ActiveCards";
import { getTelegramUser } from "@/lib/telegram";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tgUser = getTelegramUser();
    if (!tgUser) return;

    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        id: tgUser.id.toString(),
        firstName: tgUser.first_name,
        lastName: tgUser.last_name,
        username: tgUser.username,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-br from-sky-500 to-indigo-700 text-white">
      <UserInfo user={user} />
      <TapButton userId={user.id} onUpdate={setUser} />
      <CharacterShop userId={user.id} onUpdate={setUser} />
      <ActiveCards userId={user.id} />
    </main>
  );
}
