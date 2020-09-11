import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../core/data.service';

@Pipe({
  name: 'getNameById'
})
export class GetNameByIdPipe implements PipeTransform {

  constructor(private dataService: DataService) {}

  transform(id: number, rankingGroup: number, field:number): string {
    let ranking = this.dataService.getPreliminaryConfig().ranking;
    return ranking.length > 0 ? ranking[field].teams[rankingGroup].teamName : 'Team '+ field;
  }

}
