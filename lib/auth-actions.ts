"use server"

import { cookies } from "next/headers"

// In a real application, you would use a database to store users
// This is just a simple example for demonstration purposes
const DEMO_USERS = [
  {
    email: "demo@example.com",
    // In a real app, you would never store passwords in plain text
    // This is just for demonstration
    password: "password123",
  },
]

export async function login(email: string, password: string) {
  // Simulate a delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find the user
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    }
  }

  // In a real app, you would generate a proper JWT or session token
  // For this demo, we'll just set a simple cookie
  const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

  // Set the auth cookie
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })

  return {
    success: true,
  }
}

export async function logout() {
  cookies().delete("auth_token")

  return {
    success: true,
  }
}

export async function isAuthenticated() {
  return cookies().has("auth_token")
}
