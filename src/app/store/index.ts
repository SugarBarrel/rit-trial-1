import { createAction, props, Store } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';

const fetchingProps = props<{ ids: number[] }>();
const successProps = props<{ ids: number[], results: any[] }>();

export const planetFetching = createAction('[Planet] Fetching', fetchingProps);
export const planetSuccess = createAction('[Planet] Success', successProps);
export const residentFetching = createAction('[Resident] Fetching', fetchingProps);
export const residentSuccess = createAction('[Resident] Success', successProps);

export type RootStore = {
  planets: PlanetEntry[],
  residents: ResidentEntry[],
}

export type PlanetEntry = {
  id: number,
  status: Status,
  value: any,
}
export type ResidentEntry = {
  id: number,
  status: Status,
  value: any,
}
export type Status = "fetching" | "success" | "error" | "none";

export const planetsReducer = createReducer<PlanetEntry[]>(
  [],
  on(planetFetching, (state, action) => {
    if (state.some(e => action.ids.includes(e.id) && e.status === "fetching")) return state;
    const newState: PlanetEntry[] = state.filter(e => !action.ids.includes(e.id));
    for (let id of action.ids)
      newState.push({ id, status: "fetching", value: null });
    return newState;
  }),
  on(planetSuccess, (state, action) => {
    const newState: PlanetEntry[] = state.filter(e => !action.ids.includes(e.id));
    for (let i = 0; i < action.ids.length; i++)
      newState.push({ id: action.ids[i], status: "success", value: action.results[i] });
    return newState;
  }),
);

export const residentsReducer = createReducer<ResidentEntry[]>(
  [],
  on(residentFetching, (state, action) => {
    if (state.some(e => action.ids.includes(e.id) && e.status === "fetching")) return state;
    const newState: ResidentEntry[] = state.filter(e => !action.ids.includes(e.id));
    for (let id of action.ids)
      newState.push({ id, status: "fetching", value: null });
    return newState;
  }),
  on(residentSuccess, (state, action) => {
    const newState = state.filter(e => !action.ids.includes(e.id));
    for (let i = 0; i < action.ids.length; i++)
      newState.push({ id: action.ids[i], status: "success", value: action.results[i] });
    return newState;
  }),
);

export function selectResident(id: number | (() => number)) {
  return (s: RootStore) => {
    const myId = typeof id === 'function' ? id() : id;
    const resident = s.residents.find(r => r.id === myId);
    return resident || { id: myId, status: "none", value: null };
  };
}
export function selectPlanet(id: number | (() => number)) {
  return (s: RootStore) => {
    const myId = typeof id === 'function' ? id() : id;
    const planet = s.planets.find(r => r.id === myId);
    return planet || { id: myId, status: "none", value: null };
  };
}

export async function fetchPlanet(store: Store<RootStore>, id: number | (() => number)) {
  if (!id) return;
  if (typeof id === 'function') id = id();

  // batch API calls
  let batchPage = Math.floor((id - 1) / 10); // 0-based index
  let ids: number[] = [];
  for (let i = 1; i <= 10; i++)
    ids.push(batchPage * 10 + i);
  
  store.dispatch(planetFetching({ ids }));
  const response = await fetch(`https://swapi.dev/api/planets/?page=${batchPage + 1}`);
  const res = await response.json();
  store.dispatch(planetSuccess({ ids, results: res.results }));
}
export async function fetchResident(store: Store<RootStore>, id: number | (() => number)) {
  if (!id) return;
  if (typeof id === 'function') id = id();

  // batch API calls
  let batchPage = Math.floor((id - 1) / 10); // 0-based index
  let ids: number[] = [];
  for (let i = 1; i <= 10; i++)
    ids.push(batchPage * 10 + i);
  
  store.dispatch(residentFetching({ ids }));
  const response = await fetch(`https://swapi.dev/api/people/?page=${batchPage + 1}`);
  const res = await response.json();
  store.dispatch(residentSuccess({ ids, results: res.results }));
}

const RootReducer = {
  planets: planetsReducer,
  residents: residentsReducer,
}
export default RootReducer;
