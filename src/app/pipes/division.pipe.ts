import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'division'
})
export class DivisionPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'Tecnología';
    if (value == 2) return 'Seguridad Informática';
    if (value == 3) return 'Aplicaciones Administrativas';
    if (value == 4) return 'Producción y Control';
    if (value == 5) return 'Desarrollo';
    if (value == 6) return 'Otro';
    return null;
  }
}
