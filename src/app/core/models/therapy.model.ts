import { ContentCard } from '@core/models/content-card.model';

export type TherapyModality = 'online' | 'presencial' | 'otra' | 'proximamente';

export const THERAPY_MODALITY_LABELS: Record<TherapyModality, string> = {
  online: 'Online',
  presencial: 'Presencial',
  otra: 'Otra',
  proximamente: 'Próximamente',
};

export interface Therapy extends ContentCard {
  duration: number;
  longDescription: string;
  modalities?: TherapyModality[];
  bonusEnabled?: boolean;
  bonusSessions?: number;
  bonusDiscount?: number;
}

export function computeBonusPrice(therapy: Therapy): number | undefined {
  if (!therapy.bonusEnabled || !therapy.bonusSessions || !therapy.price) return undefined;
  return Math.max(0, therapy.price * therapy.bonusSessions - (therapy.bonusDiscount ?? 0));
}
