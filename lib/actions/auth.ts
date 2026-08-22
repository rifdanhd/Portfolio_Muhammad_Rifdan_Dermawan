"use server";

import { redirect } from "next/navigation";
import { verifyPassword, createAdminSession, destroyAdminSession } from "@/lib/auth";

export async function loginAction(prevState: { error?: string } | null, formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password is required." };
  }

  if (!verifyPassword(password)) {
    return { error: "Invalid password. Access denied." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
