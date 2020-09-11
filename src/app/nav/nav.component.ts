import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private dataServive: DataService) { }

  ngOnInit(): void {
  }


  saveDB() {
    this.dataServive.updategame();
  }

}
