import { ArticleCategory } from './article-category.model';

export type ArticleStatus = 'draft' | 'published';

export interface Article {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: any;
  coverImage: string | null;
  status: ArticleStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: string | null;
  category?: ArticleCategory;
}
