import { ContentCard } from '@core/models/content-card.model';

export type TherapyModality = 'online' | 'presencial' | 'otra';

export interface Therapy extends ContentCard {
  duration: number;
  longDescription: string;
  modality?: TherapyModality;
  bonusSessions?: number;
  bonusPrice?: number;
}
