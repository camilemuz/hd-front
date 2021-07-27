import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prioridad'
})
export class PrioridadPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'Normal';
    if (value == 2) return 'Media';
    if (value == 3) return 'Alta';
    return null;
  }

}
