import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { ArticleCategory } from '../models/article-category.model';

@Injectable({ providedIn: 'root' })
export class ArticleCategoryService {
  async getAll(): Promise<ArticleCategory[]> {
    const { data } = await supabase
      .from('article_categories')
      .select('*')
      .order('name');
    return (data ?? []).map(this.mapRow);
  }

  async getById(id: string): Promise<ArticleCategory | undefined> {
    const { data } = await supabase
      .from('article_categories')
      .select('*')
      .eq('id', id)
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async create(category: { name: string; slug: string; description?: string; color?: string }): Promise<void> {
    await supabase.from('article_categories').insert({
      name: category.name,
      slug: category.slug,
      description: category.description || null,
      color: category.color || null,
    });
  }

  async update(id: string, category: Partial<{ name: string; slug: string; description: string; color: string }>): Promise<void> {
    await supabase.from('article_categories').update({
      ...category,
      updated_at: new Date().toISOString(),
    }).eq('id', id);
  }

  async delete(id: string): Promise<void> {
    await supabase.from('article_categories').delete().eq('id', id);
  }

  private mapRow(row: any): ArticleCategory {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      color: row.color,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
