import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-placement-round',
  templateUrl: './placement-round.component.html',
  styleUrls: ['./placement-round.component.css']
})
export class PlacementRoundComponent implements OnInit {

  placementRound: any = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.placementRound = this.dataService.getPlacementRound();
  }

}
