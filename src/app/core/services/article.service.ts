import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {

  async getAll(): Promise<Article[]> {
    const { data } = await supabase
      .from('articles')
      .select('*, category:article_categories(*)')
      .order('created_at', { ascending: false });
    return (data ?? []).map(this.mapRow);
  }

  async getPublished(): Promise<Article[]> {
    const { data } = await supabase
      .from('articles')
      .select('*, category:article_categories(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    return (data ?? []).map(this.mapRow);
  }

  async hasPublished(): Promise<boolean> {
    const { count } = await supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published');
    return (count ?? 0) > 0;
  }

  async getBySlug(slug: string): Promise<Article | undefined> {
    const { data } = await supabase
      .from('articles')
      .select('*, category:article_categories(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async getById(id: string): Promise<Article | undefined> {
    const { data } = await supabase
      .from('articles')
      .select('*, category:article_categories(*)')
      .eq('id', id)
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async create(article: Partial<Article>, authorId: string): Promise<void> {
    const { error } = await supabase.from('articles').insert(this.toRow(article, authorId));
    if (error) throw error;
  }

  async update(id: string, article: Partial<Article>): Promise<void> {
    const { error } = await supabase
      .from('articles')
      .update({ ...this.toRow(article), updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async publish(id: string): Promise<void> {
    const { error } = await supabase
      .from('articles')
      .update({ status: 'published', published_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async unpublish(id: string): Promise<void> {
    const { error } = await supabase
      .from('articles')
      .update({ status: 'draft', published_at: null, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
  }

  async incrementViews(id: string): Promise<void> {
    await supabase.rpc('increment_article_views', { article_id: id });
  }

  async getRelated(categoryId: string, excludeId: string, limit = 3): Promise<Article[]> {
    const { data } = await supabase
      .from('articles')
      .select('*, category:article_categories(*)')
      .eq('status', 'published')
      .eq('category_id', categoryId)
      .neq('id', excludeId)
      .limit(limit);
    return (data ?? []).map(this.mapRow);
  }

  private mapRow(row: any): Article {
    return {
      id: row.id,
      authorId: row.author_id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      coverImage: row.cover_image,
      status: row.status,
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      categoryId: row.category_id,
      category: row.category ?? undefined,
      views: row.views ?? 0,
    };
  }

  private toRow(article: Partial<Article>, authorId?: string): any {
    const row: any = {};
    if (authorId) row.author_id = authorId;
    if (article.title !== undefined) row.title = article.title;
    if (article.slug !== undefined) row.slug = article.slug;
    if (article.excerpt !== undefined) row.excerpt = article.excerpt;
    if (article.content !== undefined) row.content = article.content;
    if (article.coverImage !== undefined) row.cover_image = article.coverImage;
    if (article.status !== undefined) row.status = article.status;
    if (article.seoTitle !== undefined) row.seo_title = article.seoTitle;
    if (article.seoDescription !== undefined) row.seo_description = article.seoDescription;
    if (article.categoryId !== undefined) row.category_id = article.categoryId;
    return row;
  }
}
