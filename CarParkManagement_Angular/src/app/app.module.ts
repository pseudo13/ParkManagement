import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkLevelComponent } from './park-level/park-level.component';
import { ParkingPlaceComponent } from './parking-place/parking-place.component';

@NgModule({
  declarations: [
    AppComponent,
    ParkLevelComponent,
    ParkingPlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
