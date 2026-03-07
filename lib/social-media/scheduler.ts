import { PostTemplate, generatePostContent, templates } from "./image-generator";

export interface ScheduledPost {
  id: string;
  template: PostTemplate;
  scheduledAt: Date;
  status: "pending" | "published" | "failed";
  platform: "instagram" | "twitter" | "linkedin";
  imageUrl?: string;
  caption?: string;
  error?: string;
  publishedAt?: Date;
}

export interface PostQueue {
  posts: ScheduledPost[];
}

const queue: PostQueue = { posts: [] };

export function schedulePost(
  template: PostTemplate,
  scheduledAt: Date,
  platform: "instagram" | "twitter" | "linkedin" = "instagram"
): ScheduledPost {
  const post: ScheduledPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    template,
    scheduledAt,
    status: "pending",
    platform,
  };

  queue.posts.push(post);
  return post;
}

export function getScheduledPosts(): ScheduledPost[] {
  return queue.posts.sort(
    (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime()
  );
}

export function getPendingPosts(): ScheduledPost[] {
  return queue.posts.filter((p) => p.status === "pending");
}

export function getPostsDueNow(): ScheduledPost[] {
  const now = new Date();
  return queue.posts.filter(
    (p) => p.status === "pending" && p.scheduledAt <= now
  );
}

export function updatePostStatus(
  postId: string,
  status: ScheduledPost["status"],
  error?: string
): void {
  const post = queue.posts.find((p) => p.id === postId);
  if (post) {
    post.status = status;
    if (error) post.error = error;
    if (status === "published") post.publishedAt = new Date();
  }
}

export function removePost(postId: string): boolean {
  const index = queue.posts.findIndex((p) => p.id === postId);
  if (index !== -1) {
    queue.posts.splice(index, 1);
    return true;
  }
  return false;
}

export function generateWeeklyContent(): ScheduledPost[] {
  const posts: ScheduledPost[] = [];
  const now = new Date();

  const contentPlan = [
    {
      day: 1,
      hour: 10,
      template: templates.careerTip(
        "Network Effectively",
        "Building genuine connections is more valuable than collecting contacts. Focus on providing value first."
      ),
    },
    {
      day: 2,
      hour: 14,
      template: templates.platformStats([
        { label: "Active Users", value: "10K+" },
        { label: "Projects", value: "5K+" },
        { label: "Companies", value: "2K+" },
        { label: "Jobs", value: "500+" },
      ]),
    },
    {
      day: 3,
      hour: 11,
      template: templates.careerTip(
        "Portfolio Tips",
        "Show your best 5-7 projects. Quality over quantity always wins."
      ),
    },
    {
      day: 4,
      hour: 15,
      template: templates.announcement(
        "New Features Coming!",
        "Stay tuned for exciting updates to improve your freelancing experience."
      ),
    },
    {
      day: 5,
      hour: 10,
      template: templates.careerTip(
        "Pricing Strategy",
        "Don't undervalue your work. Research market rates and price based on the value you deliver."
      ),
    },
  ];

  for (const content of contentPlan) {
    const scheduledAt = new Date(now);
    scheduledAt.setDate(now.getDate() + content.day);
    scheduledAt.setHours(content.hour, 0, 0, 0);

    posts.push(schedulePost(content.template, scheduledAt, "instagram"));
  }

  return posts;
}

export async function processScheduledPosts(): Promise<{
  processed: number;
  success: number;
  failed: number;
}> {
  const duePosts = getPostsDueNow();
  let success = 0;
  let failed = 0;

  for (const post of duePosts) {
    try {
      const content = await generatePostContent(post.template);
      post.caption = content.caption;
      
      updatePostStatus(post.id, "published");
      success++;
    } catch (error) {
      updatePostStatus(
        post.id,
        "failed",
        error instanceof Error ? error.message : "Unknown error"
      );
      failed++;
    }
  }

  return { processed: duePosts.length, success, failed };
}
