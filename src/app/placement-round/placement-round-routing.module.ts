import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacementRoundComponent } from './placement-round.component';


const routes: Routes = [
  {
    path: 'placementround',
    component: PlacementRoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacementRoundRoutingModule { }
