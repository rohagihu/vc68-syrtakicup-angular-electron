import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../core/data.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-part03-game-schedules',
  templateUrl: './part03-game-schedules.component.html',
  styleUrls: ['./part03-game-schedules.component.css'],
})

export class Part03GameSchedulesComponent implements OnInit {

  @Output() done = new EventEmitter<number>();
  @Output() undo = new EventEmitter<number>();

  @ViewChild('refereeModal', {static: true}) public refereeModal;

  testArr = ['0', '1', '2', '3', '4'];
  preliminaryRound: any = {};
  schedule = [];
  shown = true;
  refereeModalSelected: number = null;
  savedSchedules: any = [];
  selectedSchedule: any = [];
  selectedScheduleID: string = null;
  // c = 0;
  // testArr.slice(0,-1).forEach((el,i) => c = c + (i+1));

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
    if (this.preliminaryRound.schedule.length === 0) {
      this.shuffle();
    } else {
      this.schedule = this.preliminaryRound.schedule;
    }
    // this.http.get<[]>('http://localhost:3000/select').subscribe((data: []) => this.testData = data);
    this.getAllSavedSchedules();
    // this.testData = this.dataService.getDB();
  }

  shuffle() {
    // let teamsA = [...this.testArr];
    // let teamsB = [...this.testArr];
    let matchesCount = 0;
    const tempArr = [...this.testArr];
    this.schedule = [];
    tempArr.slice(0, -1).forEach((el, i) => matchesCount = matchesCount + (i + 1));
    let cTemp = 0;
    while (cTemp < matchesCount ) {
      const v1 = Math.floor(Math.random() * tempArr.length);
      let v2 = null;
      let whileCTempA = 0;
      let whileCTempB = 0;
      let timeout = false;
      while (
        v2 === null ||
        v2 === v1 ||
        this.schedule.some(el => (el.teamA === v1 && el.teamB === v2) || (el.teamA === v2 && el.teamB === v1))
      ) {
        v2 = Math.floor(Math.random() * tempArr.length);
        whileCTempB++;
        if (whileCTempB > 100) {
          console.log('timeout');
          timeout = true;
          break;
        }
      }
      let referee = null;
      while (referee === null || referee === v1 || referee === v2) {
        referee = Math.floor(Math.random() * tempArr.length);
      }
      const obj = {
        teamA: v1,
        teamB: v2,
        'referee': referee,
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
        bigPointsB: 0
      };
      if (!timeout) {
        console.log(v1, v2);
        this.schedule.push(obj);
        cTemp++;
      }
      whileCTempA++;
      if (whileCTempA > 100) {
        break;
      }
    }
    console.log(this.schedule);
    this.dataService.savePreliminarySchedule(this.schedule);
  }

  dragstartHandler(ev, type) {
    ev.dataTransfer.setData("text/plain", JSON.stringify({
      type: type,
      id: ev.target.dataset.id
    }));
    ev.dataTransfer.dropEffect = "copy";
  }

  dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  }

  dropHandler(ev, el = null) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
    const destination = ev.target.dataset.id;
    console.log(data)
    if (data.id && destination) {
      switch (data.type) {
        case 'complete':
          [this.schedule[data.id], this.schedule[destination]] = [this.schedule[destination], this.schedule[data.id]]; // swap
          break;
        case 'teams':
          const {teamA, teamB} = this.schedule[data.id];
          this.schedule[data.id].teamA = this.schedule[destination].teamA
          this.schedule[data.id].teamB = this.schedule[destination].teamB
          this.schedule[destination].teamA = teamA
          this.schedule[destination].teamB = teamB
          this.shown = false
          setTimeout(() => this.shown = true, 1) // dirty but how to rerender?
          break;
        case 'referee':
          const {referee} = this.schedule[data.id];
          this.schedule[data.id].referee = this.schedule[destination].referee
          this.schedule[destination].referee = referee
          this.shown = false
          setTimeout(() => this.shown = true, 1) // dirty but how to rerender?
          break;

      }

      this.dataService.savePreliminarySchedule(this.schedule);
    }
  }

  checkReferees() {
    return this.schedule.some(game => game.referee === game.teamA || game.referee === game.teamB);
  }

  openRefereeList(gameID) {
    this.refereeModalSelected = gameID;
    this.refereeModal.show();
  }

  selectReferee(index) {
    this.schedule[this.refereeModalSelected].referee = index;
    this.dataService.savePreliminarySchedule(this.schedule);
    this.refereeModalSelected = null;
    this.shown = false
    setTimeout(() => this.shown = true, 1)
    this.refereeModal.hide();
  }

  saveToDB() {
    const data = JSON.stringify(this.schedule);

    // console.log(data)
    this.http.post<any>('http://localhost:3000/savepreliminaryschedule', { "data": data })
    .pipe(
      catchError(val => {
        of(`I caught: ${val}`);
        return throwError(val);
      })
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => {
          this.getAllSavedSchedules();
          console.log('HTTP request completed.')
        }
    );
    console.log('saved')
  }

  getAllSavedSchedules() {
    this.http.get('http://localhost:3000/getAllSavedPreliminarySchedules').subscribe(data => this.savedSchedules = data);
  }

  selectSavedSchedule(id) {
    this.http.get('http://localhost:3000/getPreliminarySchedule', {params: {'id': id}}).subscribe((data: any) => {
      this.selectedSchedule = JSON.parse(data.data);
      this.selectedScheduleID = id;
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor('selectedSavedSchedule');
      }, 100);
      // console.log(JSON.parse(data.data));
    });
  }

  confirmSavedSchedule() {
    this.schedule = this.selectedSchedule;
    this.dataService.savePreliminarySchedule(this.schedule);
    this.selectedSchedule = [];
    this.selectedScheduleID = null;
  }

  deleteSavedSchedule() {
    this.http.get('http://localhost:3000/deletePreliminarySchedule', {params: {'id': this.selectedScheduleID}}).subscribe((data: any) => {
      console.log(data)
      this.selectedSchedule = [];
      this.selectedScheduleID = null;
      this.getAllSavedSchedules();
    });
  }

  stepBack() {
    this.undo.emit(3);
  }
  next() {
    // this.dataService.savePreliminaryConfig(this.preliminaryRound);
    this.done.emit(3);
  }

}
