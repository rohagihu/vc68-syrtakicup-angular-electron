import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-part02-rules',
  templateUrl: './part02-rules.component.html',
  styleUrls: ['./part02-rules.component.css']
})
export class Part02RulesComponent implements OnInit {

  @Output() done = new EventEmitter<number>();
  @Output() undo = new EventEmitter<number>();

  preliminaryRound: any = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
  }


  stepBack() {
    this.undo.emit(2)
  }
  next() {
    this.dataService.savePreliminaryConfig(this.preliminaryRound);
    this.done.emit(2)
  }

}
