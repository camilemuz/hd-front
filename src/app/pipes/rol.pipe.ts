import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'func';
    if (value == 2) return 'agent';
    if (value == 3) return 'admin';
    return null;
  }

}
