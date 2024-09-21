import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `https://image.tmdb.org/t/p/w500/${value}`;
  }

}
