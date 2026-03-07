"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

type PostType = "job" | "freelancer" | "stat" | "tip" | "announcement";

interface ScheduledPost {
  id: string;
  template: {
    type: PostType;
    title: string;
    subtitle?: string;
  };
  scheduledAt: string;
  status: "pending" | "published" | "failed";
  platform: string;
}

const GRADIENTS = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  success: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  warning: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  info: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  dark: "linear-gradient(135deg, #232526 0%, #414345 100%)",
};

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState<"create" | "schedule" | "analytics">("create");
  const [postType, setPostType] = useState<PostType>("job");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [gradient, setGradient] = useState("primary");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  const generatePost = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/social/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: {
            type: postType,
            title,
            subtitle,
            description,
            gradient: GRADIENTS[gradient as keyof typeof GRADIENTS],
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedCaption(data.caption);
        setPreviewHtml(data.html);
      }
    } catch (error) {
      console.error("Error generating post:", error);
    }
    setLoading(false);
  };

  const schedulePost = async (scheduledAt: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/social/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "schedule",
          template: {
            type: postType,
            title,
            subtitle,
            description,
            gradient: GRADIENTS[gradient as keyof typeof GRADIENTS],
          },
          scheduledAt,
          platform: "instagram",
        }),
      });

      const data = await response.json();
      if (data.success) {
        loadScheduledPosts();
      }
    } catch (error) {
      console.error("Error scheduling post:", error);
    }
    setLoading(false);
  };

  const loadScheduledPosts = async () => {
    try {
      const response = await fetch("/api/social/schedule");
      const data = await response.json();
      if (data.success) {
        setScheduledPosts(data.posts);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const generateWeeklyContent = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/social/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-weekly" }),
      });

      const data = await response.json();
      if (data.success) {
        loadScheduledPosts();
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Social Media Manager</h1>
          <p className="text-gray-600">Create and schedule posts for Instagram</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["create", "schedule", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "schedule") loadScheduledPosts();
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Create Tab */}
        {activeTab === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Post Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post Type
                  </label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as PostType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="job">Job Posting</option>
                    <option value="freelancer">Featured Freelancer</option>
                    <option value="stat">Platform Stats</option>
                    <option value="tip">Career Tip</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter subtitle..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Theme
                  </label>
                  <div className="flex gap-2">
                    {Object.keys(GRADIENTS).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGradient(g)}
                        className={`w-10 h-10 rounded-lg border-2 ${
                          gradient === g ? "border-gray-900" : "border-transparent"
                        }`}
                        style={{ background: GRADIENTS[g as keyof typeof GRADIENTS] }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={generatePost}
                  disabled={loading || !title}
                  className="w-full py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Generating..." : "Generate Post"}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>

              {previewHtml ? (
                <div className="space-y-4">
                  <div
                    className="w-full aspect-square rounded-lg overflow-hidden"
                    style={{
                      background: GRADIENTS[gradient as keyof typeof GRADIENTS],
                    }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white text-center">
                      <span className="text-xs uppercase tracking-wider opacity-80 mb-2">
                        {postType}
                      </span>
                      <h3 className="text-2xl font-bold mb-2">{title}</h3>
                      {subtitle && <p className="opacity-90">{subtitle}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Generated Caption
                    </label>
                    <textarea
                      value={generatedCaption}
                      onChange={(e) => setGeneratedCaption(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="datetime-local"
                      id="scheduleTime"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById("scheduleTime") as HTMLInputElement;
                        if (input?.value) {
                          schedulePost(input.value);
                        }
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Fill in the form and click Generate to preview
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Scheduled Posts</h2>
              <button
                onClick={generateWeeklyContent}
                disabled={loading}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Weekly Content"}
              </button>
            </div>

            {scheduledPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No scheduled posts. Create some content or generate weekly posts.
              </div>
            ) : (
              <div className="space-y-3">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: GRADIENTS.primary }}
                      >
                        {post.template.type.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{post.template.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(post.scheduledAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : post.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.status}
                      </span>
                      <span className="text-sm text-gray-500">{post.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Instagram Analytics</h2>
            <div className="text-center py-12 text-gray-500">
              Analytics coming soon. Connect your Instagram account to view insights.
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
