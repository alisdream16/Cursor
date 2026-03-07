const LINKEDIN_API_URL = "https://api.linkedin.com/v2";
const LINKEDIN_OAUTH_URL = "https://www.linkedin.com/oauth/v2";

interface LinkedInProfile {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
}

interface LinkedInOrganization {
  id: string;
  localizedName: string;
}

interface PublishResult {
  success: boolean;
  id?: string;
  error?: string;
}

export class LinkedInClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.LINKEDIN_CLIENT_ID || "";
    this.clientSecret = process.env.LINKEDIN_CLIENT_SECRET || "";
    this.redirectUri = `${process.env.NEXTAUTH_URL}/api/social/linkedin/callback`;

    if (!this.clientId || !this.clientSecret) {
      throw new Error("LinkedIn credentials are required");
    }
  }

  getAuthorizationUrl(state: string): string {
    const scopes = [
      "openid",
      "profile",
      "w_member_social",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: state,
      scope: scopes,
    });

    return `${LINKEDIN_OAUTH_URL}/authorization?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    });

    const response = await fetch(`${LINKEDIN_OAUTH_URL}/accessToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`LinkedIn OAuth Error: ${error.error_description || "Unknown error"}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    return data.access_token;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  private getHeaders(): HeadersInit {
    if (!this.accessToken) {
      throw new Error("Access token is required. Call setAccessToken() first.");
    }

    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      "LinkedIn-Version": "202401",
    };
  }

  async getProfile(): Promise<LinkedInProfile> {
    const response = await fetch(`${LINKEDIN_API_URL}/userinfo`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`LinkedIn API Error: ${error.message || "Unknown error"}`);
    }

    return await response.json();
  }

  async getPersonUrn(): Promise<string> {
    const response = await fetch(`${LINKEDIN_API_URL}/userinfo`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    const data = await response.json();
    return `urn:li:person:${data.sub}`;
  }

  async postText(text: string): Promise<PublishResult> {
    try {
      const authorUrn = await this.getPersonUrn();

      const postData = {
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: text,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      };

      const response = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Failed to post",
        };
      }

      const data = await response.json();
      return {
        success: true,
        id: data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async postWithImage(text: string, imageUrl: string): Promise<PublishResult> {
    try {
      const authorUrn = await this.getPersonUrn();

      const postData = {
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: text,
            },
            shareMediaCategory: "ARTICLE",
            media: [
              {
                status: "READY",
                originalUrl: imageUrl,
              },
            ],
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      };

      const response = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Failed to post",
        };
      }

      const data = await response.json();
      return {
        success: true,
        id: data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async postToCompanyPage(
    organizationId: string,
    text: string,
    imageUrl?: string
  ): Promise<PublishResult> {
    try {
      const authorUrn = `urn:li:organization:${organizationId}`;

      const postData: any = {
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: text,
            },
            shareMediaCategory: imageUrl ? "ARTICLE" : "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      };

      if (imageUrl) {
        postData.specificContent["com.linkedin.ugc.ShareContent"].media = [
          {
            status: "READY",
            originalUrl: imageUrl,
          },
        ];
      }

      const response = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Failed to post",
        };
      }

      const data = await response.json();
      return {
        success: true,
        id: data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const linkedin = new LinkedInClient();
