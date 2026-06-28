import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkshopService } from './workshop.service';

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

const rawWorkshop = {
  id: 'uuid-w1',
  title: 'Taller de mindfulness',
  description: 'Desc',
  long_description: 'Desc larga',
  date: '2024-09-15',
  price: 35,
  active: true,
  modality: 'presencial',
  start_time: '10:00',
  end_time: '12:00',
  location: 'Centro de bienestar',
};

describe('WorkshopService', () => {
  let service: WorkshopService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new WorkshopService();
  });

  describe('getAll()', () => {
    it('mapea snake_case a camelCase correctamente', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [rawWorkshop] }));
      const result = await service.getAll();
      expect(result[0]).toMatchObject({
        id: 'uuid-w1',
        longDescription: 'Desc larga',
        startTime: '10:00',
        endTime: '12:00',
        location: 'Centro de bienestar',
        modality: 'presencial',
      });
    });

    it('devuelve array vacío cuando no hay datos', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [] }));
      expect(await service.getAll()).toEqual([]);
    });
  });

  describe('mapRow — campos opcionales', () => {
    it('modality undefined cuando null en BD', async () => {
      const raw = { ...rawWorkshop, modality: null };
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [raw] }));
      const result = await service.getAll();
      expect(result[0].modality).toBeUndefined();
    });

    it('startTime undefined cuando null en BD', async () => {
      const raw = { ...rawWorkshop, start_time: null };
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [raw] }));
      const result = await service.getAll();
      expect(result[0].startTime).toBeUndefined();
    });

    it('location undefined cuando null en BD', async () => {
      const raw = { ...rawWorkshop, location: null };
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [raw] }));
      const result = await service.getAll();
      expect(result[0].location).toBeUndefined();
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
      expect(await service.getById('no-existe')).toBeUndefined();
    });

    it('devuelve el taller mapeado cuando existe', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: rawWorkshop }));
      const result = await service.getById('uuid-w1');
      expect(result?.title).toBe('Taller de mindfulness');
    });
  });

  describe('getFeatured()', () => {
    it('limita a 4 resultados', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getFeatured();
      expect(builder.limit).toHaveBeenCalledWith(4);
    });

    it('filtra solo talleres activos', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getFeatured();
      expect(builder.eq).toHaveBeenCalledWith('active', true);
    });
  });

  describe('update()', () => {
    it('no lanza cuando se actualiza correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.update('uuid-w1', { title: 'Nuevo título' })).resolves.toBeUndefined();
    });

    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'Error de actualización' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.update('uuid-w1', { title: 'Test' })).rejects.toEqual({ message: 'Error de actualización' });
    });

    it('llama a update con el id correcto', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.update('uuid-w1', { active: false });
      expect(builder.eq).toHaveBeenCalledWith('id', 'uuid-w1');
    });
  });

  describe('delete()', () => {
    it('no lanza cuando se borra correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.delete('uuid-w1')).resolves.toBeUndefined();
    });

    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'No se puede borrar' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.delete('uuid-w1')).rejects.toEqual({ message: 'No se puede borrar' });
    });
  });

  describe('clone()', () => {
    it('crea una copia con "(Copia)" en el título', async () => {
      const builder = makeBuilder({ data: rawWorkshop, error: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.clone('uuid-w1');
      const insertCall = builder.insert.mock.calls[0]?.[0];
      expect(insertCall?.title).toBe('Taller de mindfulness (Copia)');
    });

    it('no hace nada si el taller no existe', async () => {
      const builder = makeBuilder({ data: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.clone('no-existe');
      expect(builder.insert).not.toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'FK constraint' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(
        service.create({ title: 'Test', description: '', longDescription: '', date: '2024-01-01', active: true })
      ).rejects.toEqual({ message: 'FK constraint' });
    });

    it('no lanza cuando se crea correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(
        service.create({ title: 'Test', description: '', longDescription: '', date: '2024-01-01', active: true })
      ).resolves.toBeUndefined();
    });
  });

  describe('hasActive()', () => {
    it('devuelve true cuando count > 0', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: 2 }));
      expect(await service.hasActive()).toBe(true);
    });

    it('devuelve false cuando count es 0', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: 0 }));
      expect(await service.hasActive()).toBe(false);
    });
  });
});
