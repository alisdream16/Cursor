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

export async function GET() {
  try {
    const client = getConfiguredClient();
    
    if (!client) {
      return NextResponse.json({
        success: false,
        error: "LinkedIn not configured",
      }, { status: 503 });
    }

    const state = Math.random().toString(36).substring(7);
    const authUrl = client.getAuthorizationUrl(state);

    return NextResponse.redirect(authUrl);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, text, imageUrl, organizationId } = body;

    if (!accessToken || !text) {
      return NextResponse.json(
        { success: false, error: "accessToken and text are required" },
        { status: 400 }
      );
    }

    const client = new LinkedInClient();
    client.setAccessToken(accessToken);

    let result;
    if (organizationId) {
      result = await client.postToCompanyPage(organizationId, text, imageUrl);
    } else if (imageUrl) {
      result = await client.postWithImage(text, imageUrl);
    } else {
      result = await client.postText(text);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
