import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'municipio'
})
export class MunicipioPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'La Paz';
    if (value == 2) return 'El Alto';
    
    return null;
  }

}
