import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('scoringModal', {static: true}) public scoringModal;
  @Output() calcRanking = new EventEmitter<null>();
  @Input() placementRound: any;
  modalData: any = null;
  ranking: any = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.ranking = this.dataService.getPreliminaryConfig().ranking;
  }

  openScoreModal(item, iGroup) {
    // this.selectedMatch = item;
    // this.iGroup = iGroup;
    // this.scoringModal.show();
    if (this.placementRound.init) return;

    // let teamAName = this.placementRound.teamGroups[iGroup].teams[item.teamA].team.name
    let teamAName = this.ranking[item.teamA].teams[item.preliminaryRankingGroup].teamName
    let teamBName = this.ranking[item.teamB].teams[item.preliminaryRankingGroup].teamName
    let refereeName = this.ranking[item.referee].teams[item.preliminaryRankingGroup].teamName
    this.modalData = {
      selectedMatch: item,
      iGroup: iGroup,
      colors: this.placementRound.colors,
      teamAName: teamAName,
      teamAColor: this.placementRound.colors[item.preliminaryRankingGroup],
      teamBName: teamBName,
      teamBColor: this.placementRound.colors[item.preliminaryRankingGroup],
      refereeName: refereeName,
      refereeColor: this.placementRound.colors[item.preliminaryRankingGroup],
    }
    this.scoringModal.openModal(item, iGroup);
  }

  onClose() {

    this.modalData = null;
    this.calcRanking.emit();
    // this.selectedMatch = null;
    // this.iGroup = null;
    // this.dataService.saveGames(this.games);
    // this.calcRanking.emit();
  }

}
