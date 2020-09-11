import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegistryComponent } from './registry/registry.component';
import { NavComponent } from './nav/nav.component';
// import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent }
  {
    path: '',
    redirectTo: 'registry',
    pathMatch: 'full'
  },
  {
    path: 'registry',
    // component: NavComponent
    loadChildren: () => import('./registry/registry.module').then(m => m.RegistryModule)
  },
  {
    path: 'preliminaryround',
    loadChildren: () => import('./preliminary-round/preliminary-round.module').then(m => m.PreliminaryRoundModule)
  },
  {
    path: 'placementround',
    loadChildren: () => import('./placement-round/placement-round.module').then(m => m.PlacementRoundModule)
  },
  {
    path: '**',
    redirectTo: 'registry'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
