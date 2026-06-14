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
