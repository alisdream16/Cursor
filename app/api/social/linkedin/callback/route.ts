import { NextRequest, NextResponse } from "next/server";
import { LinkedInClient } from "@/lib/social-media/linkedin";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/dashboard/social-media?error=${encodeURIComponent(errorDescription || error)}`,
          request.url
        )
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/dashboard/social-media?error=No authorization code received", request.url)
      );
    }

    const client = new LinkedInClient();
    const accessToken = await client.exchangeCodeForToken(code);

    return NextResponse.redirect(
      new URL(
        `/dashboard/social-media?linkedin_connected=true&access_token=${accessToken}`,
        request.url
      )
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.redirect(
      new URL(
        `/dashboard/social-media?error=${encodeURIComponent(errorMessage)}`,
        request.url
      )
    );
  }
}
