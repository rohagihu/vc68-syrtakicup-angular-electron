import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { IRankingGroup, IRankingTeam, IPlacementGroupScheduleItem } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  teamsAmount = 15;
  teamsGroups = 3;
  teams = [];

  currentGameIndex: number = null;

  // preliminaryRoundActive = true;
  // placementRoundActive = false;

  groupColors = ['light-blue accent-3', 'deep-orange', 'amber darken-2', 'green darken-3', 'purple accent-5'];

  preliminaryRound = {
    mode: 'byPoints',
    modeLabel: {
      'byTime': 'nach Zeit',
      'byPoints': 'nach Punkten'
    },
    sets: 2,
    setLimit: 15,
    duration: '12min',
    activeTwoPointsDifference: false,
    colors: this.groupColors,
    schedule: [],
    teamGroups: [],
    games: [],
    ranking: <IRankingGroup[]>[]
  };

  placementRound = {
    init: true,
    schedule: [],
    ranking: <IRankingTeam[]>[],
    colors: this.groupColors,
  };


  constructor(private http: HttpClient) { }

  init() {
    const arr = [
'Schrecksekunde',
'Schreckminute',
'Auszeit Storkow',
'ASV Senden',
'BSG Lexid',
'SV Elstertrebnitz',
'SV Hohenmölsen',
'Röthaer SV',
'Chamäleons',
'Sechser Pack',
'Skihasen',
'Mocca-Edel',
'FahrschulTeam Pfaff',
'SF Neukieritzsch',
'VSG Leipzig 2000'
    ];

    for (let i = 0; i < this.teamsAmount; i++) {
      this.teams.push({
        id: i,
        name: arr[i]
        // name: 'Team ' + String.fromCharCode(65 + i) + ' (' + String.fromCodePoint(0x1F604 + i) + ')'
      });
    }
  }

  getTeams() {
    return this.teams;
  }

  saveTeams(teams) {
    this.teams = teams;
  }

  getPreliminaryConfig() {
    return this.preliminaryRound;
  }

  savePreliminaryConfig(config) {
    this.preliminaryRound = config;
  }

  savePreliminarySchedule(schedule) {
    this.preliminaryRound.schedule = schedule;
  }

  getGames() {
    return this.preliminaryRound.games;
  }

  saveGames(games) {
    this.preliminaryRound.games = games;
  }

  savePreliminaryRanking(ranking) {
    this.preliminaryRound.ranking = ranking
  }

  getPlacementRound() {
    return this.placementRound;
  }


  savePlacementRound(placementRound) {
    this.placementRound = placementRound;
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

// P1 - P3 spielen alle Endrundenspiele nur auf FeldA, FelbB oder FeldC
// P1 - P3 spielen an Pos 1,3,5
// P4 u. P5 verteilen ihre Spiele auf die restl. Lücken
  shufflePlacementSchedule() {
    let schedule: IPlacementGroupScheduleItem[] = [];

    // possible matches within the 5 groups of 3 teams
    const schemeOfGroupsMatches = [
      {
        teamA: 0,
        teamB: 1,
        referee: 2
      },
      {
        teamA: 1,
        teamB: 2,
        referee: 0
      },
      {
        teamA: 2,
        teamB: 0,
        referee: 1
      }
    ];
    const gameFields = ['A', 'B', 'C'];

    // Behandlung Vorrundenrankinggruppen 1-3
    const top3FieldDistribution = {
      'rank1': null, // placements 1-3
      'rank2': null, // placements 4-6
      'rank3': null //  placements 7-9
    }

    // this is the match position of the first 3 groups-matches
    //
    const matchPos = [
      [2, 3, 4], // rank 0 -> placements 1-3
      [1, 2, 3], // rank 1 -> placements 4-6
      [0, 1, 2]  // rank 2 -> placements 7-9
    ];

    let groupIndex = 0;
    for (let group in top3FieldDistribution) { // crawl through all
      let dicedField = null;

      while (
        !dicedField ||
        Object.values(top3FieldDistribution).some(el => el === dicedField)
      ) {
        dicedField = gameFields[Math.floor(Math.random() * 3)];
      }
      top3FieldDistribution[group] = dicedField; // set random field for the first 3 group of teams
      const tempSchemeOfGroupsMatches = this.shuffleArray([...schemeOfGroupsMatches]); // shuffle the match scheme
      tempSchemeOfGroupsMatches.forEach((match, i) => {
        const obj: IPlacementGroupScheduleItem = {
          preliminaryRankingGroup: groupIndex,
          teamA: match.teamA,
          teamB: match.teamB,
          'referee': match.referee,
          game: [
            {
              pointsA: 0,
              pointsB: 0,
            },
            {
              pointsA: 0,
              pointsB: 0,
            }
          ],
          bigPointsA: 0,
          bigPointsB: 0,
          fieldName: dicedField,
          // fieldPos: matchPos[i]
          fieldPos: matchPos.find((field, index) => index === groupIndex)[i]
        };
        schedule.push(obj);
      });
      groupIndex++;
      // console.log(tempSchemeOfGroupsMatches, 'tempSchemeOfGroupsMatches')
    }
    // ENDE // Behandlung Vorrundenrankinggruppen 1-3
    // console.log(top3FieldDistribution, "top3FieldDistribution")


    // Behandlung Vorrundenrankinggruppen 4 und 5
    // generating empty slots list
    const emptySlots = [];
    gameFields.forEach(gameField => {
      [0,1,2,3,4].forEach(gamePos => {
        if (schedule.find(existingMatch => existingMatch.fieldName === gameField && existingMatch.fieldPos === gamePos) === undefined) {
          const obj: IPlacementGroupScheduleItem = {
            preliminaryRankingGroup: null,
            teamA: null,
            teamB: null,
            'referee': null,
            game: [
              {
                pointsA: 0,
                pointsB: 0,
              },
              {
                pointsA: 0,
                pointsB: 0,
              }
            ],
            bigPointsA: 0,
            bigPointsB: 0,
            fieldName: gameField,
            // fieldPos: matchPos[i]
            fieldPos: gamePos
          };
          emptySlots.push(obj)
        }
      })
    })
    console.log(emptySlots, 'emptySlots')

    // fill the missing games
    const leftGames = [
      {
        preliminaryRankingGroup: 3,
        schemeOfGroupsMatches: [...schemeOfGroupsMatches]
      },
      {
        preliminaryRankingGroup: 4,
        schemeOfGroupsMatches: [...schemeOfGroupsMatches]
      }
    ];


    function setGame(emptyGame, leftGames, randomLeftGameRank) {
      let dicing = true;
      let c = 0;
      while (dicing) {
        const randomLeftGameMatch = Math.floor(Math.random() * 3)
        if (
          !leftGames[randomLeftGameRank].schemeOfGroupsMatches[randomLeftGameMatch].alreadySet
        ) {
            // console.log(leftGames[randomLeftGameRank], 'leftGame')
            emptyGame.preliminaryRankingGroup = leftGames[randomLeftGameRank].preliminaryRankingGroup;
            emptyGame.teamA = leftGames[randomLeftGameRank].schemeOfGroupsMatches[randomLeftGameMatch].teamA;
            emptyGame.teamB = leftGames[randomLeftGameRank].schemeOfGroupsMatches[randomLeftGameMatch].teamB;
            emptyGame.referee = leftGames[randomLeftGameRank].schemeOfGroupsMatches[randomLeftGameMatch].referee;
            leftGames[randomLeftGameRank].schemeOfGroupsMatches[randomLeftGameMatch] = {
              ...leftGames[randomLeftGameRank].schemeOfGroupsMatches[randomLeftGameMatch],
              alreadySet: true
            };
            dicing = false;
        }
        c++;
        if (c === 100) {
          dicing = false;
          console.error('timeout', randomLeftGameRank, leftGames)
        }
      }
    }


    let firstOneEmptyGame = null;
    [0, 1, 2, 3, 4].forEach(gameRow => {
      const emptyGames = emptySlots.filter(slot => slot.fieldPos === gameRow && !slot.preliminaryRankingGroup); // search for empty games in the row
      switch (emptyGames.length) {
        case 1: {// only one game is empty in this gameRow
          let randomLeftGameRank = null;
          if (firstOneEmptyGame === null) {
            randomLeftGameRank = Math.floor(Math.random() * 2)
            firstOneEmptyGame = randomLeftGameRank;
          } else {
            randomLeftGameRank = leftGames.findIndex((el, index) => index !== firstOneEmptyGame);
          }
          setGame(emptyGames[0], leftGames, randomLeftGameRank);
          break;
        }
        case 2: {// two games are empty in this gameRow
          const randomLeftGameRank1 = Math.floor(Math.random() * 2)
          setGame(emptyGames[0], leftGames, randomLeftGameRank1);
          const randomLeftGameRank2 = leftGames.findIndex((el, index) => index !== randomLeftGameRank1);
          setGame(emptyGames[1], leftGames, randomLeftGameRank2);
          break;
        }
        default: {
          break;
        }
      }
    });

    // merge emptyslots and schedule
    schedule = [
      ...schedule,
      ...emptySlots
    ]
    console.log(schedule,'placement schedule')
    this.placementRound.schedule = schedule
  }


  initPlacementRound() {
    console.log('init placement round')
    const ranking = this.preliminaryRound.ranking;
    console.log(ranking)
    const groups = [];
    for (let i = 0; i < 5; i++) {
      const arr: IRankingTeam[] = [];
      let id = 0;
      ranking.forEach(group => {
        let team: IRankingTeam = group.teams[i];
        team = {
          ...team,
          teamID: id,
          bigPointsWon: 0,
          bigPointsLost: 0,
          smallPointsWon: 0,
          smallPointsLost: 0
        };
        arr.push(team);
        id++;
      })
      groups.push(arr);
    }
    this.placementRound.ranking = groups
    this.shufflePlacementSchedule();
    console.log(groups, "groups in placementround")
  }

  startPlacementRound() {
    this.placementRound.init = false;
  }

  // getProgress() {
  //   return {
  //     'placementRoundActive': this.placementRoundActive,
  //     'preliminaryRoundActive': this.preliminaryRoundActive,
  //   }
  // }

  // startPlacementRound() {
  //   this.placementRoundActive = true;
  //   this.preliminaryRoundActive = false;
  // }

  // getDB() {
  //   let val;
  //   this.http.get('http://localhost:3000/select').subscribe(data => val = data);
  //   return val;
  // }

  getCurrentGameIndex() {
    return this.currentGameIndex;
  }
  saveCurrentGameIndex(id) {
    this.currentGameIndex = id;
  }


  createGame() {
    let data = {
      'teams': this.teams,
      'preliminaryRound': this.preliminaryRound,
      'placementRound': this.placementRound
    };
    this.http.post<any>('http://localhost:3000/creategame', data)
    .pipe(
      catchError(val => {
        of(`I caught: ${val}`);
        return throwError(val);
      })
    )
    .subscribe(
      (res) => {
        this.currentGameIndex = res.id;
      }
    );
  }

  updategame() {
    const data = {
      'teams': this.teams,
      'preliminaryRound': this.preliminaryRound,
      'placementRound': this.placementRound
    };
    const reqData = {
      "data": data,
      "id": this.currentGameIndex
    }
    // console.log(this.preliminaryRound.games, 'SAVETHIS')
    // const currentGameIndex = this.currentGameIndex;
    this.http.patch<any>('http://localhost:3000/updategame', reqData)
    .pipe(
      catchError(val => {
        of(`I caught: ${val}`);
        return throwError(val);
      })
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
  }

  loadGame(game) {
    this.currentGameIndex = game.id;
    this.teams = game.data.teams;
    this.preliminaryRound = game.data.preliminaryRound;
    this.placementRound = game.data.placementRound;
  }

  deleteGame(id) {
    this.http.delete<any>('http://localhost:3000/deletegame', {
      params: {
        'id': id,
      }
    }).subscribe(data => {});
  }

  saveDB() {
    console.log('post');
    // this.http.post<any>('http://localhost:3000/insert', JSON.stringify({ title: 'Angular POST Request Example'}))
    this.http.post<any>('http://localhost:3000/insert', {"title": "blatest"})
    .pipe(
      catchError(val => {
        of(`I caught: ${val}`);
        return throwError(val);
      })
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
  }
}
