import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchPlanet, PlanetEntry, RootStore, selectPlanet } from '../store';

@Component({
  selector: 'app-planet-badge',
  templateUrl: './planet-badge.component.html',
  styleUrls: ['./planet-badge.component.scss']
})
export class PlanetBadgeComponent implements OnInit {

  @Input() public id: number = 0;
  public planetObs: Observable<PlanetEntry> = null!;
  public planet: PlanetEntry['value'] | null;

  constructor(private store: Store<RootStore>) { }

  ngOnInit(): void {
    this.planetObs = this.store.select(selectPlanet(this.id));
    this.planetObs.subscribe(r => {
      this.planet = r.value || null;
      if (r.status === 'none') fetchPlanet(this.store, r.id);
    });
  }

}
