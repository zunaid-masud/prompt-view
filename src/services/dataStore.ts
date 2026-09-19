import { 
  Prompt, 
  Category, 
  Blog, 
  AITool, 
  Advertisement, 
  SiteSettings, 
  Subscriber, 
  User, 
  AdPosition 
} from '../types';

const STORAGE_KEYS = {
  PROMPTS: 'promptview_prompts_v2',
  CATEGORIES: 'promptview_categories_v2',
  BLOGS: 'promptview_blogs_v2',
  TOOLS: 'promptview_tools_v2',
  ADS: 'promptview_ads_v2',
  SETTINGS: 'promptview_settings_v2',
  SUBSCRIBERS: 'promptview_subscribers_v2',
  FAVORITES: 'promptview_favorites_v2',
  ADMIN_AUTH: 'promptview_admin_auth_v2',
};

// Initial Seed Data
const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-chatgpt',
    slug: 'chatgpt',
    name: 'ChatGPT',
    iconName: 'Bot',
    description: 'Prompts tailored for GPT-4o, o1, and ChatGPT conversational logic.',
    count: 24,
    color: '#10A37F',
    isTrending: true,
  },
  {
    id: 'cat-gemini',
    slug: 'gemini',
    name: 'Google Gemini',
    iconName: 'Sparkles',
    description: 'Multimodal, code reasoning, and research prompts for Google Gemini.',
    count: 18,
    color: '#4285F4',
    isTrending: true,
  },
  {
    id: 'cat-midjourney',
    slug: 'midjourney',
    name: 'Midjourney',
    iconName: 'Image',
    description: 'Photorealistic, cyberpunk, cinematic, and 3D Midjourney v6 prompts.',
    count: 32,
    color: '#FF1E2D',
    isTrending: true,
  },
  {
    id: 'cat-claude',
    slug: 'claude',
    name: 'Claude',
    iconName: 'Cpu',
    description: 'Anthropic Claude 3.5 Sonnet long-form writing and coding prompts.',
    count: 15,
    color: '#D97706',
    isTrending: false,
  },
  {
    id: 'cat-coding',
    slug: 'ai-coding',
    name: 'AI Coding',
    iconName: 'Code',
    description: 'Architecture, refactoring, bug fixing, and full-stack development prompts.',
    count: 28,
    color: '#8B5CF6',
    isTrending: true,
  },
  {
    id: 'cat-writing',
    slug: 'ai-writing',
    name: 'AI Writing',
    iconName: 'PenTool',
    description: 'Bangla and English copywriting, storytelling, scripts, and essays.',
    count: 20,
    color: '#EC4899',
    isTrending: false,
  },
  {
    id: 'cat-seo',
    slug: 'seo',
    name: 'SEO & Content',
    iconName: 'Search',
    description: 'Keyword research, meta descriptions, and ranking content frameworks.',
    count: 14,
    color: '#06B6D4',
    isTrending: true,
  },
  {
    id: 'cat-marketing',
    slug: 'marketing',
    name: 'Marketing',
    iconName: 'TrendingUp',
    description: 'High-converting ad copies, email campaigns, and growth strategies.',
    count: 19,
    color: '#F97316',
    isTrending: false,
  },
  {
    id: 'cat-video',
    slug: 'ai-video',
    name: 'AI Video',
    iconName: 'Video',
    description: 'Prompts for Sora, Runway Gen-3, Kling AI, and Pika camera movements.',
    count: 12,
    color: '#E11D48',
    isTrending: false,
  },
  {
    id: 'cat-business',
    slug: 'business',
    name: 'Business & Pitch',
    iconName: 'Briefcase',
    description: 'Pitch decks, business plans, financial forecasting, and market research.',
    count: 16,
    color: '#10B981',
    isTrending: false,
  },
  {
    id: 'cat-productivity',
    slug: 'productivity',
    name: 'Productivity',
    iconName: 'Zap',
    description: 'Daily planning, time-blocking, meeting summary, and workflow automation.',
    count: 21,
    color: '#6366F1',
    isTrending: false,
  },
  {
    id: 'cat-social',
    slug: 'social-media',
    name: 'Social Media',
    iconName: 'Share2',
    description: 'Viral hooks, TikTok/Reels scripts, LinkedIn carousels, and X threads.',
    count: 25,
    color: '#3B82F6',
    isTrending: true,
  }
];

const INITIAL_PROMPTS: Prompt[] = [
  {
    id: 'p-1',
    title: 'Cinematic Cyberpunk Dhaka 2077 Photoreal Masterpiece',
    slug: 'cinematic-cyberpunk-dhaka-2077',
    shortDescription: 'Ultra-detailed cinematic street photography of futuristic neon-lit Dhaka with rain reflections and flying rickshaws.',
    fullPrompt: '/imagine prompt: An ultra-realistic 8k cinematic street photograph of Old Dhaka in the year 2077, glowing red and crimson holographic neon signs in Bengali font, cybernetic flying rickshaws cruising wet asphalt, moody reflections, volumetric rainy mist, cinematic lighting, shot on 35mm Arri Alexa, anamorphic lens flare, photorealistic textures, hyper-detailed, octane render --ar 16:9 --v 6.0 --style raw --q 2 --s 750',
    categoryId: 'cat-midjourney',
    categoryName: 'Midjourney',
    aiModel: 'Midjourney',
    tags: ['Cyberpunk', 'Midjourney v6', 'Dhaka', 'Cinematic', 'Bengali Theme'],
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'Lead AI Prompt Engineer'
    },
    status: 'published',
    publishDate: '2026-09-18',
    viewsCount: 3420,
    copiesCount: 1240,
    favoritesCount: 380,
    isFeatured: true,
    rating: 4.9,
    difficulty: 'Intermediate'
  },
  {
    id: 'p-2',
    title: 'Expert Senior Full-Stack Code Reviewer & Bug Hunter',
    slug: 'expert-senior-full-stack-code-reviewer',
    shortDescription: 'Transforms ChatGPT or Claude into a Staff Engineer who performs deep architectural audits, vulnerability detection, and speed optimization.',
    fullPrompt: `You are a Staff Principal Software Engineer and Security Specialist with 15+ years of experience in TypeScript, React, Node.js, and Cloud Distributed Systems. 

Review the following codebase or snippet. Follow this strict review framework:
1. **Critical Bugs & Security Vulnerabilities**: Identify race conditions, injection vectors, memory leaks, and unhandled edge cases.
2. **Performance Bottlenecks**: Point out excessive re-renders, O(N^2) algorithms, and memory footprints with algorithmic proof.
3. **Refactored Code**: Provide the clean, production-grade, idiomatic TypeScript replacement using modern design patterns.
4. **Unit Test Checklist**: Provide 4 edge-case unit test scenarios using Vitest/Jest.

Code to analyze:
[PASTE YOUR CODE HERE]`,
    categoryId: 'cat-coding',
    categoryName: 'AI Coding',
    aiModel: 'Claude',
    tags: ['TypeScript', 'Architecture', 'Security', 'Claude 3.5 Sonnet', 'Code Review'],
    author: {
      name: 'Rahat Chowdhury',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      role: 'Staff Architect'
    },
    status: 'published',
    publishDate: '2026-09-17',
    viewsCount: 2890,
    copiesCount: 1120,
    favoritesCount: 295,
    isFeatured: true,
    rating: 4.8,
    difficulty: 'Advanced'
  },
  {
    id: 'p-3',
    title: 'High-Converting Facebook & Google Ad Copy Generator (Bangla + English)',
    slug: 'high-converting-ad-copy-generator-bangla',
    shortDescription: 'Generates 5 viral advertising angles using psychological triggers (FOMO, Storytelling, Hook-Story-Offer) for e-commerce and SaaS.',
    fullPrompt: `You are an elite Direct-Response Copywriter specializing in South Asian and Global digital marketing campaigns.

Product/Offer Details:
- Product Name: [Insert Product]
- Target Audience: [Insert Audience, e.g., Freelancers, Students, Small Business Owners in BD]
- Key Value Proposition: [Insert Main Benefit]
- Price/Offer: [Insert Price or Special Discount]

Generate 3 high-converting ad variants:
1. **Banglish / Conversational Bangla Style**: Natural, emotionally resonant hook that stops the scroll, addresses pain points directly, and has a strong CTA.
2. **Storytelling Angle (Bangla)**: Relatable before-after transformation story with clear emotional hook.
3. **English SaaS/E-commerce Direct-Response (AIDA formula)**: Attention-grabbing headline, interest building, desire amplification, irresistible CTA.

Include recommended headline, primary text, creative visual concept, and button CTA for each variant.`,
    categoryId: 'cat-marketing',
    categoryName: 'Marketing',
    aiModel: 'ChatGPT',
    tags: ['Bangla Copywriting', 'Facebook Ads', 'Marketing', 'Ecommerce', 'ChatGPT-4o'],
    author: {
      name: 'Nusrat Jahan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      role: 'Growth Marketer'
    },
    status: 'published',
    publishDate: '2026-09-16',
    viewsCount: 4120,
    copiesCount: 1890,
    favoritesCount: 512,
    isFeatured: true,
    rating: 5.0,
    difficulty: 'Beginner'
  },
  {
    id: 'p-4',
    title: 'Deep Research & Multimodal Analysis with Google Gemini 2.5',
    slug: 'deep-research-multimodal-analysis-gemini',
    shortDescription: 'Directs Gemini to execute a deep scientific synthesis, cross-referencing multi-domain sources with step-by-step logic chains.',
    fullPrompt: `Act as a Senior Research Fellow and Data Scientist. I will provide you with a research query or topic.

Synthesize a comprehensive research brief following this methodology:
1. **Executive Abstract**: 150-word synthesis of current state-of-the-art developments.
2. **Core Mechanisms & First Principles**: Explain underlying technical foundations with zero fluff.
3. **Comparative Analysis Matrix**: Build a structured Markdown table comparing competing methodologies, trade-offs, and benchmarks.
4. **Anticipated Breakthroughs (2026-2028)**: 3 data-driven forward projections.
5. **Actionable Implementation Steps**: Exact 5-phase execution roadmap with potential pitfall mitigation.

Topic: [ENTER YOUR TOPIC HERE]`,
    categoryId: 'cat-gemini',
    categoryName: 'Google Gemini',
    aiModel: 'Google Gemini',
    tags: ['Gemini', 'Research', 'Academic', 'Data Science', 'Analysis'],
    author: {
      name: 'Dr. Farhan Ahmed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      role: 'AI Researcher'
    },
    status: 'published',
    publishDate: '2026-09-15',
    viewsCount: 1980,
    copiesCount: 870,
    favoritesCount: 210,
    isFeatured: false,
    rating: 4.7,
    difficulty: 'Intermediate'
  },
  {
    id: 'p-5',
    title: '3D Isometric App Icon & Isometric Logo Generator',
    slug: '3d-isometric-app-icon-generator',
    shortDescription: 'Generates stunning, tactile 3D glassmorphic icons with glowing neon red accents and clay-like textures for modern mobile apps.',
    fullPrompt: '/imagine prompt: An exquisite 3D isometric app icon of a glowing red cybernetic brain with crystal circuits, sleek matte dark charcoal base, smooth rounded bevels, glowing red LED light tracing, glossy glass and translucent frosted plastic materials, studio lighting on pure black background, 8k resolution, raytraced shadows, Apple Design Award aesthetics, rendered in Cinema 4D and Octane --ar 1:1 --v 6.0 --style raw --q 2',
    categoryId: 'cat-midjourney',
    categoryName: 'Midjourney',
    aiModel: 'Midjourney',
    tags: ['App Icon', '3D UI', 'Midjourney', 'Isometric', 'Branding'],
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sadia Karim',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      role: '3D Visual Artist'
    },
    status: 'published',
    publishDate: '2026-09-14',
    viewsCount: 3100,
    copiesCount: 1450,
    favoritesCount: 420,
    isFeatured: true,
    rating: 4.9,
    difficulty: 'Beginner'
  },
  {
    id: 'p-6',
    title: 'SEO Topical Authority Master Outline & Semantic Cluster Builder',
    slug: 'seo-topical-authority-cluster-builder',
    shortDescription: 'Build an entire 30-article topical cluster hierarchy that dominates Google SERPs for any primary seed keyword.',
    fullPrompt: `You are an elite SEO Strategist specializing in Semantic SEO and Topical Authority mapping for Google Search.

Target Seed Keyword / Niche: [Insert Keyword e.g., "AI Automation for Agencies"]
Target Audience: [Insert Audience]

Please generate:
1. **Pillar Page Specification**: Title, search intent, primary entity relationships, and core H2/H3 outline.
2. **20 Supporting Cluster Articles**: Grouped into Sub-topics (Foundational, Practical How-To, Comparison/Versus, Commercial). For each article provide:
   - Primary Keyword & Estimated Search Intent
   - Suggested SEO Title (Click-worthy & High CTR)
   - Internal linking blueprint back to the Pillar Page.
3. **Structured Schema Recommendations**: Required JSON-LD entities (Article, FAQ, HowTo).`,
    categoryId: 'cat-seo',
    categoryName: 'SEO & Content',
    aiModel: 'ChatGPT',
    tags: ['SEO', 'Topical Authority', 'Content Cluster', 'Google Ranking', 'Keyword Strategy'],
    author: {
      name: 'Mahmudul Hasan',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      role: 'SEO Consultant'
    },
    status: 'published',
    publishDate: '2026-09-13',
    viewsCount: 2240,
    copiesCount: 980,
    favoritesCount: 310,
    isFeatured: false,
    rating: 4.8,
    difficulty: 'Intermediate'
  },
  {
    id: 'p-7',
    title: 'Viral YouTube & Reels Hook Generator (Bengali & English)',
    slug: 'viral-youtube-reels-hook-generator',
    shortDescription: '10 attention-grabbing viral video hooks engineered with open loops and psychological pattern interrupts.',
    fullPrompt: `Act as a Viral Short-Form Video Producer with over 50M+ organic views on YouTube Shorts, Instagram Reels, and TikTok.

Video Topic: [Insert Topic]
Target Audience: [Insert Audience]

Create 10 magnetic 3-second visual and audio hooks using these psychological techniques:
1. The "Negative Outcome Avoidance" Hook
2. The "Counter-Intuitive Secret" Hook
3. The "Visual Pattern Interrupt" Hook (Describe what happens on screen + what is said)
4. The "I Tried X for 30 Days" Hook
5. The "Stop Doing This Immediately" Hook

Provide both conversational Bangla (Banglish/Standard) and English versions for each hook.`,
    categoryId: 'cat-social',
    categoryName: 'Social Media',
    aiModel: 'ChatGPT',
    tags: ['Viral Hooks', 'YouTube Shorts', 'Instagram Reels', 'Bangla Script', 'Content Creation'],
    author: {
      name: 'Nusrat Jahan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      role: 'Growth Marketer'
    },
    status: 'published',
    publishDate: '2026-09-12',
    viewsCount: 3600,
    copiesCount: 1620,
    favoritesCount: 440,
    isFeatured: false,
    rating: 4.9,
    difficulty: 'Beginner'
  },
  {
    id: 'p-8',
    title: 'Sora & Runway Gen-3 Cinematic Drone Movement Master Prompt',
    slug: 'sora-runway-gen3-cinematic-drone-prompt',
    shortDescription: 'Precision video generation prompt with camera panning, focal length, lighting, and physics simulation parameters.',
    fullPrompt: 'Ultra-cinematic FPV drone shot accelerating through a dense neon cyberpunk mega-city canyon, rain droplets splashing on camera lens, sweeping low-angle orbit around a glowing red monolith skyscraper, dynamic volumetric lightning storm in background, hyper-realistic reflections on wet glass facades, 60fps buttery smooth camera trajectory, 8k hyper-detailed photorealism, cinematic color grading, blade runner atmospheric haze.',
    categoryId: 'cat-video',
    categoryName: 'AI Video',
    aiModel: 'Runway Gen-3',
    tags: ['Runway Gen-3', 'Sora', 'Video Prompt', 'Cinematic Drone', 'FPV'],
    featuredImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'Lead AI Prompt Engineer'
    },
    status: 'published',
    publishDate: '2026-09-11',
    viewsCount: 2750,
    copiesCount: 940,
    favoritesCount: 360,
    isFeatured: true,
    rating: 4.9,
    difficulty: 'Advanced'
  }
];

const INITIAL_BLOGS: Blog[] = [
  {
    id: 'b-1',
    slug: 'mastering-midjourney-v6-prompts-guide-2026',
    title: 'Midjourney v6 দিয়ে প্রফেশনাল ফটো ও আর্ট তৈরির পূর্ণাঙ্গ বাংলা গাইড',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'কীভাবে সঠিক প্যারামিটার, ক্যামেরা লেন্স এবং লাইটিং কিওয়ার্ড ব্যবহার করে মিডজার্নি থেকে নিখুঁত হাইপার-রিয়েলিস্টিক ছবি তৈরি করবেন জেনে নিন বিস্তারিত।',
    fullContent: `## মিডজার্নি v6 এর বিস্ময়কর ক্ষমতা

২০২৬ সালে এসে জেনারেটিভ AI ইমেজ তৈরির জগতে Midjourney v6 এক যুগান্তকারী পরিবর্তন এনেছে। বিশেষ করে ফটোরিয়ালিস্টিক টেক্সচার, মানুষের হাতের সূক্ষ্ম ডিটেইলস এবং সঠিক টেক্সট রেন্ডারিংয়ে এর তুলনা মেলা ভার।

### ১. বেসিক থেকে প্রো প্রম্পট স্ট্রাকচার
একটি আদর্শ মিডজার্নি প্রম্পটের ৪টি প্রধান অংশ থাকে:
1. **Main Subject (মূল চরিত্র বা বস্তু)**: কে বা কী ছবিতে থাকবে।
2. **Context & Environment (পরিবেশ ও ব্যাকগ্রাউন্ড)**: কোথায় ঘটনাটি ঘটছে (যেমন: cyberpunk street, minimalist studio)।
3. **Lighting & Camera (লাইটিং ও ক্যামেরা লেন্স)**: cinematic volumetric lighting, 85mm portrait lens, f/1.4 aperture।
4. **Parameters (কমান্ড প্যারামিটার)**: \`--ar 16:9\`, \`--style raw\`, \`--v 6.0\`, \`--s 750\`।

### ২. কেন \`--style raw\` ব্যবহার করবেন?
মিডজার্নি সাধারণত নিজের মতো করে কিছু আর্টিস্টিক ফিল্টার যোগ করে। কিন্তু আপনি যদি একদম বাস্তবসম্মত ফটোগ্রাফির ফিল চান, তবে অবশ্যই প্রম্পটের শেষে \`--style raw\` যোগ করুন।

### ৩. সেরা কিছু ফটোগ্রাফিক লাইটিং কিওয়ার্ড
- **Volumetric Lighting / God Rays**: নাটকীয় আলোর রশ্মি তৈরি করে।
- **Rim Lighting / Edge Glow**: সাবজেক্টের পেছনের বর্ডার সুন্দরভাবে ফুটিয়ে তোলে।
- **Golden Hour Warmth**: প্রাকৃতিক নরম সূর্যাস্তের আলো।

PromptView এর প্রম্পট লাইব্রেরি থেকে সরাসরি সেরা প্রম্পটগুলো কপি করে আপনিও এখনই শুরু করতে পারেন!`,
    author: {
      name: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    category: 'Image Generation',
    tags: ['Midjourney', 'AI Art', 'Bangla Guide', 'Tutorial', 'Photography'],
    status: 'published',
    publishDate: '2026-09-15',
    readTimeMinutes: 5,
    viewsCount: 4280,
    isFeatured: true
  },
  {
    id: 'b-2',
    slug: 'chatgpt-prompt-engineering-best-practices',
    title: 'ChatGPT থেকে সেরা রেজাল্ট পাওয়ার ৫টি গোপন প্রম্পট ইঞ্জিনিয়ারিং ফর্মুলা',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'শুধু সাধারণ প্রশ্ন না করে কীভাবে রোল প্লেয়িং, ফিউ-শট এক্সাম্পল এবং চেইন অব থট টেকনিক দিয়ে কাঙ্ক্ষিত আউটপুট বের করবেন।',
    fullContent: `## প্রম্পট ইঞ্জিনিয়ারিং কেন এত গুরুত্বপূর্ণ?

আমরা অনেকেই ChatGPT থেকে প্রত্যাশিত উত্তর পাই না কারণ আমাদের প্রম্পটগুলো খুব সংক্ষিপ্ত এবং অস্পষ্ট থাকে। AI কে সঠিক নির্দেশনা দিলে এটি একজন দক্ষ বিশেষজ্ঞের মতো কাজ করতে পারে।

### ফর্মুলা ১: Persona + Context + Task + Constraint
- **Persona**: আপনি AI কে কী হিসেবে দেখতে চান (যেমন: Senior Copywriter)।
- **Context**: আপনার ব্যাকগ্রাউন্ড কী এবং টার্গেট অডিয়েন্স কারা।
- **Task**: ঠিক কী তৈরি করতে হবে।
- **Constraint**: শব্দসীমা, টোন এবং যে বিষয়গুলো বর্জন করতে হবে।

### ফর্মুলা ২: Chain of Thought (ধাপে ধাপে চিন্তা)
যেকোনো জটিল সমস্যার ক্ষেত্রে বলুন: *"Think step-by-step before answering and explain your reasoning."* এতে ভুলের সম্ভাবনা ৮০% কমে যায়।

### ফর্মুলা ৩: Output Formatting
AI কে সবসময় বলুন আউটপুট টেবিল আকারে, বুলেট পয়েন্টে অথবা নির্দিষ্ট JSON স্কিমা অনুযায়ী দিতে।`,
    author: {
      name: 'Nusrat Jahan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
    },
    category: 'ChatGPT',
    tags: ['ChatGPT', 'Prompt Engineering', 'Productivity', 'AI Tips'],
    status: 'published',
    publishDate: '2026-09-12',
    readTimeMinutes: 4,
    viewsCount: 3150,
    isFeatured: true
  },
  {
    id: 'b-3',
    slug: 'top-ai-coding-tools-for-developers-2026',
    title: '২০২৬ সালে ডেভেলপারদের জন্য শীর্ষ ৫টি এআই কোডিং অ্যাসিস্ট্যান্ট ও প্রম্পট',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Cursor, Claude 3.5 Sonnet, GitHub Copilot এবং Gemini কোড অ্যাসিস্ট্যান্ট দিয়ে কীভাবে আপনার প্রোডাক্টিভিটি ১০ গুণ বাড়াবেন।',
    fullContent: `## কোডিংয়ে AI বিপ্লব

সফটওয়্যার ডেভেলপমেন্টে এখন সবচেয়ে বড় পরিবর্তন এনেছে AI কোডিং মডেলগুলো। বিশেষ করে জটিল অ্যালগরিদম ডিজাইন, রিফ্যাক্টরিং এবং ইউনিট টেস্ট তৈরিতে Claude 3.5 Sonnet এবং Cursor অবিশ্বাস্য পারফরম্যান্স দিচ্ছে।

### কীভাবে সেরা কোডিং প্রম্পট লিখবেন?
1. **প্রজেক্ট স্ট্যাক উল্লেখ করুন**: যেমন Next.js 15, Tailwind v4, TypeScript 5.5।
2. **এরর মেসেজ এবং স্ট্যাকট্রেস সম্পূর্ণ দিন**।
3. **ক্লিন কোড ও সলিড প্রিন্সিপল নিশ্চিত করতে বলুন**।`,
    author: {
      name: 'Rahat Chowdhury',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    category: 'AI Coding',
    tags: ['Coding', 'TypeScript', 'Claude', 'Cursor', 'Development'],
    status: 'published',
    publishDate: '2026-09-10',
    readTimeMinutes: 6,
    viewsCount: 2650,
    isFeatured: false
  }
];

const INITIAL_TOOLS: AITool[] = [
  {
    id: 'tool-1',
    name: 'Midjourney v6',
    slug: 'midjourney',
    iconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'World-leading generative AI art and ultra-photorealistic image generation platform via Discord & Web.',
    category: 'Text to Image',
    directUrl: 'https://www.midjourney.com',
    pricingType: 'Paid',
    rating: 4.9,
    featured: true,
    badge: 'Popular',
    tags: ['Text-to-Image', 'Photorealistic', 'Art']
  },
  {
    id: 'tool-2',
    name: 'Flux.1 by Black Forest Labs',
    slug: 'flux-1',
    iconUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'State-of-the-art open-weights image generation model with unmatched typography and prompt fidelity.',
    category: 'Text to Image',
    directUrl: 'https://blackforestlabs.ai',
    pricingType: 'Open Source',
    rating: 4.9,
    featured: true,
    badge: 'Trending',
    tags: ['Open Source', 'Fast', 'Typography']
  },
  {
    id: 'tool-3',
    name: 'Magnific AI',
    slug: 'magnific-ai',
    iconUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'Insanely powerful AI image upscaler and hallucinating detail enhancer for high-res creative projects.',
    category: 'Image Upscaler',
    directUrl: 'https://magnific.ai',
    pricingType: 'Paid',
    rating: 4.8,
    featured: true,
    tags: ['Upscaler', 'Super Resolution', 'Enhancer']
  },
  {
    id: 'tool-4',
    name: 'Leonardo.Ai',
    slug: 'leonardo-ai',
    iconUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'Feature-packed AI image suite with custom fine-tuned models, canvas editor, and realtime generation.',
    category: 'Text to Image',
    directUrl: 'https://leonardo.ai',
    pricingType: 'Freemium',
    rating: 4.7,
    featured: false,
    tags: ['Canvas', 'Assets', 'Game Art']
  },
  {
    id: 'tool-5',
    name: 'Runway Gen-3 Alpha',
    slug: 'runway-gen-3',
    iconUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'High-fidelity cinematic text-to-video and image-to-video generation with expressive camera controls.',
    category: 'AI Video',
    directUrl: 'https://runwayml.com',
    pricingType: 'Freemium',
    rating: 4.8,
    featured: true,
    badge: 'Hot',
    tags: ['Video Gen', 'Cinematics', 'Animation']
  },
  {
    id: 'tool-6',
    name: 'Ideogram 2.0',
    slug: 'ideogram',
    iconUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'Unbeatable AI model for rendering crisp, legible typography, t-shirt graphics, and poster designs.',
    category: 'Graphic Design',
    directUrl: 'https://ideogram.ai',
    pricingType: 'Freemium',
    rating: 4.8,
    featured: false,
    tags: ['Typography', 'Logos', 'T-Shirts']
  },
  {
    id: 'tool-7',
    name: 'Krea AI',
    slug: 'krea-ai',
    iconUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'Real-time interactive AI canvas generation and video animation tool with instant canvas feedback.',
    category: 'Realtime AI',
    directUrl: 'https://krea.ai',
    pricingType: 'Freemium',
    rating: 4.7,
    featured: false,
    tags: ['Realtime', 'Drawing', 'Upscale']
  },
  {
    id: 'tool-8',
    name: 'Clipdrop by Jasper',
    slug: 'clipdrop',
    iconUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
    shortDescription: 'Complete ecosystem of AI image editing apps: Relight, Remove Background, Cleanup, and Reimagine.',
    category: 'Image Editing',
    directUrl: 'https://clipdrop.co',
    pricingType: 'Freemium',
    rating: 4.6,
    featured: false,
    tags: ['Relight', 'Background Remover', 'Editing']
  }
];

const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-top-banner',
    title: 'Top Special Sponsor Banner',
    position: 'top_banner',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://promptview.ai',
    isActive: true,
    impressions: 14200,
    clicks: 840,
    sponsorName: 'PromptView VIP Cloud Hub',
    badgeText: 'SPONSORED'
  },
  {
    id: 'ad-header',
    title: 'Header Red Spotlight Ad',
    position: 'header_ad',
    imageUrl: '',
    targetUrl: '#',
    isActive: false,
    impressions: 0,
    clicks: 0,
    sponsorName: 'AI Studio Partner'
  },
  {
    id: 'ad-main-content',
    title: 'In-Feed AI Accelerator Program',
    position: 'main_content',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    targetUrl: 'https://promptview.ai',
    isActive: true,
    impressions: 9800,
    clicks: 620,
    sponsorName: 'PromptView Pro Cloud Masterclass',
    badgeText: 'FEATURED PARTNER'
  },
  {
    id: 'ad-sidebar',
    title: 'Sidebar Premium Tools Bundle',
    position: 'sidebar',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    targetUrl: 'https://promptview.ai',
    isActive: true,
    impressions: 11400,
    clicks: 710,
    sponsorName: 'AI Supercharger Pack (90% OFF)',
    badgeText: 'ADVERTISEMENT'
  },
  {
    id: 'ad-popup',
    title: 'Special Welcome Offer Popup',
    position: 'popup',
    imageUrl: '',
    targetUrl: '#',
    isActive: false,
    impressions: 0,
    clicks: 0
  }
];

const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'PromptView',
  taglineBn: 'এক ক্লিকেই সেরা AI Prompt খুঁজে নিন',
  taglineEn: 'Find the Best AI Prompts, Tools & Resources in One Place',
  heroHeadlineBn: 'এক ক্লিকেই সেরা AI Prompt খুঁজে নিন',
  heroSubheadingBn: 'সেরা AI Prompt, AI Tools, Templates এবং Resources এক জায়গায়। ChatGPT, Gemini, Midjourney এবং Claude এর জন্য তৈরি সেরা কালেকশন।',
  contactEmail: 'contact@promptview.ai',
  copyrightText: '© 2026 PromptView. All rights reserved. Built for modern creators & developers.',
  enableAds: true,
  enableNewsletter: true,
  twitterUrl: 'https://twitter.com/promptview',
  facebookUrl: 'https://facebook.com/promptview',
  telegramUrl: 'https://t.me/promptview',
  githubUrl: 'https://github.com/promptview'
};

const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'PromptView Admin',
    email: 'admin@promptview.ai',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    createdAt: '2026-01-01'
  }
];

// Helper to load or initialize from localStorage
function getStoredData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
  }
  return fallback;
}

function setStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error saving localStorage key "${key}":`, err);
  }
}

type Listener = () => void;

class DataStoreService {
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error notifying dataStore listener:', err);
      }
    });
  }

  // --- Prompts ---
  public getPrompts(): Prompt[] {
    return getStoredData<Prompt[]>(STORAGE_KEYS.PROMPTS, INITIAL_PROMPTS);
  }

  public getPromptById(id: string): Prompt | undefined {
    return this.getPrompts().find((p) => p.id === id || p.slug === id);
  }

  public addPrompt(promptData: Omit<Prompt, 'id' | 'viewsCount' | 'copiesCount' | 'favoritesCount'>): Prompt {
    const prompts = this.getPrompts();
    const newPrompt: Prompt = {
      ...promptData,
      id: `p-${Date.now()}`,
      slug: promptData.slug || promptData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      viewsCount: 0,
      copiesCount: 0,
      favoritesCount: 0,
    };
    const updated = [newPrompt, ...prompts];
    setStoredData(STORAGE_KEYS.PROMPTS, updated);
    this.recalculateCategoryCounts();
    this.notify();
    return newPrompt;
  }

  public updatePrompt(id: string, updates: Partial<Prompt>): Prompt | null {
    const prompts = this.getPrompts();
    const index = prompts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedItem = { ...prompts[index], ...updates };
    prompts[index] = updatedItem;
    setStoredData(STORAGE_KEYS.PROMPTS, prompts);
    this.recalculateCategoryCounts();
    this.notify();
    return updatedItem;
  }

  public deletePrompt(id: string): boolean {
    const prompts = this.getPrompts();
    const filtered = prompts.filter((p) => p.id !== id);
    if (filtered.length !== prompts.length) {
      setStoredData(STORAGE_KEYS.PROMPTS, filtered);
      this.recalculateCategoryCounts();
      this.notify();
      return true;
    }
    return false;
  }

  public incrementCopies(id: string): void {
    const prompts = this.getPrompts();
    const item = prompts.find((p) => p.id === id);
    if (item) {
      item.copiesCount = (item.copiesCount || 0) + 1;
      setStoredData(STORAGE_KEYS.PROMPTS, prompts);
      this.notify();
    }
  }

  public incrementViews(id: string): void {
    const prompts = this.getPrompts();
    const item = prompts.find((p) => p.id === id);
    if (item) {
      item.viewsCount = (item.viewsCount || 0) + 1;
      setStoredData(STORAGE_KEYS.PROMPTS, prompts);
      this.notify();
    }
  }

  // --- Categories ---
  public getCategories(): Category[] {
    return getStoredData<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  public getCategoryById(id: string): Category | undefined {
    return this.getCategories().find((c) => c.id === id || c.slug === id);
  }

  public addCategory(catData: Omit<Category, 'id' | 'count'>): Category {
    const categories = this.getCategories();
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      count: 0,
    };
    const updated = [...categories, newCat];
    setStoredData(STORAGE_KEYS.CATEGORIES, updated);
    this.recalculateCategoryCounts();
    this.notify();
    return newCat;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedItem = { ...categories[index], ...updates };
    categories[index] = updatedItem;
    setStoredData(STORAGE_KEYS.CATEGORIES, categories);
    this.notify();
    return updatedItem;
  }

  public deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filtered = categories.filter((c) => c.id !== id);
    if (filtered.length !== categories.length) {
      setStoredData(STORAGE_KEYS.CATEGORIES, filtered);
      this.notify();
      return true;
    }
    return false;
  }

  private recalculateCategoryCounts(): void {
    const categories = this.getCategories();
    const prompts = this.getPrompts();
    const updated = categories.map((cat) => {
      const matchCount = prompts.filter(
        (p) => p.categoryId === cat.id || p.categoryName.toLowerCase() === cat.name.toLowerCase()
      ).length;
      return { ...cat, count: matchCount };
    });
    setStoredData(STORAGE_KEYS.CATEGORIES, updated);
  }

  // --- Blogs ---
  public getBlogs(): Blog[] {
    return getStoredData<Blog[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  }

  public getBlogById(id: string): Blog | undefined {
    return this.getBlogs().find((b) => b.id === id || b.slug === id);
  }

  public addBlog(blogData: Omit<Blog, 'id' | 'viewsCount'>): Blog {
    const blogs = this.getBlogs();
    const newBlog: Blog = {
      ...blogData,
      id: `b-${Date.now()}`,
      slug: blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      viewsCount: 0,
    };
    const updated = [newBlog, ...blogs];
    setStoredData(STORAGE_KEYS.BLOGS, updated);
    this.notify();
    return newBlog;
  }

  public updateBlog(id: string, updates: Partial<Blog>): Blog | null {
    const blogs = this.getBlogs();
    const index = blogs.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedItem = { ...blogs[index], ...updates };
    blogs[index] = updatedItem;
    setStoredData(STORAGE_KEYS.BLOGS, blogs);
    this.notify();
    return updatedItem;
  }

  public deleteBlog(id: string): boolean {
    const blogs = this.getBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    if (filtered.length !== blogs.length) {
      setStoredData(STORAGE_KEYS.BLOGS, filtered);
      this.notify();
      return true;
    }
    return false;
  }

  // --- Tools ---
  public getTools(): AITool[] {
    return getStoredData<AITool[]>(STORAGE_KEYS.TOOLS, INITIAL_TOOLS);
  }

  public addTool(toolData: Omit<AITool, 'id'>): AITool {
    const tools = this.getTools();
    const newTool: AITool = {
      ...toolData,
      id: `tool-${Date.now()}`,
      slug: toolData.slug || toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };
    const updated = [newTool, ...tools];
    setStoredData(STORAGE_KEYS.TOOLS, updated);
    this.notify();
    return newTool;
  }

  public updateTool(id: string, updates: Partial<AITool>): AITool | null {
    const tools = this.getTools();
    const index = tools.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updatedItem = { ...tools[index], ...updates };
    tools[index] = updatedItem;
    setStoredData(STORAGE_KEYS.TOOLS, tools);
    this.notify();
    return updatedItem;
  }

  public deleteTool(id: string): boolean {
    const tools = this.getTools();
    const filtered = tools.filter((t) => t.id !== id);
    if (filtered.length !== tools.length) {
      setStoredData(STORAGE_KEYS.TOOLS, filtered);
      this.notify();
      return true;
    }
    return false;
  }

  // --- Advertisements ---
  public getAds(): Advertisement[] {
    return getStoredData<Advertisement[]>(STORAGE_KEYS.ADS, INITIAL_ADS);
  }

  public getAdByPosition(pos: AdPosition): Advertisement | undefined {
    return this.getAds().find((a) => a.position === pos && a.isActive);
  }

  public addAd(adData: Omit<Advertisement, 'id' | 'impressions' | 'clicks'>): Advertisement {
    const ads = this.getAds();
    const newAd: Advertisement = {
      ...adData,
      id: `ad-${Date.now()}`,
      impressions: 0,
      clicks: 0,
    };
    const updated = [...ads, newAd];
    setStoredData(STORAGE_KEYS.ADS, updated);
    this.notify();
    return newAd;
  }

  public updateAd(id: string, updates: Partial<Advertisement>): Advertisement | null {
    const ads = this.getAds();
    const index = ads.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updatedItem = { ...ads[index], ...updates };
    ads[index] = updatedItem;
    setStoredData(STORAGE_KEYS.ADS, ads);
    this.notify();
    return updatedItem;
  }

  public deleteAd(id: string): boolean {
    const ads = this.getAds();
    const filtered = ads.filter((a) => a.id !== id);
    if (filtered.length !== ads.length) {
      setStoredData(STORAGE_KEYS.ADS, filtered);
      this.notify();
      return true;
    }
    return false;
  }

  public recordAdClick(id: string): void {
    const ads = this.getAds();
    const ad = ads.find((a) => a.id === id);
    if (ad) {
      ad.clicks = (ad.clicks || 0) + 1;
      setStoredData(STORAGE_KEYS.ADS, ads);
      this.notify();
    }
  }

  // --- Settings ---
  public getSettings(): SiteSettings {
    return getStoredData<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  public updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    setStoredData(STORAGE_KEYS.SETTINGS, updated);
    this.notify();
    return updated;
  }

  // --- Subscribers ---
  public getSubscribers(): Subscriber[] {
    return getStoredData<Subscriber[]>(STORAGE_KEYS.SUBSCRIBERS, [
      { id: 'sub-1', email: 'creator@gmail.com', subscribedAt: '2026-09-10' },
      { id: 'sub-2', email: 'developer.bd@outlook.com', subscribedAt: '2026-09-12' },
    ]);
  }

  public subscribeEmail(email: string): { success: boolean; message: string } {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'সঠিক ইমেইল এড্রেস প্রদান করুন।' };
    }
    const list = this.getSubscribers();
    if (list.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return { success: true, message: 'আপনি আগেই সাবস্ক্রাইব করেছেন! ধন্যবাদ।' };
    }
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email: email.trim().toLowerCase(),
      subscribedAt: new Date().toISOString().split('T')[0],
    };
    setStoredData(STORAGE_KEYS.SUBSCRIBERS, [newSub, ...list]);
    this.notify();
    return { success: true, message: 'PromptView নিউজলেটারে সফলভাবে যুক্ত হয়েছেন!' };
  }

  // --- Favorites ---
  public getFavorites(): string[] {
    return getStoredData<string[]>(STORAGE_KEYS.FAVORITES, ['p-1', 'p-3']);
  }

  public toggleFavorite(promptId: string): boolean {
    const favs = this.getFavorites();
    let isFav = false;
    let updated: string[];
    if (favs.includes(promptId)) {
      updated = favs.filter((id) => id !== promptId);
      isFav = false;
    } else {
      updated = [...favs, promptId];
      isFav = true;
    }
    setStoredData(STORAGE_KEYS.FAVORITES, updated);

    // Also update prompt favorite count
    const prompts = this.getPrompts();
    const p = prompts.find((item) => item.id === promptId);
    if (p) {
      p.favoritesCount = Math.max(0, (p.favoritesCount || 0) + (isFav ? 1 : -1));
      setStoredData(STORAGE_KEYS.PROMPTS, prompts);
    }

    this.notify();
    return isFav;
  }

  // --- Users & Admin Auth ---
  public getUsers(): User[] {
    return INITIAL_USERS;
  }

  public isAdminAuthenticated(): boolean {
    return getStoredData<boolean>(STORAGE_KEYS.ADMIN_AUTH, false);
  }

  public setAdminAuthenticated(auth: boolean): void {
    setStoredData(STORAGE_KEYS.ADMIN_AUTH, auth);
    this.notify();
  }

  // --- Reset to Default Seed ---
  public resetToDefaultSeeds(): void {
    setStoredData(STORAGE_KEYS.PROMPTS, INITIAL_PROMPTS);
    setStoredData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setStoredData(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    setStoredData(STORAGE_KEYS.TOOLS, INITIAL_TOOLS);
    setStoredData(STORAGE_KEYS.ADS, INITIAL_ADS);
    setStoredData(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    this.recalculateCategoryCounts();
    this.notify();
  }
}

export const dataStore = new DataStoreService();
