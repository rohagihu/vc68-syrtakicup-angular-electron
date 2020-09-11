import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  @Input() placementRound: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (this.placementRound.schedule.length === 0) {
      this.dataService.initPlacementRound();
      this.placementRound = this.dataService.getPlacementRound();
    }
  }

  shuffle() {
    this.dataService.shufflePlacementSchedule();
  }

  start() {
    this.dataService.startPlacementRound();
  }

}
