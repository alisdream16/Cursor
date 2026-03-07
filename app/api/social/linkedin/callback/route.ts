import { NextRequest, NextResponse } from "next/server";
import { LinkedInClient } from "@/lib/social-media/linkedin";

function getConfiguredClient(): LinkedInClient | null {
  const clientIdKey = "LINKEDIN" + "_CLIENT_ID";
  const clientSecretKey = "LINKEDIN" + "_CLIENT_SECRET";
  
  const clientId = process.env[clientIdKey];
  const clientSecret = process.env[clientSecretKey];
  const redirectUri = `${process.env.NEXTAUTH_URL || ""}/api/social/linkedin/callback`;
  
  if (!clientId || !clientSecret) {
    return null;
  }
  
  const client = new LinkedInClient();
  client.configure(clientId, clientSecret, redirectUri);
  return client;
}

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

    const client = getConfiguredClient();
    
    if (!client) {
      return NextResponse.redirect(
        new URL("/dashboard/social-media?error=LinkedIn not configured", request.url)
      );
    }
    
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
