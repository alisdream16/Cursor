import { NextRequest, NextResponse } from "next/server";
import {
  PostTemplate,
  generateHTMLTemplate,
  generatePostContent,
} from "@/lib/social-media/image-generator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const template: PostTemplate = body.template;

    if (!template || !template.type || !template.title) {
      return NextResponse.json(
        { success: false, error: "Valid template is required" },
        { status: 400 }
      );
    }

    const html = generateHTMLTemplate(template);
    const postContent = await generatePostContent(template);

    return NextResponse.json({
      success: true,
      html,
      caption: postContent.caption,
      hashtags: postContent.hashtags,
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
