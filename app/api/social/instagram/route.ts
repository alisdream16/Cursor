import { NextRequest, NextResponse } from "next/server";
import { InstagramClient } from "@/lib/social-media/instagram";

export async function GET(request: NextRequest) {
  try {
    const client = new InstagramClient();
    const profile = await client.getUserProfile();
    const media = await client.getMedia(5);

    return NextResponse.json({
      success: true,
      profile,
      recentMedia: media,
    });
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
    const { imageUrl, caption } = body;

    if (!imageUrl || !caption) {
      return NextResponse.json(
        { success: false, error: "imageUrl and caption are required" },
        { status: 400 }
      );
    }

    const client = new InstagramClient();
    const result = await client.postImage(imageUrl, caption);

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
