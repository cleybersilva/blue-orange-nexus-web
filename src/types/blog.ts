
export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  social_links?: any;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  summary: string;
  content: string;
  cover_image_url?: string;
  author_id: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  scheduled_at?: string;
  read_time?: number;
  category?: string;
  views?: number;
  shares?: number;
  likes?: number;
  created_at: string;
  updated_at: string;
  author?: Author;
}

export interface AdminRequest {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleAnalytics {
  id: string;
  article_id: string;
  view_date: string;
  views_count: number;
  shares_count: number;
  likes_count: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  role?: 'admin' | 'author_admin' | 'author';
  approved?: boolean;
  admin_level?: 'root' | 'admin';
  created_at: string;
  updated_at: string;
}
