import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialChar'
})
export class SpecialCharPipe implements PipeTransform {

  transform(value: string): string {
    //.replace(/[^\w\s]/gi, '')
    let newVal = value.replace(/\[/g, '').replace(/]/g, '').toLocaleLowerCase();
    return this.titleCase(newVal);
  }
  titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {    
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

}
