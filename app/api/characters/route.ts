import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const characters = await prisma.character.findMany();
  return NextResponse.json(characters);
}
