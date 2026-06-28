import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SITE_NAME = 'Sofía Reyes Psicóloga';
const BASE_URL = 'https://sofiareyespsicologa.com';
const DEFAULT_IMAGE = `${BASE_URL}/branding/og-image.jpg`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private meta = inject(Meta);

  set(data: SeoData): void {
    const fullTitle = `${data.title} | ${SITE_NAME}`;
    const image = data.image ?? DEFAULT_IMAGE;
    const url = data.url ?? BASE_URL;
    const type = data.type ?? 'website';

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  setHome(): void {
    this.set({
      title: SITE_NAME,
      description: 'Psicóloga especializada en terapia individual, constelaciones familiares y talleres de bienestar emocional. Modalidad presencial y online.',
      url: BASE_URL,
    });
  }
}
