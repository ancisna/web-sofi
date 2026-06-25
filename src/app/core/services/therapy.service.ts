import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { Therapy, TherapyModality } from '@core/models/therapy.model';

@Injectable({ providedIn: 'root' })
export class TherapyService {
  async getAll(): Promise<Therapy[]> {
    const { data } = await supabase
      .from('therapies')
      .select('*')
      .order('created_at');
    return (data ?? []).map(this.mapRow);
  }

  async getAllActive(): Promise<Therapy[]> {
    const { data } = await supabase
      .from('therapies')
      .select('*')
      .eq('active', true)
      .order('created_at');
    return (data ?? []).map(this.mapRow);
  }

  async getFeatured(): Promise<Therapy[]> {
    const { data } = await supabase
      .from('therapies')
      .select('*')
      .eq('active', true)
      .limit(3);
    return (data ?? []).map(this.mapRow);
  }

  async hasActive(): Promise<boolean> {
    const { count } = await supabase
      .from('therapies')
      .select('id', { count: 'exact', head: true })
      .eq('active', true);
    return (count ?? 0) > 0;
  }

  async getById(id: string): Promise<Therapy | undefined> {
    const { data } = await supabase
      .from('therapies')
      .select('*')
      .eq('id', id)
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async create(therapy: Omit<Therapy, 'id'>): Promise<void> {
    const { error } = await supabase.from('therapies').insert(this.toRow(therapy));
    if (error) throw error;
  }

  async update(id: string, therapy: Partial<Therapy>): Promise<void> {
    const { error } = await supabase.from('therapies').update(this.toRow(therapy)).eq('id', id);
    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('therapies').delete().eq('id', id);
    if (error) throw error;
  }

  async clone(id: string): Promise<void> {
    const original = await this.getById(id);
    if (!original) return;
    await this.create({ ...original, title: `${original.title} (Copia)` });
  }

  private mapRow(row: any): Therapy {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      longDescription: row.long_description,
      duration: row.duration,
      price: row.price,
      active: row.active,
      modalities: (row.modalities as TherapyModality[]) ?? [],
      bonusEnabled: row.bonus_enabled ?? false,
      bonusSessions: row.bonus_sessions ?? undefined,
      bonusDiscount: row.bonus_discount ?? undefined,
    };
  }

  private toRow(t: Partial<Therapy>): Record<string, unknown> {
    const row: Record<string, unknown> = {};
    if (t.title !== undefined)         row['title']          = t.title;
    if (t.description !== undefined)   row['description']    = t.description;
    if (t.longDescription !== undefined) row['long_description'] = t.longDescription;
    if (t.duration !== undefined)      row['duration']       = t.duration;
    if (t.price !== undefined)         row['price']          = t.price;
    if (t.active !== undefined)        row['active']         = t.active;
    if (t.modalities !== undefined)    row['modalities']     = t.modalities;
    if (t.bonusEnabled !== undefined)  row['bonus_enabled']  = t.bonusEnabled;
    if (t.bonusSessions !== undefined) row['bonus_sessions'] = t.bonusSessions;
    if (t.bonusDiscount !== undefined) row['bonus_discount'] = t.bonusDiscount;
    return row;
  }
}
