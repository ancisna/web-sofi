import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { Workshop } from '@core/models/workshop.model';

@Injectable({ providedIn: 'root' })
export class WorkshopService {
  async getAll(): Promise<Workshop[]> {
    const { data } = await supabase
      .from('workshops')
      .select('*')
      .order('created_at');
    return (data ?? []).map(this.mapRow);
  }

  async getAllActive(): Promise<Workshop[]> {
    const { data } = await supabase
      .from('workshops')
      .select('*')
      .eq('active', true)
      .order('created_at');
    return (data ?? []).map(this.mapRow);
  }

  async getFeatured(): Promise<Workshop[]> {
    const { data } = await supabase
      .from('workshops')
      .select('*')
      .eq('active', true)
      .limit(4);
    return (data ?? []).map(this.mapRow);
  }

  async getById(id: string): Promise<Workshop | undefined> {
    const { data } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', id)
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async create(workshop: Omit<Workshop, 'id'>): Promise<void> {
    await supabase.from('workshops').insert(this.toRow(workshop));
  }

  async update(id: string, workshop: Partial<Workshop>): Promise<void> {
    await supabase.from('workshops').update(this.toRow(workshop)).eq('id', id);
  }

  async delete(id: string): Promise<void> {
    await supabase.from('workshops').delete().eq('id', id);
  }

  async clone(id: string): Promise<void> {
    const original = await this.getById(id);
    if (!original) return;
    await this.create({ ...original, title: `${original.title} (Copia)` });
  }

  private mapRow(row: any): Workshop {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      longDescription: row.long_description,
      date: row.date,
      price: row.price,
      active: row.active,
    };
  }

  private toRow(w: Partial<Workshop>): any {
    return {
      title: w.title,
      description: w.description,
      long_description: w.longDescription,
      date: w.date,
      price: w.price,
      active: w.active,
    };
  }
}
