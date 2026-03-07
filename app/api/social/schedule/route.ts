import { NextRequest, NextResponse } from "next/server";
import {
  schedulePost,
  getScheduledPosts,
  removePost,
  generateWeeklyContent,
  processScheduledPosts,
} from "@/lib/social-media/scheduler";
import { PostTemplate } from "@/lib/social-media/image-generator";

export async function GET() {
  try {
    const posts = getScheduledPosts();
    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
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
    const { action, template, scheduledAt, platform, postId } = body;

    switch (action) {
      case "schedule": {
        if (!template || !scheduledAt) {
          return NextResponse.json(
            { success: false, error: "template and scheduledAt are required" },
            { status: 400 }
          );
        }

        const post = schedulePost(
          template as PostTemplate,
          new Date(scheduledAt),
          platform || "instagram"
        );

        return NextResponse.json({
          success: true,
          post,
          message: "Post scheduled successfully",
        });
      }

      case "generate-weekly": {
        const posts = generateWeeklyContent();
        return NextResponse.json({
          success: true,
          posts,
          message: `Generated ${posts.length} posts for the week`,
        });
      }

      case "process": {
        const result = await processScheduledPosts();
        return NextResponse.json({
          success: true,
          ...result,
          message: `Processed ${result.processed} posts`,
        });
      }

      case "remove": {
        if (!postId) {
          return NextResponse.json(
            { success: false, error: "postId is required" },
            { status: 400 }
          );
        }

        const removed = removePost(postId);
        return NextResponse.json({
          success: removed,
          message: removed ? "Post removed" : "Post not found",
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }
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
