export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  imageUrl: string | null;
  sourceUrl: string;
  sourceName: string;
  publishedAt: Date;
  category: string;
  createdAt: Date;
}

export interface Interest {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  articleId: string;
  createdAt: Date;
  article?: Article;
}

export interface UserPreference {
  id: string;
  userId: string;
  darkMode: boolean;
  emailNotifications: boolean;
  articleCount: number;
  updatedAt: Date;
} 