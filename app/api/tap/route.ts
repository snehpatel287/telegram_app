import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) return NextResponse.json({ error: "No userId" }, { status: 400 });

  // Find user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Get active purchase (if any)
  const activePurchase = await prisma.purchase.findFirst({
    where: { userId, active: true },
    include: { character: true },
  });

  const multiplier = activePurchase?.character.multiplier || 1;
  const earn = 1 * multiplier;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { balance: { increment: earn } },
  });

  return NextResponse.json({ balance: updated.balance, earned: earn });
}
