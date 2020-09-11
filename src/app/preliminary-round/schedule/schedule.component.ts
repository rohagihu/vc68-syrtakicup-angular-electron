import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Output() calcRanking = new EventEmitter<null>();
  @ViewChild('scoringModal', {static: true}) public scoringModal;
  preliminaryRound: any = {};

  games: any[] = [];

  selectedMatch = null;
  iGroup = null;

  modalData: any = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
    console.log(this.preliminaryRound.games, 'AAAAAA')
    if (this.preliminaryRound.games.length === 0) {
      ['A', 'B', 'C'].forEach(el => {
        const temp = JSON.stringify(this.preliminaryRound.schedule);
        this.games.push({
          name: el,
          schedule: JSON.parse(temp)
        });
      });
      this.dataService.saveGames(this.games);
    } else {
      this.games = this.preliminaryRound.games;
    }


    // TEST DATA
    // this.games.forEach(group => {
    //   group.schedule.forEach(game => {
    //     game.game.forEach(match => {
    //       match.pointsA = Math.floor(Math.random() * 15);
    //       match.pointsB = Math.floor(Math.random() * 15);
    //     });
    //     let bigA = 0;
    //     let bigB = 0;
    //     game.game.filter(el => el.pointsA !== 0 || el.pointsB !== 0).forEach(el => {
    //       if (el.pointsA > el.pointsB) {
    //         bigA++;
    //         bigA++;
    //       }
    //       else if (el.pointsB > el.pointsA) {
    //         bigB++;
    //         bigB++;
    //       }
    //       else {
    //         bigA++;
    //         bigB++;
    //       }
    //     });
    //     game.bigPointsA = bigA;
    //     game.bigPointsB = bigB;
    //   });
    // });
    // this.dataService.saveGames(this.games);

    console.log(this.preliminaryRound);
    console.log(this.games, 'games');
  }

  gameCalcPoints(game) {
    let bigA = 0;
    let bigB = 0;
    game.filter(el => el.pointsA !== 0 && el.pointsB !== 0).forEach(el => {
      if (el.pointsA > el.pointsB) {
        bigA++;
        bigA++;
      }
      else if (el.pointsB > el.pointsA) {
        bigB++;
        bigB++;
      }
      else {
        bigA++;
        bigB++;
      }
    });
    console.log((bigA !== 0 && bigB !== 0) ? (bigA + ':' + bigB) : null)
    return (bigA !== 0 && bigB !== 0) ? (bigA + ':' + bigB) : null;
  }

  openScoreModal(item, iGroup) {
    let teamAName = this.preliminaryRound.teamGroups[iGroup].teams[item.teamA].team.name
    let teamBName = this.preliminaryRound.teamGroups[iGroup].teams[item.teamB].team.name
    let refereeName = this.preliminaryRound.teamGroups[iGroup].teams[item.referee].team.name
    this.modalData = {
      selectedMatch: item,
      iGroup: iGroup,
      colors: this.preliminaryRound.colors,
      teamAName: teamAName,
      teamBName: teamBName,
      refereeName: refereeName
    }
    this.scoringModal.openModal(item, iGroup);
    console.log(item);
  }

  onClose() {

    this.modalData = null;
    this.dataService.saveGames(this.games);
    this.calcRanking.emit();
  }

}
