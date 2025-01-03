import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { resend } from "./email";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true, // Automatically sends a verification email at signup
    autoSignInAfterVerification: true, // Automatically signIn the user after verification
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Tabula <mail@messages.tom.so>", // You could add your custom domain
        to: user.email, // email of the user to want to end
        subject: "Tabula email verification", // Main subject of the email
        html: `Hi! Click the link to verify your email for Tabula: <a href="${url}">verify email address.</a>`, // Content of the email
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
    },
  },
});
