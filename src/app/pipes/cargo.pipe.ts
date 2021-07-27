import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cargo'
})
export class CargoPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'Gerente';
    if (value == 2) return 'Jefe de Departamento';
    if (value == 3) return 'Jefe de División';
    if (value == 4) return 'Supervisor';
    if (value == 5) return 'Oficial';
    if (value == 6) return 'Asistente Ayudante';
    if (value == 7) return 'Obrero-Peon';
    return null;
  }

}
