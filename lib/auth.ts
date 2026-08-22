import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "editorial-brutalist-secret-key-2026";

export function verifyPassword(password: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin";
  return password === expectedPassword;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return sessionToken === SESSION_SECRET;
}
