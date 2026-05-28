import { ContentCard } from '@core/models/content-card.model';

export interface Therapy extends ContentCard {
  duration: number;
  longDescription: string;
}
