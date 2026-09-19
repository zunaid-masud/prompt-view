export type AIModelType = 
  | 'ChatGPT'
  | 'Google Gemini'
  | 'Claude'
  | 'Midjourney'
  | 'Stable Diffusion'
  | 'Flux.1'
  | 'DALL-E 3'
  | 'Leonardo AI'
  | 'Sora'
  | 'Runway Gen-3'
  | 'DeepSeek'
  | 'Other AI Tools';

export interface Author {
  name: string;
  avatar: string;
  role?: string;
}

export interface Prompt {
  id: string;
  title: string;
  slug: string;
  fullPrompt: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  aiModel: AIModelType | string;
  tags: string[];
  featuredImage?: string;
  author: Author;
  status: 'published' | 'draft';
  publishDate: string;
  viewsCount: number;
  copiesCount: number;
  favoritesCount: number;
  isFeatured?: boolean;
  rating?: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  count: number;
  color?: string;
  isTrending?: boolean;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  featuredImage: string;
  excerpt: string;
  fullContent: string;
  author: Author;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  publishDate: string;
  readTimeMinutes: number;
  viewsCount: number;
  isFeatured?: boolean;
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  shortDescription: string;
  category: string;
  directUrl: string;
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  rating: number;
  featured?: boolean;
  badge?: string;
  tags?: string[];
}

export type AdPosition = 'top_banner' | 'header_ad' | 'main_content' | 'sidebar' | 'popup';

export interface Advertisement {
  id: string;
  title: string;
  position: AdPosition;
  imageUrl: string;
  targetUrl: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  sponsorName?: string;
  badgeText?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'member';
  avatar: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  taglineBn: string;
  taglineEn: string;
  heroHeadlineBn: string;
  heroSubheadingBn: string;
  contactEmail: string;
  copyrightText: string;
  enableAds: boolean;
  enableNewsletter: boolean;
  twitterUrl: string;
  facebookUrl: string;
  telegramUrl: string;
  githubUrl: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}
