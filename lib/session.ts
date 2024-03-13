// this file includes the session management logic for
// creating, verifying, and deleting sessions with server-side tokens.

"server-only"

import { db } from "@/drizzle/db"
import { sessions } from "@/drizzle/schema"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const secretKey = "yourSecretKey"

export async function createSession(id: number) {
  const token = jwt.sign({ id }, secretKey, {
    expiresIn: "1h",
  })

  // Option 1: Storing server-side tokens
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

  const serverToken = await db
    .insert(sessions)
    .values({
      userId: id,
      token,
      expiresAt,
    })
    .returning({ token: sessions.token })

  // Option 2: Stateless session
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 3600),
    sameSite: "lax",
    path: "/",
  })
}

export async function verifySession() {
}

export function updateSession() {}

export function deleteSesssion() {
}
