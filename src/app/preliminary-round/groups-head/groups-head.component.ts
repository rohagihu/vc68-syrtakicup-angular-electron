import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-head',
  templateUrl: './groups-head.component.html',
  styleUrls: ['./groups-head.component.css']
})
export class GroupsHeadComponent implements OnInit {
  teams = [];
  preliminaryRound: any = {};

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.teams = this.dataService.getTeams();
    this.preliminaryRound = this.dataService.getPreliminaryConfig();

    if (this.preliminaryRound.teamGroups.length === 0) {
      this.router.navigate(['registry']);
    }
  }

}
