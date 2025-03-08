import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // Handle error from Google
  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=${encodeURIComponent(error)}`
    );
  }

  // If no code was received, redirect to the home page
  if (!code) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL as string);
  }

  // Redirect to a front-end route that will handle the code
  // This allows your front-end to use the tRPC getTokens mutation
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/google?code=${encodeURIComponent(code)}`
  );
}
