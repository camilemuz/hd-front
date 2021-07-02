import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria'
})
export class CastegoriaPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'Asistencia Tecnica';
    if (value == 2) return 'Mantenimiento';
    if (value == 3) return 'Instalación/Reinstalación';
    if (value == 4) return 'Copias de Seguridad';
    if (value == 5) return 'Solicitud y soporte';
    
    return null;
  }
}
