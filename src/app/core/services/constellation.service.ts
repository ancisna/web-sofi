import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { Constellation, ConstellationModality } from '@core/models/constellation.model';

@Injectable({ providedIn: 'root' })
export class ConstellationService {
  async getAll(): Promise<Constellation[]> {
    const { data } = await supabase
      .from('constellations')
      .select('*')
      .order('created_at');
    return (data ?? []).map(this.mapRow);
  }

  async getAllActive(): Promise<Constellation[]> {
    const { data } = await supabase
      .from('constellations')
      .select('*')
      .eq('active', true)
      .order('created_at');
    return (data ?? []).map(this.mapRow);
  }

  async getFeatured(): Promise<Constellation[]> {
    const { data } = await supabase
      .from('constellations')
      .select('*')
      .eq('active', true)
      .limit(3);
    return (data ?? []).map(this.mapRow);
  }

  async getById(id: string): Promise<Constellation | undefined> {
    const { data } = await supabase
      .from('constellations')
      .select('*')
      .eq('id', id)
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async hasActive(): Promise<boolean> {
    const { count } = await supabase
      .from('constellations')
      .select('id', { count: 'exact', head: true })
      .eq('active', true);
    return (count ?? 0) > 0;
  }

  async create(c: Omit<Constellation, 'id'>): Promise<void> {
    const { error } = await supabase.from('constellations').insert(this.toRow(c));
    if (error) throw error;
  }

  async update(id: string, c: Partial<Constellation>): Promise<void> {
    const { error } = await supabase.from('constellations').update(this.toRow(c)).eq('id', id);
    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('constellations').delete().eq('id', id);
    if (error) throw error;
  }

  async clone(id: string): Promise<void> {
    const original = await this.getById(id);
    if (!original) return;
    await this.create({ ...original, title: `${original.title} (Copia)` });
  }

  private mapRow(row: any): Constellation {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      longDescription: row.long_description,
      duration: row.duration,
      price: row.price,
      active: row.active,
      modalities: (row.modalities as ConstellationModality[]) ?? [],
    };
  }

  private toRow(c: Partial<Constellation>): Record<string, unknown> {
    const row: Record<string, unknown> = {};
    if (c.title !== undefined)        row['title']            = c.title;
    if (c.description !== undefined)  row['description']      = c.description;
    if (c.longDescription !== undefined) row['long_description'] = c.longDescription;
    if (c.duration !== undefined)     row['duration']         = c.duration;
    if (c.price !== undefined)        row['price']            = c.price;
    if (c.active !== undefined)       row['active']           = c.active;
    if (c.modalities !== undefined)   row['modalities']       = c.modalities;
    return row;
  }
}
