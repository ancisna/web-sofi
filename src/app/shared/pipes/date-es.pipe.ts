import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateEs', standalone: true })
export class DateEsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    let date: Date;
    if (value.includes('T')) {
      date = new Date(value);
    } else {
      const [year, month, day] = value.split('-').map(Number);
      date = new Date(year, month - 1, day);
    }
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}
