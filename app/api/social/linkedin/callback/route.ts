import { NextRequest, NextResponse } from "next/server";
import { LinkedInClient } from "@/lib/social-media/linkedin";

function getConfiguredClient(): LinkedInClient | null {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXTAUTH_URL || ""}/api/social/linkedin/callback`;
  
  if (!clientId || !clientSecret) {
    return null;
  }
  
  const client = new LinkedInClient();
  client.configure(clientId, clientSecret, redirectUri);
  return client;
}

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.hirenup.com";
  
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/social-media?error=${encodeURIComponent(errorDescription || error)}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/social-media?error=No authorization code received`
      );
    }

    const client = getConfiguredClient();
    
    if (!client) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/social-media?error=LinkedIn not configured`
      );
    }
    
    const accessToken = await client.exchangeCodeForToken(code);

    return NextResponse.redirect(
      `${baseUrl}/dashboard/social-media?linkedin_connected=true&access_token=${accessToken}`
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.redirect(
      `${baseUrl}/dashboard/social-media?error=${encodeURIComponent(errorMessage)}`
    );
  }
}
