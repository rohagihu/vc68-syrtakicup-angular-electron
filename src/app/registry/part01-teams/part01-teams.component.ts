import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-part01-teams',
  templateUrl: './part01-teams.component.html',
  styleUrls: ['./part01-teams.component.css']
})
export class Part01TeamsComponent implements OnInit {

  teams = [];
  @Output() done = new EventEmitter<number>();

    constructor(
      private dataService: DataService
    ) {

  }

  ngOnInit(): void {
    this.teams = this.dataService.getTeams();
  }

  shuffle() {
    for (let i = this.teams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.teams[i];
      this.teams[i] = this.teams[j];
      this.teams[j] = temp;
    }
  }

  next() {
    this.dataService.saveTeams(this.teams);
    this.done.emit(1);
  }

}
