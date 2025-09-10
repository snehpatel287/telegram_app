import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, characterId } = await req.json();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const character = await prisma.character.findUnique({ where: { id: characterId } });

  if (!user || !character) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  if (user.balance < character.price)
    return NextResponse.json({ error: "Not enough coins" }, { status: 400 });

  await prisma.user.update({
    where: { id: userId },
    data: { balance: { decrement: character.price } },
  });

  await prisma.purchase.create({
    data: { userId, characterId },
  });

  return NextResponse.json({ success: true });
}
