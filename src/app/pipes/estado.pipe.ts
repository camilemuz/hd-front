import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'En Espera';
    if (value == 2) return 'En Proceso';
    if (value == 3) return 'Cerrado';
    return null;
  }

}
