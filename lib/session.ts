// this file includes the sessiong management logic for
// creating, verifying, and deleting sessions with JWTs and server-side cookies.

"use server"

import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const secretKey = "yourSecretKey"

export function createSession(id: number) {}

export function deleteSesssion() {}

export function updateSession() {}

export function verifySession() {}
