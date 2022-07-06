import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetBadgeComponent } from './planet-badge/planet-badge.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { PlanetInfoComponent } from './planet-info/planet-info.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { StoreModule } from '@ngrx/store';
import RootReducer from './store';
import { ResidentBadgeComponent } from './resident-badge/resident-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetBadgeComponent,
    CharacterListComponent,
    CharacterInfoComponent,
    PlanetInfoComponent,
    MainLayoutComponent,
    ResidentBadgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(RootReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
