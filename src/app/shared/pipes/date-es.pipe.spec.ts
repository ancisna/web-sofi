import { describe, it, expect } from 'vitest';
import { DateEsPipe } from './date-es.pipe';

describe('DateEsPipe', () => {
  const pipe = new DateEsPipe();

  it('devuelve cadena vacía para null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('devuelve cadena vacía para undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('devuelve cadena vacía para cadena vacía', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('formatea fecha YYYY-MM-DD en español', () => {
    const result = pipe.transform('2024-03-15');
    expect(result).toBe('15 de marzo de 2024');
  });

  it('formatea fecha ISO con hora en español', () => {
    const result = pipe.transform('2024-06-01T10:00:00.000Z');
    expect(result).toMatch(/1 de junio de 2024/);
  });

  it('formatea el 1 de enero correctamente', () => {
    const result = pipe.transform('2024-01-01');
    expect(result).toBe('1 de enero de 2024');
  });

  it('formatea el 31 de diciembre correctamente', () => {
    const result = pipe.transform('2024-12-31');
    expect(result).toBe('31 de diciembre de 2024');
  });

  it('devuelve cadena vacía para fecha inválida', () => {
    expect(pipe.transform('no-es-fecha')).toBe('');
  });
});
