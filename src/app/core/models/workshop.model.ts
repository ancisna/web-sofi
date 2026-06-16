import { ContentCard } from '@core/models/content-card.model';

export type WorkshopModality = 'online' | 'presencial';

export const WORKSHOP_MODALITY_LABELS: Record<WorkshopModality, string> = {
  online: 'Online',
  presencial: 'Presencial',
};

export interface Workshop extends ContentCard {
  date: string;
  longDescription: string;
  modality?: WorkshopModality;
  startTime?: string;
  endTime?: string;
  location?: string;
}
