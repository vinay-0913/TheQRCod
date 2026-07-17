import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as { plan?: string }).plan;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as unknown as { id: string; plan: string };
        user.id = token.id as string;
        user.plan = token.plan as string;
      }
      return session;
    },
  },
  providers: [], // Add Node-dependent providers in auth.ts
} satisfies NextAuthConfig;
