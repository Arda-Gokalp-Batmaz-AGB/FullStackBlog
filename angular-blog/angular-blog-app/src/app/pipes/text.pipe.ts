import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(givenText : string, maxlength : number = 10): string {

    if(givenText.length > maxlength && maxlength > -1)
    {
      return givenText.substring(0,maxlength) + "...";
    }
    return givenText;
  }

}
