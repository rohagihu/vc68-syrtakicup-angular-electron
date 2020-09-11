import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByRow',
  pure: false
})
export class FilterByRowPipe implements PipeTransform {

  transform(items: any, index: number): any {
    // console.log(index, items)
    const rtrn = items
      .filter((item: any) => item.fieldPos === index)
      .sort((a:any,b:any) => a.fieldName.localeCompare(b.fieldName));
    // console.log(rtrn)
    return rtrn;
  }

}
