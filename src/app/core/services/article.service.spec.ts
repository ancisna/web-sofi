import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArticleService } from './article.service';

function makeBuilder(resolved: { data?: any; error?: any; count?: number } = {}) {
  const r = { data: resolved.data ?? null, error: resolved.error ?? null, count: resolved.count ?? null };
  const builder: any = {
    select: vi.fn().mockReturnThis(),
    eq:     vi.fn().mockReturnThis(),
    neq:    vi.fn().mockReturnThis(),
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

const rawArticle = {
  id: 'art-1',
  author_id: 'user-1',
  title: 'Mi artículo',
  slug: 'mi-articulo',
  excerpt: 'Extracto del artículo',
  content: { type: 'doc' },
  cover_image: 'https://imagen.com/cover.jpg',
  status: 'published',
  seo_title: 'Título SEO',
  seo_description: 'Desc SEO',
  published_at: '2024-06-01T10:00:00Z',
  created_at: '2024-05-01T10:00:00Z',
  updated_at: '2024-06-01T10:00:00Z',
  category_id: 'cat-1',
  category: { id: 'cat-1', name: 'Bienestar', slug: 'bienestar' },
  views: 42,
};

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ArticleService();
  });

  describe('getPublished()', () => {
    it('filtra por status = published', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getPublished();
      expect(builder.eq).toHaveBeenCalledWith('status', 'published');
    });

    it('mapea snake_case a camelCase', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [rawArticle] }));
      const result = await service.getPublished();
      expect(result[0]).toMatchObject({
        id: 'art-1',
        authorId: 'user-1',
        coverImage: 'https://imagen.com/cover.jpg',
        publishedAt: '2024-06-01T10:00:00Z',
        categoryId: 'cat-1',
        views: 42,
      });
    });

    it('incluye la categoría anidada', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [rawArticle] }));
      const result = await service.getPublished();
      expect(result[0].category?.name).toBe('Bienestar');
    });
  });

  describe('getAll()', () => {
    it('devuelve array vacío cuando no hay datos', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [] }));
      expect(await service.getAll()).toEqual([]);
    });

    it('devuelve todos los artículos sin filtro de estado', async () => {
      const draft = { ...rawArticle, id: 'art-2', status: 'draft' };
      mockSupabase.from.mockReturnValue(makeBuilder({ data: [rawArticle, draft] }));
      const result = await service.getAll();
      expect(result).toHaveLength(2);
    });
  });

  describe('getBySlug()', () => {
    it('devuelve undefined cuando no hay datos', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: null }));
      expect(await service.getBySlug('no-existe')).toBeUndefined();
    });

    it('devuelve el artículo mapeado cuando existe', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: rawArticle }));
      const result = await service.getBySlug('mi-articulo');
      expect(result?.slug).toBe('mi-articulo');
      expect(result?.title).toBe('Mi artículo');
    });

    it('filtra por slug y status=published', async () => {
      const builder = makeBuilder({ data: rawArticle });
      mockSupabase.from.mockReturnValue(builder);
      await service.getBySlug('mi-articulo');
      expect(builder.eq).toHaveBeenCalledWith('slug', 'mi-articulo');
      expect(builder.eq).toHaveBeenCalledWith('status', 'published');
    });
  });

  describe('getById()', () => {
    it('devuelve undefined cuando no hay datos', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ data: null }));
      expect(await service.getById('no-existe')).toBeUndefined();
    });

    it('devuelve el artículo sin filtro de status (admin)', async () => {
      const draft = { ...rawArticle, status: 'draft' };
      mockSupabase.from.mockReturnValue(makeBuilder({ data: draft }));
      const result = await service.getById('art-1');
      expect(result?.status).toBe('draft');
    });
  });

  describe('hasPublished()', () => {
    it('devuelve true cuando count > 0', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: 5 }));
      expect(await service.hasPublished()).toBe(true);
    });

    it('devuelve false cuando count es 0', async () => {
      mockSupabase.from.mockReturnValue(makeBuilder({ count: 0 }));
      expect(await service.hasPublished()).toBe(false);
    });
  });

  describe('incrementViews()', () => {
    it('llama a supabase.rpc con el nombre correcto', async () => {
      mockSupabase.rpc.mockResolvedValue({ data: null, error: null });
      await service.incrementViews('art-1');
      expect(mockSupabase.rpc).toHaveBeenCalledWith('increment_article_views', { article_id: 'art-1' });
    });
  });

  describe('getRelated()', () => {
    it('excluye el artículo actual', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getRelated('cat-1', 'art-1');
      expect(builder.neq).toHaveBeenCalledWith('id', 'art-1');
    });

    it('filtra por categoria', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getRelated('cat-1', 'art-1');
      expect(builder.eq).toHaveBeenCalledWith('category_id', 'cat-1');
    });

    it('limita a 3 resultados por defecto', async () => {
      const builder = makeBuilder({ data: [] });
      mockSupabase.from.mockReturnValue(builder);
      await service.getRelated('cat-1', 'art-1');
      expect(builder.limit).toHaveBeenCalledWith(3);
    });
  });

  describe('create()', () => {
    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'Slug duplicado' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(
        service.create({ title: 'Test', slug: 'test' }, 'user-1')
      ).rejects.toEqual({ message: 'Slug duplicado' });
    });
  });

  describe('update()', () => {
    it('no lanza cuando se actualiza correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.update('art-1', { title: 'Nuevo título' })).resolves.toBeUndefined();
    });

    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'Slug duplicado' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.update('art-1', { title: 'Test' })).rejects.toEqual({ message: 'Slug duplicado' });
    });

    it('llama a update con el id correcto', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await service.update('art-1', { title: 'Test' });
      expect(builder.eq).toHaveBeenCalledWith('id', 'art-1');
    });
  });

  describe('delete()', () => {
    it('no lanza cuando se borra correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.delete('art-1')).resolves.toBeUndefined();
    });

    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'No se puede borrar' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.delete('art-1')).rejects.toEqual({ message: 'No se puede borrar' });
    });
  });

  describe('publish()', () => {
    it('lanza error cuando Supabase devuelve error', async () => {
      const builder = makeBuilder({ error: { message: 'Error al publicar' } });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.publish('art-1')).rejects.toEqual({ message: 'Error al publicar' });
    });

    it('no lanza cuando se publica correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.publish('art-1')).resolves.toBeUndefined();
    });
  });

  describe('unpublish()', () => {
    it('no lanza cuando se despublica correctamente', async () => {
      const builder = makeBuilder({ error: null });
      mockSupabase.from.mockReturnValue(builder);
      await expect(service.unpublish('art-1')).resolves.toBeUndefined();
    });
  });
});
