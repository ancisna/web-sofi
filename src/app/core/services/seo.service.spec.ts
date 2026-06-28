import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('set()', () => {
    it('establece el título con el formato "título | SITE_NAME"', () => {
      service.set({ title: 'Terapias', description: 'Descripción' });
      expect(titleService.getTitle()).toBe('Terapias | Sofía Reyes Psicóloga');
    });

    it('establece la meta description', () => {
      service.set({ title: 'Test', description: 'Mi descripción SEO' });
      const tag = metaService.getTag('name="description"');
      expect(tag?.content).toBe('Mi descripción SEO');
    });

    it('establece og:title', () => {
      service.set({ title: 'Talleres', description: 'Desc' });
      const tag = metaService.getTag('property="og:title"');
      expect(tag?.content).toBe('Talleres | Sofía Reyes Psicóloga');
    });

    it('establece og:description', () => {
      service.set({ title: 'Test', description: 'OG description' });
      const tag = metaService.getTag('property="og:description"');
      expect(tag?.content).toBe('OG description');
    });

    it('establece og:type como "website" por defecto', () => {
      service.set({ title: 'Test', description: 'Desc' });
      const tag = metaService.getTag('property="og:type"');
      expect(tag?.content).toBe('website');
    });

    it('acepta og:type "article"', () => {
      service.set({ title: 'Artículo', description: 'Desc', type: 'article' });
      const tag = metaService.getTag('property="og:type"');
      expect(tag?.content).toBe('article');
    });

    it('establece og:image personalizada cuando se proporciona', () => {
      service.set({ title: 'Test', description: 'Desc', image: 'https://ejemplo.com/img.jpg' });
      const tag = metaService.getTag('property="og:image"');
      expect(tag?.content).toBe('https://ejemplo.com/img.jpg');
    });

    it('usa la imagen por defecto cuando no se proporciona image', () => {
      service.set({ title: 'Test', description: 'Desc' });
      const tag = metaService.getTag('property="og:image"');
      expect(tag?.content).toContain('og-image.jpg');
    });

    it('establece twitter:card como summary_large_image', () => {
      service.set({ title: 'Test', description: 'Desc' });
      const tag = metaService.getTag('name="twitter:card"');
      expect(tag?.content).toBe('summary_large_image');
    });

    it('establece og:locale como es_ES', () => {
      service.set({ title: 'Test', description: 'Desc' });
      const tag = metaService.getTag('property="og:locale"');
      expect(tag?.content).toBe('es_ES');
    });
  });

  describe('setHome()', () => {
    it('establece el título de la home', () => {
      service.setHome();
      expect(titleService.getTitle()).toContain('Sofía Reyes Psicóloga');
    });

    it('establece una meta description con contenido relevante', () => {
      service.setHome();
      const tag = metaService.getTag('name="description"');
      expect(tag?.content).toBeTruthy();
      expect(tag?.content.length).toBeGreaterThan(20);
    });

    it('establece og:type como website', () => {
      service.setHome();
      const tag = metaService.getTag('property="og:type"');
      expect(tag?.content).toBe('website');
    });
  });
});
