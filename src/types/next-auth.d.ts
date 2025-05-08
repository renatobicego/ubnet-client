import "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      id: string;
    } & DefaultSession["user"];
    backendToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    backendToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    backendToken: string;
  }
}
