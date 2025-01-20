import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { resend } from "./email";
import { ResetPasswordEmail, VerificationEmail } from "@/emails/templates";
import { whitelistEmails } from "./constants";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    window: 10, // time window in seconds
    max: 100, // max requests in the window
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    redirects: {
      afterSignIn: "/portal/painting",
    },
    requireEmailVerification: true,
    validateEmail: (email: string) => {
      const domain = email.split("@")[1];

      if (!whitelistEmails.includes(domain)) {
        throw new Error("Only authorised schools are allowed to register");
      }

      return true;
    },
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Colabula <mail@mail.colabula.com>",
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({ url }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true, // Automatically sends a verification email at signup
    autoSignInAfterVerification: true, // Automatically signIn the user after verification
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Colabula <mail@mail.colabula.com>",
        to: user.email, // email of the user to want to end
        subject: "Colabula email verification", // Main subject of the email
        react: VerificationEmail({ url }),
      });
    },
  },
});
