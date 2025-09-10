import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, firstName, lastName, username } = await req.json();

  let user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    user = await prisma.user.create({
      data: { id, firstName, lastName, username },
    });
  }

  return NextResponse.json(user);
}
