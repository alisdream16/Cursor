export interface PostTemplate {
  type: "job" | "freelancer" | "stat" | "tip" | "announcement";
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  stats?: { label: string; value: string }[];
  gradient?: string;
}

export interface GeneratedPost {
  imageUrl: string;
  caption: string;
  hashtags: string[];
}

const HIRENUP_HASHTAGS = [
  "#Hirenup",
  "#FreelanceWork",
  "#RemoteJobs",
  "#TechJobs",
  "#HiringNow",
  "#CareerGrowth",
  "#Freelancer",
  "#JobSearch",
  "#WorkFromHome",
  "#DigitalNomad",
];

const GRADIENTS = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  success: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  warning: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  info: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  dark: "linear-gradient(135deg, #232526 0%, #414345 100%)",
};

export function generateCaption(template: PostTemplate): string {
  let caption = "";

  switch (template.type) {
    case "job":
      caption = `🚀 New Job Alert!\n\n${template.title}\n\n${template.description || ""}\n\n💼 Apply now on Hirenup!\n🔗 Link in bio`;
      break;
    case "freelancer":
      caption = `⭐ Featured Freelancer\n\n${template.title}\n${template.subtitle || ""}\n\n${template.description || ""}\n\n🔍 Find talented freelancers on Hirenup!`;
      break;
    case "stat":
      caption = `📊 Hirenup Stats\n\n${template.stats?.map((s) => `${s.label}: ${s.value}`).join("\n") || ""}\n\n🚀 Join our growing community!`;
      break;
    case "tip":
      caption = `💡 Career Tip\n\n${template.title}\n\n${template.description || ""}\n\n✨ More tips on Hirenup!`;
      break;
    case "announcement":
      caption = `📣 Announcement\n\n${template.title}\n\n${template.description || ""}`;
      break;
  }

  return caption;
}

export function selectHashtags(template: PostTemplate, count: number = 5): string[] {
  const typeHashtags: Record<string, string[]> = {
    job: ["#Hiring", "#JobOpening", "#NewJob", "#TechCareers", "#Developer"],
    freelancer: ["#FreelanceLife", "#FreelanceTips", "#SelfEmployed", "#IndependentContractor"],
    stat: ["#GrowthMetrics", "#StartupLife", "#TechStartup", "#BusinessGrowth"],
    tip: ["#CareerAdvice", "#ProfessionalDevelopment", "#CareerTips", "#SuccessTips"],
    announcement: ["#News", "#Update", "#Announcement", "#ExcitingNews"],
  };

  const selected = [
    ...HIRENUP_HASHTAGS.slice(0, 3),
    ...(typeHashtags[template.type] || []).slice(0, count - 3),
  ];

  if (template.tags) {
    selected.push(...template.tags.map((t) => `#${t.replace(/\s+/g, "")}`));
  }

  return selected.slice(0, count);
}

export function generateHTMLTemplate(template: PostTemplate): string {
  const gradient = template.gradient || GRADIENTS.primary;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1080px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: ${gradient};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      color: white;
    }
    .logo {
      position: absolute;
      top: 40px;
      left: 40px;
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -1px;
    }
    .badge {
      background: rgba(255,255,255,0.2);
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 40px;
    }
    .title {
      font-size: 64px;
      font-weight: 800;
      text-align: center;
      line-height: 1.1;
      margin-bottom: 30px;
      max-width: 900px;
    }
    .subtitle {
      font-size: 28px;
      opacity: 0.9;
      text-align: center;
      margin-bottom: 40px;
    }
    .tags {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag {
      background: rgba(255,255,255,0.15);
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 16px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      margin-top: 40px;
    }
    .stat-item {
      text-align: center;
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 20px;
    }
    .stat-value {
      font-size: 48px;
      font-weight: 800;
    }
    .stat-label {
      font-size: 18px;
      opacity: 0.8;
      margin-top: 8px;
    }
    .cta {
      position: absolute;
      bottom: 40px;
      font-size: 20px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="logo">Hirenup</div>
  
  <div class="badge">${template.type.toUpperCase()}</div>
  
  <h1 class="title">${template.title}</h1>
  
  ${template.subtitle ? `<p class="subtitle">${template.subtitle}</p>` : ""}
  
  ${
    template.stats
      ? `
    <div class="stats-grid">
      ${template.stats.map((s) => `
        <div class="stat-item">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join("")}
    </div>
  `
      : ""
  }
  
  ${
    template.tags
      ? `
    <div class="tags">
      ${template.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
    </div>
  `
      : ""
  }
  
  <div class="cta">hirenup.com</div>
</body>
</html>
  `.trim();
}

export async function generatePostContent(template: PostTemplate): Promise<GeneratedPost> {
  const caption = generateCaption(template);
  const hashtags = selectHashtags(template);
  
  return {
    imageUrl: "",
    caption: `${caption}\n\n${hashtags.join(" ")}`,
    hashtags,
  };
}

export const templates = {
  newJob: (title: string, company: string, tags: string[]): PostTemplate => ({
    type: "job",
    title,
    subtitle: `at ${company}`,
    tags,
    gradient: GRADIENTS.primary,
  }),

  featuredFreelancer: (name: string, skill: string, rating: string): PostTemplate => ({
    type: "freelancer",
    title: name,
    subtitle: skill,
    description: `⭐ ${rating} Rating`,
    gradient: GRADIENTS.success,
  }),

  platformStats: (stats: { label: string; value: string }[]): PostTemplate => ({
    type: "stat",
    title: "Growing Together",
    stats,
    gradient: GRADIENTS.info,
  }),

  careerTip: (tip: string, description: string): PostTemplate => ({
    type: "tip",
    title: tip,
    description,
    gradient: GRADIENTS.warning,
  }),

  announcement: (title: string, description: string): PostTemplate => ({
    type: "announcement",
    title,
    description,
    gradient: GRADIENTS.dark,
  }),
};
