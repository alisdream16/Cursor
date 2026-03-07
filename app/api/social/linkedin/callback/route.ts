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
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      return new NextResponse(
        generateHtmlResponse(false, undefined, errorDescription || error),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (!code) {
      return new NextResponse(
        generateHtmlResponse(false, undefined, "No authorization code received"),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const client = getConfiguredClient();
    
    if (!client) {
      return new NextResponse(
        generateHtmlResponse(false, undefined, "LinkedIn not configured"),
        { headers: { "Content-Type": "text/html" } }
      );
    }
    
    const accessToken = await client.exchangeCodeForToken(code);

    return new NextResponse(
      generateHtmlResponse(true, accessToken),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      generateHtmlResponse(false, undefined, errorMessage),
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

function generateHtmlResponse(success: boolean, accessToken?: string, error?: string): string {
  if (success && accessToken) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>LinkedIn Connected - HireNUp</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; }
    .token { background: #f8f9fa; padding: 15px; border-radius: 4px; word-break: break-all; margin: 15px 0; font-family: monospace; font-size: 12px; }
    h1 { color: #155724; }
    .copy-btn { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
    .copy-btn:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="success">
    <h1>LinkedIn Connected Successfully!</h1>
    <p>Your access token (save this for API calls):</p>
    <div class="token" id="token">${accessToken}</div>
    <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('token').innerText); this.innerText='Copied!';">Copy Token</button>
  </div>
</body>
</html>`;
  } else {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>LinkedIn Error - HireNUp</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .error { background: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 8px; }
    h1 { color: #721c24; }
    .retry-btn { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
  </style>
</head>
<body>
  <div class="error">
    <h1>LinkedIn Connection Failed</h1>
    <p>Error: ${error || "Unknown error"}</p>
    <a href="/api/social/linkedin" class="retry-btn">Try Again</a>
  </div>
</body>
</html>`;
  }
}
