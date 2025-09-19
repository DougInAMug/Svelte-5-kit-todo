import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { passkey } from "better-auth/plugins/passkey";
import prisma from "./prisma";

// default better auth instantiates new prisma client, names it client
// const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: "2025-07-31-sveltekit-todo",
  emailAndPassword: {
    enabled: true,
  },
  plugins: [passkey(), sveltekitCookies(getRequestEvent)],
});
