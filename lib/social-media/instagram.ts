const FACEBOOK_GRAPH_URL = "https://graph.facebook.com/v18.0";

interface InstagramUser {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  media_count?: number;
}

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  timestamp: string;
  permalink: string;
}

interface PublishResult {
  success: boolean;
  id?: string;
  error?: string;
}

export class InstagramClient {
  private accessToken: string;
  private instagramAccountId: string;

  constructor(accessToken?: string, instagramAccountId?: string) {
    this.accessToken = accessToken || process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "";
    this.instagramAccountId = instagramAccountId || process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "";
  }

  private validateCredentials(): void {
    if (!this.accessToken) {
      throw new Error("Facebook Page Access Token is required");
    }
    if (!this.instagramAccountId) {
      throw new Error("Instagram Business Account ID is required");
    }
  }

  async getUserProfile(): Promise<InstagramUser> {
    this.validateCredentials();
    const response = await fetch(
      `${FACEBOOK_GRAPH_URL}/${this.instagramAccountId}?fields=id,username,name,profile_picture_url,followers_count,media_count&access_token=${this.accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Instagram API Error: ${error.error?.message || "Unknown error"}`);
    }

    return await response.json();
  }

  async getMedia(limit: number = 10): Promise<InstagramMedia[]> {
    const response = await fetch(
      `${FACEBOOK_GRAPH_URL}/${this.instagramAccountId}/media?fields=id,caption,media_type,media_url,timestamp,permalink&limit=${limit}&access_token=${this.accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Instagram API Error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.data;
  }

  async createMediaContainer(imageUrl: string, caption: string): Promise<string> {
    const response = await fetch(
      `${FACEBOOK_GRAPH_URL}/${this.instagramAccountId}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
          access_token: this.accessToken,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create media container: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.id;
  }

  async checkContainerStatus(containerId: string): Promise<string> {
    const response = await fetch(
      `${FACEBOOK_GRAPH_URL}/${containerId}?fields=status_code&access_token=${this.accessToken}`
    );

    if (!response.ok) {
      return "ERROR";
    }

    const data = await response.json();
    return data.status_code || "IN_PROGRESS";
  }

  async waitForContainerReady(containerId: string, maxAttempts: number = 10): Promise<boolean> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.checkContainerStatus(containerId);
      
      if (status === "FINISHED") {
        return true;
      }
      
      if (status === "ERROR") {
        return false;
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    
    return false;
  }

  async publishMedia(containerId: string): Promise<PublishResult> {
    const response = await fetch(
      `${FACEBOOK_GRAPH_URL}/${this.instagramAccountId}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: this.accessToken,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.error?.message || "Failed to publish",
      };
    }

    const data = await response.json();
    return {
      success: true,
      id: data.id,
    };
  }

  async postImage(imageUrl: string, caption: string): Promise<PublishResult> {
    try {
      const containerId = await this.createMediaContainer(imageUrl, caption);
      
      const isReady = await this.waitForContainerReady(containerId);
      if (!isReady) {
        return {
          success: false,
          error: "Image processing timed out or failed",
        };
      }
      
      return await this.publishMedia(containerId);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async createCarouselContainer(
    mediaUrls: string[],
    caption: string
  ): Promise<string> {
    const childContainerIds: string[] = [];
    
    for (const url of mediaUrls) {
      const response = await fetch(
        `${FACEBOOK_GRAPH_URL}/${this.instagramAccountId}/media`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: url,
            is_carousel_item: true,
            access_token: this.accessToken,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create carousel item");
      }

      const data = await response.json();
      childContainerIds.push(data.id);
    }

    for (const childId of childContainerIds) {
      await this.waitForContainerReady(childId);
    }

    const response = await fetch(
      `${FACEBOOK_GRAPH_URL}/${this.instagramAccountId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "CAROUSEL",
          children: childContainerIds.join(","),
          caption: caption,
          access_token: this.accessToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create carousel container");
    }

    const data = await response.json();
    return data.id;
  }

  async postCarousel(mediaUrls: string[], caption: string): Promise<PublishResult> {
    try {
      const containerId = await this.createCarouselContainer(mediaUrls, caption);
      
      await this.waitForContainerReady(containerId);
      
      return await this.publishMedia(containerId);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

