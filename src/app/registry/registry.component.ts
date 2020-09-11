import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  providers: []
})
export class RegistryComponent implements OnInit {

  @ViewChild('availableModal', {static: true}) public availableModal;

  registrySteps = {
    part1: false,
    part2: false,
    part3: true,
    part4: false
  };

  availableOpenedGames: any = null;

  constructor(private dataService: DataService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    const currentGameIndex = this.dataService.getCurrentGameIndex();
    if (currentGameIndex === null) {
      this.http.get<any>('http://localhost:3000/getgame')
      .subscribe(
        (res) => {
          if (res.data.length > 0) {
            this.availableOpenedGames = res.data
            setTimeout(() => this.availableModal.show(), 500);
          }
          //availableModal
          console.warn(res);
        }
      );

    }
  }

  selectSavedGame(id) {
    this.dataService.loadGame(this.availableOpenedGames[id]);
    const preliminaryRound = this.dataService.getPreliminaryConfig();
    const placementRound = this.dataService.getPlacementRound();
    this.availableModal.hide();
    if (placementRound.schedule.length > 0) {
      this.router.navigate(['placementround']);
    } else {
      this.router.navigate(['preliminaryround']);
    }
  }

  deleteSavedGame(id) {
    this.dataService.deleteGame(this.availableOpenedGames[id].id);
    this.availableOpenedGames.splice(id, 1)
  }

  next(currentPart) {
    this.registrySteps['part' + currentPart] = false;
    this.registrySteps['part' + (currentPart + 1)] = true;
  }

  before(currentPart) {
    this.registrySteps['part' + currentPart] = false;
    this.registrySteps['part' + (currentPart - 1)] = true;
  }

  finish(foo) {}

}
