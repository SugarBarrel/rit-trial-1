import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchPlanet, PlanetEntry, RootStore, selectPlanet } from '../store';
import { extract_id } from '../util';

let globalC = 0;

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  @Input() public id: number = 0;
  public planetObs: Observable<PlanetEntry> = null!;
  public planet: PlanetEntry['value'] | null;
  public residentIds: number[] = [];
  public genderFilter: string | null = null;
  setGenderFilter(e: Event) {
    let value = (e.target as any).value;
    if (value == 'any') value = null;
    console.log(`Set gender filter to ${value}`);
    this.genderFilter = value;
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootStore>
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.route.params.subscribe(p => {
      this.id = +p['id'];
    })

    this.planetObs = this.store.select(selectPlanet(this.id));
    this.planetObs.subscribe(r => {
      this.planet = r.value || null;
      console.log(this.planet);
      this.residentIds = r.value?.residents.map(extract_id) || [];
      if (r.status === 'none' && globalC++ === 0) fetchPlanet(this.store, r.id);
    });
  }

}
