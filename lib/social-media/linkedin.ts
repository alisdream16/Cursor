const LINKEDIN_API_URL = "https://api.linkedin.com";
const LINKEDIN_OAUTH_URL = "https://www.linkedin.com/oauth/v2";

interface LinkedInProfile {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
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

  constructor(clientId?: string, clientSecret?: string, redirectUri?: string) {
    this.clientId = clientId || "";
    this.clientSecret = clientSecret || "";
    this.redirectUri = redirectUri || "";
  }

  configure(clientId: string, clientSecret: string, redirectUri: string): void {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  isConfigured(): boolean {
    return !!this.clientId && !!this.clientSecret;
  }

  private validateCredentials(): void {
    if (!this.clientId || !this.clientSecret) {
      throw new Error("LinkedIn credentials are required. Call configure() first.");
    }
  }

  getAuthorizationUrl(state: string): string {
    this.validateCredentials();
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
    this.validateCredentials();
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
    const response = await fetch(`${LINKEDIN_API_URL}/v2/userinfo`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LinkedIn API Error: ${errorText}`);
    }

    return await response.json();
  }

  async getPersonUrn(): Promise<string> {
    const response = await fetch(`${LINKEDIN_API_URL}/v2/userinfo`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get user info: ${errorText}`);
    }

    const data = await response.json();
    return `urn:li:person:${data.sub}`;
  }

  async postText(text: string): Promise<PublishResult> {
    try {
      const authorUrn = await this.getPersonUrn();

      const postData = {
        author: authorUrn,
        commentary: text,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      };

      const response = await fetch(`${LINKEDIN_API_URL}/rest/posts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `LinkedIn API Error (${response.status}): ${errorText}`,
        };
      }

      const postId = response.headers.get("x-restli-id") || "unknown";
      return {
        success: true,
        id: postId,
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
        commentary: text,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        content: {
          article: {
            source: imageUrl,
            title: "HireNUp",
          },
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      };

      const response = await fetch(`${LINKEDIN_API_URL}/rest/posts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `LinkedIn API Error (${response.status}): ${errorText}`,
        };
      }

      const postId = response.headers.get("x-restli-id") || "unknown";
      return {
        success: true,
        id: postId,
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

      const postData: Record<string, unknown> = {
        author: authorUrn,
        commentary: text,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      };

      if (imageUrl) {
        postData.content = {
          article: {
            source: imageUrl,
            title: "HireNUp",
          },
        };
      }

      const response = await fetch(`${LINKEDIN_API_URL}/rest/posts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `LinkedIn API Error (${response.status}): ${errorText}`,
        };
      }

      const postId = response.headers.get("x-restli-id") || "unknown";
      return {
        success: true,
        id: postId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
