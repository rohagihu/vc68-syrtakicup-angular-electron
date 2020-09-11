import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByRowPipe } from './filter-by-row.pipe';
import { RankingComponent } from './ranking/ranking.component';
import { GetNameByIdPipe } from './get-name-by-id.pipe';
import { ScoringModalComponent } from './scoring-modal/scoring-modal.component';

@NgModule({
  declarations: [
    FilterByRowPipe,
    RankingComponent,
    GetNameByIdPipe,
    ScoringModalComponent
    ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilterByRowPipe,
    GetNameByIdPipe,
    RankingComponent,
    ScoringModalComponent
  ]
})
export class SharedModule { }
