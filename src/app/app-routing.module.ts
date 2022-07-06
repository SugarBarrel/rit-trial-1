import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetInfoComponent } from './planet-info/planet-info.component';
import { PlanetListComponent } from './planet-list/planet-list.component';

const routes: Routes = [
  { path: 'planets', component: PlanetListComponent },
  { path: 'planets/:id', component: PlanetInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
