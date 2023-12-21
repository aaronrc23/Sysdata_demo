// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, propertyName: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const propertyValue = item[propertyName];
      if (propertyValue !== undefined && propertyValue !== null) {
        return propertyValue.toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}