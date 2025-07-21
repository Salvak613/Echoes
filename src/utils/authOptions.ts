import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import {
  Account,
  AuthOptions,
  Profile,
  SessionStrategy,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

interface UserRow {
  id: number;
email: string;
  name: string;

}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async signIn({
      user,
    }: {
      user: AdapterUser | User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      if (!user.email) return false;

      const name = user.name ? user.name.split(" ")[0] : "Gilbert";

      try {
        const [rows] = await db.query<UserRow[] & RowDataPacket[]>(
          "SELECT * FROM user WHERE email = ?",
          [user.email]
        );

        if (rows.length === 0) {
          await db.query(
            `INSERT INTO user (name, email) VALUES (?, ?)`,
            [name, user.email]
          );
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
};