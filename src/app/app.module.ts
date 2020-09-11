import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ItemsState } from './store/items.state';

// import { NavModule } from './nav/nav.module';
import { NavComponent } from './nav/nav.component';
import { RegistryModule } from './registry/registry.module';
import { PreliminaryRoundModule } from './preliminary-round/preliminary-round.module';
import { PlacementRoundModule } from './placement-round/placement-round.module';
import { NgxsTestComponent } from './ngxs-test/ngxs-test.component';

import { DataService } from './core/data.service';
import { AppRoutingModule } from './app-routing.module';


export function appInit(dataService: DataService): any {
  return () => dataService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    NgxsTestComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([ItemsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    // NavModule,
    RegistryModule,
    PreliminaryRoundModule,
    PlacementRoundModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [DataService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
