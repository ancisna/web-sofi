import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TherapyService } from './therapy.service';

// Supabase mock reutilizable
function makeBuilder(resolved: { data?: any; error?: any; count?: number } = {}) {
  const r = { data: resolved.data ?? null, error: resolved.error ?? null, count: resolved.count ?? null };
  const builder: any = {
    select: vi.fn().mockReturnThis(),
    eq:     vi.fn().mockReturnThis(),
    order:  vi.fn().mockReturnThis(),
    limit:  vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(r),
    insert: vi.fn().mockResolvedValue(r),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  };
  builder.then = (res: any, rej: any) => Promise.resolve(r).then(res, rej);
  return builder;
}

vi.mock('@core/supabase/supabase.client', () => ({
  supabase: { from: vi.fn(), rpc: vi.fn() },
}));

import { supabase } from '@core/supabase/supabase.client';
const mockSupabase = supabase as any;

const rawTherapy = {
  id: 'uuid-1',
  title: 'Terapia individual',
  description: 'Desc',
  long_description: 'Desc larga',
  duration: 50,
  price: 60,
  active: true,
  modalities: ['online', 'presencial'],
  bonus_enabled: true,
  bonus_sessions: 5,
  bonus_discount: 30,
};

describe('TherapyService', () => {
  let service: TherapyService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new TherapyService();
  });

  describe('getAll()', () => {
    it('devuelve array vacío cuando no hay datos', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [] }));
      const result = await service.getAll();
      expect(result).toEqual([]);
    });

    it('mapea correctamente snake_case a camelCase', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [rawTherapy] }));
      const result = await service.getAll();
      expect(result[0]).toMatchObject({
        id: 'uuid-1',
        title: 'Terapia individual',
        longDescription: 'Desc larga',
        bonusEnabled: true,
        bonusSessions: 5,
        bonusDiscount: 30,
        modalities: ['online', 'presencial'],
      });
    });

    it('llama a supabase.from con la tabla correcta', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [] }));
      await service.getAll();
      expect(mockSupabase.from).toHaveBeenCalledWith('therapies');
    });
  });

  describe('getAllActive()', () => {
    it('filtra por active = true', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getAllActive();
      expect(builder.eq).toHaveBeenCalledWith('active', true);
    });
  });

  describe('getById()', () => {
    it('devuelve undefined cuando no hay datos', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: null }));
      const result = await service.getById('uuid-1');
      expect(result).toBeUndefined();
    });

    it('devuelve la terapia mapeada cuando existe', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: rawTherapy }));
      const result = await service.getById('uuid-1');
      expect(result?.id).toBe('uuid-1');
      expect(result?.title).toBe('Terapia individual');
    });
  });

  describe('hasActive()', () => {
    it('devuelve true cuando count > 0', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: 3 }));
      const result = await service.hasActive();
      expect(result).toBe(true);
    });

    it('devuelve false cuando count es 0', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: 0 }));
      const result = await service.hasActive();
      expect(result).toBe(false);
    });

    it('devuelve false cuando count es null', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: undefined }));
      const result = await service.hasActive();
      expect(result).toBe(false);
    });
  });

  describe('create()', () => {
    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'Error de BD' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(
        service.create({ title: 'Test', description: '', longDescription: '', duration: 50, active: true })
      ).rejects.toEqual({ message: 'Error de BD' });
    });

    it('no lanza cuando se crea correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(
        service.create({ title: 'Test', description: '', longDescription: '', duration: 50, active: true })
      ).resolves.toBeUndefined();
    });
  });

  describe('delete()', () => {
    it('no lanza cuando se borra correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.delete('uuid-1')).resolves.toBeUndefined();
    });

    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'No se puede borrar' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.delete('uuid-1')).rejects.toEqual({ message: 'No se puede borrar' });
    });
  });

  describe('getFeatured()', () => {
    it('limita a 3 resultados', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getFeatured();
      expect(builder.limit).toHaveBeenCalledWith(3);
    });

    it('filtra solo terapias activas', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getFeatured();
      expect(builder.eq).toHaveBeenCalledWith('active', true);
    });

    it('devuelve las terapias mapeadas', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [rawTherapy] }));
      const result = await service.getFeatured();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('uuid-1');
    });
  });

  describe('update()', () => {
    it('no lanza cuando se actualiza correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.update('uuid-1', { title: 'Nuevo título' })).resolves.toBeUndefined();
    });

    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'Error de actualización' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.update('uuid-1', { title: 'Test' })).rejects.toEqual({ message: 'Error de actualización' });
    });

    it('llama a update con el id correcto', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.update('uuid-1', { active: false });
      expect(builder.eq).toHaveBeenCalledWith('id', 'uuid-1');
    });
  });

  describe('clone()', () => {
    it('crea una copia con "(Copia)" en el título', async () => {
      const builder = makeBuilder({ data: rawTherapy, error: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.clone('uuid-1');
      const insertCall = builder.insert.mock.calls[0]?.[0];
      expect(insertCall?.title).toBe('Terapia individual (Copia)');
    });

    it('no hace nada si la terapia no existe', async () => {
      const builder = makeBuilder({ data: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.clone('no-existe');
      expect(builder.insert).not.toHaveBeenCalled();
    });
  });
});
