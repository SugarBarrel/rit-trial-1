import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlanetEntry, planetSuccess, RootStore } from '../store';
import { extract_id } from '../util';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit, OnChanges {

  public planetsObs: Observable<PlanetEntry[]>;
  public planets: PlanetEntry[] = [];
  public planetIds: number[] = [];

  constructor(private store: Store<RootStore>) {
    this.planetsObs = store.select(s => s.planets);
    this.planetsObs.subscribe(ps => this.planets = ps);
  }

  ngOnInit(): void {
    (async () => {
      const response = await fetch(`https://swapi.dev/api/planets/?page=1`);
      const res = await response.json();
      let ids: number[] = [];
      for (let i = 0; i < res.count; i++) ids.push(i + 1);
      this.planetIds = ids;
    })();
  }
  ngOnChanges(): void {
    
  }

}
