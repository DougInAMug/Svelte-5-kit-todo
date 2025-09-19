import { PrismaClient } from "@prisma-app/client";
const prisma = new PrismaClient();
async function main() {
  const todo1 = await prisma.todo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "wash the veg",
      description:
        "take the veg out of the box, bring it to the sink, rub under running water then leave in the rack to dry",
    },
  });
  const todo2 = await prisma.todo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "chop the veg",
      description:
        "lay the veg on a chopping board and HACK THEM TO PIECES with a nice, sharp knife",
    },
  });
  const todo3 = await prisma.todo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "eat the veg",
      description:
        "put them in your mouth, and make sure to sufficiently chew before you swallow",
    },
  });
  const todo4 = await prisma.todo.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "rest after the meal",
      description:
        "put your feet up, drink an apertif and talk about the coming days",
    },
  });
  const todo5 = await prisma.todo.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: "excrete the rest",
      description:
        "once you've extracted all you need from the meal, let go of the rest",
    },
  });

  console.log({ todo1, todo2, todo3, todo4, todo5 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
