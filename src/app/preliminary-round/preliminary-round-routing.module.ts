import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreliminaryRoundComponent } from './preliminary-round.component';


const routes: Routes = [
  {
    path: 'preliminaryround',
    component: PreliminaryRoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreliminaryRoundRoutingModule { }
