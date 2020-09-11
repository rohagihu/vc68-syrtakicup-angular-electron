import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scoring-modal',
  templateUrl: './scoring-modal.component.html',
  styleUrls: ['./scoring-modal.component.css']
})
export class ScoringModalComponent implements OnInit {

  @ViewChild('scoringModal', {static: true}) public scoringModal;
  @Input() modalData: any;

  @Output() onCloseModal: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(event) {
    let bigA = 0;
    let bigB = 0;
    this.modalData.selectedMatch.game.filter(el => el.pointsA !== 0 || el.pointsB !== 0).forEach(el => {
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
    this.modalData.selectedMatch.bigPointsA = bigA;
    this.modalData.selectedMatch.bigPointsB = bigB;
    this.onCloseModal.emit()
  }

  openModal() {
    this.scoringModal.show();
  }

}
