import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, term: string, cssClass: string) {
    if (!value) {
      return '';
    }
    return value;
  }

}
