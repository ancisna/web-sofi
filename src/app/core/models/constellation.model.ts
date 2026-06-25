import { ContentCard } from '@core/models/content-card.model';

export type ConstellationModality = 'online' | 'presencial' | 'otra' | 'proximamente';

export const CONSTELLATION_MODALITY_LABELS: Record<ConstellationModality, string> = {
  online: 'Online',
  presencial: 'Presencial',
  otra: 'Otra',
  proximamente: 'Próximamente',
};

export interface Constellation extends ContentCard {
  duration: number;
  longDescription: string;
  modalities?: ConstellationModality[];
}
