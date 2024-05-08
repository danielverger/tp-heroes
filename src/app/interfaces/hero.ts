import { SortDirection } from "@angular/material/sort";

export interface Hero {
  id: number;
  name: string;
}

export interface HeroResult {
  heroes: Hero[];
  total: number;
}


export class HeroFilter {
  pageIndex: number = 0;
  pageSize: number = 10;
  name: string = '';
  sortField: string = 'name';
  sortDirection: SortDirection = 'asc';
}