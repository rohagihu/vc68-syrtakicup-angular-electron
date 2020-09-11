import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreliminaryRoundRoutingModule } from './preliminary-round-routing.module' //<-- import

import { SharedModule } from '../shared/shared.module';
import { PreliminaryRoundComponent } from './preliminary-round.component';
import { GroupsHeadComponent } from './groups-head/groups-head.component';
import { ScheduleComponent } from './schedule/schedule.component';
// import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    PreliminaryRoundComponent,
    GroupsHeadComponent,
    ScheduleComponent,
    // RankingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PreliminaryRoundRoutingModule
  ],
  exports: [PreliminaryRoundComponent]
})
export class PreliminaryRoundModule { }
