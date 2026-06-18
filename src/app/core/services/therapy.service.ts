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

  async getById(id: string): Promise<Therapy | undefined> {
    const { data } = await supabase
      .from('therapies')
      .select('*')
      .eq('id', id)
      .single();
    return data ? this.mapRow(data) : undefined;
  }

  async create(therapy: Omit<Therapy, 'id'>): Promise<void> {
    await supabase.from('therapies').insert(this.toRow(therapy));
  }

  async update(id: string, therapy: Partial<Therapy>): Promise<void> {
    await supabase.from('therapies').update(this.toRow(therapy)).eq('id', id);
  }

  async delete(id: string): Promise<void> {
    await supabase.from('therapies').delete().eq('id', id);
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
      modality: (row.modality as TherapyModality) ?? undefined,
      bonusSessions: row.bonus_sessions ?? undefined,
      bonusPrice: row.bonus_price ?? undefined,
    };
  }

  private toRow(t: Partial<Therapy>): any {
    return {
      title: t.title,
      description: t.description,
      long_description: t.longDescription,
      duration: t.duration,
      price: t.price,
      active: t.active,
      modality: t.modality ?? null,
      bonus_sessions: t.bonusSessions ?? null,
      bonus_price: t.bonusPrice ?? null,
    };
  }
}
