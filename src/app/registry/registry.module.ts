import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';


import { RegistryRoutingModule } from './registry-routing.module' //<-- import

import { SharedModule } from '../shared/shared.module';
import { Part01TeamsComponent } from './part01-teams/part01-teams.component';
import { Part02RulesComponent } from './part02-rules/part02-rules.component';
import { Part03GameSchedulesComponent } from './part03-game-schedules/part03-game-schedules.component';
import { Part04SummaryComponent } from './part04-summary/part04-summary.component';

@NgModule({
  declarations: [RegistryComponent, Part01TeamsComponent, Part02RulesComponent, Part03GameSchedulesComponent, Part04SummaryComponent, ],
  imports: [
    CommonModule,
    SharedModule,
    RegistryRoutingModule
  ],
  exports: [RegistryComponent]
})
export class RegistryModule { }
