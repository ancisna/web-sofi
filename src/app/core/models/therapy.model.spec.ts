import { describe, it, expect } from 'vitest';
import { computeBonusPrice, Therapy } from './therapy.model';

const baseTherapy: Therapy = {
  id: '1',
  title: 'Terapia individual',
  description: 'Descripción',
  active: true,
  price: 60,
  duration: 50,
  longDescription: '',
  bonusEnabled: true,
  bonusSessions: 5,
  bonusDiscount: 30,
};

describe('computeBonusPrice', () => {
  it('devuelve undefined si bonusEnabled es false', () => {
    const therapy = { ...baseTherapy, bonusEnabled: false };
    expect(computeBonusPrice(therapy)).toBeUndefined();
  });

  it('devuelve undefined si no hay bonusSessions', () => {
    const therapy = { ...baseTherapy, bonusSessions: undefined };
    expect(computeBonusPrice(therapy)).toBeUndefined();
  });

  it('devuelve undefined si no hay precio', () => {
    const therapy = { ...baseTherapy, price: undefined };
    expect(computeBonusPrice(therapy)).toBeUndefined();
  });

  it('calcula correctamente: precio * sesiones - descuento', () => {
    // 60 * 5 - 30 = 270
    expect(computeBonusPrice(baseTherapy)).toBe(270);
  });

  it('nunca devuelve un precio negativo (mínimo 0)', () => {
    const therapy = { ...baseTherapy, bonusDiscount: 9999 };
    expect(computeBonusPrice(therapy)).toBe(0);
  });

  it('funciona sin descuento (bonusDiscount undefined)', () => {
    const therapy = { ...baseTherapy, bonusDiscount: undefined };
    // 60 * 5 - 0 = 300
    expect(computeBonusPrice(therapy)).toBe(300);
  });

  it('funciona con descuento 0', () => {
    const therapy = { ...baseTherapy, bonusDiscount: 0 };
    expect(computeBonusPrice(therapy)).toBe(300);
  });
});
