import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/social/linkedin/callback`;

    if (!clientId) {
      return NextResponse.json({
        success: false,
        error: "LINKEDIN_CLIENT_ID not configured",
        env_check: {
          LINKEDIN_CLIENT_ID: !!process.env.LINKEDIN_CLIENT_ID,
          LINKEDIN_CLIENT_SECRET: !!process.env.LINKEDIN_CLIENT_SECRET,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        }
      }, { status: 500 });
    }

    const scopes = ["openid", "profile", "w_member_social"].join(" ");
    const state = Math.random().toString(36).substring(7);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state,
      scope: scopes,
    });

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;

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
