import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { residentFetching, ResidentEntry, residentSuccess, RootStore, selectResident, fetchResident, PlanetEntry, selectPlanet, fetchPlanet } from '../store';
import { extract_id } from '../util';

@Component({
  selector: 'app-resident-badge',
  templateUrl: './resident-badge.component.html',
  styleUrls: ['./resident-badge.component.scss']
})
export class ResidentBadgeComponent implements OnInit {

  @Input() public id: number = 0;
  @Input() public genderFilter: string | null = null;
  public residentObs: Observable<ResidentEntry> = null!;
  public resident: ResidentEntry['value'] | null;
  public homeworldObs: Observable<PlanetEntry> = null!;
  public homeworld: PlanetEntry = null!;

  constructor(private store: Store<RootStore>) { }

  ngOnInit(): void {
    this.residentObs = this.store.select(selectResident(this.id));
    this.residentObs.subscribe(r => {
      this.resident = r.value || null;
      if (r.status === 'none') fetchResident(this.store, r.id);
    });

    this.homeworldObs = this.store.select(selectPlanet(() => {
      if (!this.resident) return 0;
      return extract_id(this.resident.homeworld)!;
    }));
    this.homeworldObs.subscribe(r => {
      this.homeworld = r;
      //if (r.status === 'none') fetchPlanet(this.store, r.id);
    });
  }

}
