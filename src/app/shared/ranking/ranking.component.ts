import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { IRankingGroup, IRankingTeam } from '../interface'


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})


export class RankingComponent implements OnInit {

  @Input() is: string;

  preliminaryRound: any = {};
  placementRound: any = {};
  init = false;

  games: any[] = [];

  ranking: IRankingGroup[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.games = this.dataService.getGames();
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
    this.is === 'placement' ? this.placementRound = this.dataService.getPlacementRound() : '';
    this.preliminaryRound.teamGroups.forEach(group => {
      this.ranking.push({
        'group': group.name,
        'teams': <IRankingTeam[]>[]
      });

      group.teams.forEach(team => {
        this.ranking.find(rankingGroup => rankingGroup.group === group.name).teams.push({
          teamID: team.team.id,
          teamName: team.team.name,
          bigPointsWon: 0,
          bigPointsLost: 0,
          smallPointsWon: 0,
          smallPointsLost: 0
        })
      })
    })

    this.calc()
    console.log(this.ranking)
    this.init = true;
  }

  calc() {
    console.log('calc started')

    let sortBy = [{
      multiprop: false,
      prop:'bigPointsWon',
      direction: -1
    },{
      multiprop: true,
      prop:'smallPointsDifference',
    }];

    this.ranking.forEach(rankingGroup => {
      rankingGroup.teams.forEach(rankingTeam => {
        let teamID = rankingTeam.teamID;

        let bigPointsWon = 0;
        let bigPointsLost = 0;
        let smallPointsWon = 0;
        let smallPointsLost = 0;

        // console.log(rankingGroup.group)
        let groupSchedule = this.preliminaryRound.games.find(game => game.name === rankingGroup.group);
        // console.log(groupSchedule);
        let activeGames = groupSchedule.schedule.filter(game => game.teamA === teamID || game.teamB === teamID);
        // console.log(activeGames)
        activeGames.forEach(game => {
          if (teamID === game.teamA) {
            bigPointsWon += game.bigPointsA;
            bigPointsLost += game.bigPointsB;
          } else {
            bigPointsWon += game.bigPointsB;
            bigPointsLost += game.bigPointsA;
          }

          game.game.forEach(subGame => {
            if (teamID === game.teamA) {
              smallPointsWon += subGame.pointsA;
              smallPointsLost += subGame.pointsB;
            } else {
              smallPointsWon += subGame.pointsB;
              smallPointsLost += subGame.pointsA;
            }
          })
        })

        rankingTeam.bigPointsWon = bigPointsWon;
        rankingTeam.bigPointsLost = bigPointsLost;
        rankingTeam.smallPointsWon = smallPointsWon;
        rankingTeam.smallPointsLost = smallPointsLost;
      })

      rankingGroup.teams.sort( function(a: IRankingTeam, b: IRankingTeam) {
        let i = 0, result = 0;
        while(i < sortBy.length && result === 0) {
          if (sortBy[i].multiprop) {
            if (sortBy[i].prop === 'smallPointsDifference') {
              result =
                ((a.smallPointsWon - a.smallPointsLost) < (b.smallPointsWon - b.smallPointsLost)) ?
                  1 :
                  ((a.smallPointsWon - a.smallPointsLost) > (b.smallPointsWon - b.smallPointsLost) ? -1 : 0)
            }

          } else {
            result = sortBy[i].direction*(a[ sortBy[i].prop ] < b[ sortBy[i].prop ] ? -1 : (a[ sortBy[i].prop ] > b[ sortBy[i].prop ] ? 1 : 0));
          }
          i++;
        }
        return result;
      })

    })
    this.dataService.savePreliminaryRanking(this.ranking);
    console.log(this.ranking)
    console.log('calc finished')
  }

  // get test() {
  //   console.log('runs')
  //   let bigPoints0 = 0;
  //   this.games[0].schedule.filter(game => game.teamA === 0 || game.teamB === 0).forEach(game => {
  //     if (game.teamA === 0) {
  //       bigPoints0 += game.bigPointsA;
  //     } else {
  //       bigPoints0 += game.bigPointsB;
  //     }
  //   });
  //   return 'Team0: ' + bigPoints0;
  // }

}
