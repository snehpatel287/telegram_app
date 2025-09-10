import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const characters = [
    {
      name: "Common Brain Root",
      rarity: "Common",
      multiplier: 1,
      price: 100,
      durationSec: 60, // 1 min
    },
    {
      name: "Rare Brain Root",
      rarity: "Rare",
      multiplier: 2,
      price: 500,
      durationSec: 120, // 2 min
    },
    {
      name: "Epic Brain Root",
      rarity: "Epic",
      multiplier: 5,
      price: 2000,
      durationSec: 180, // 3 min
    },
    {
      name: "Legendary Brain Root",
      rarity: "Legendary",
      multiplier: 10,
      price: 5000,
      durationSec: 300, // 5 min
    },
  ];

  for (const c of characters) {
    await prisma.character.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }

  console.log("✅ Characters seeded!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
