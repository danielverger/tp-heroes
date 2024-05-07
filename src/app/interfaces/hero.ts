export interface Hero {
  id: number;
  name: string;
}

export interface HeroResult {
  heroes: Hero[];
  total: number;
}


export interface HeroFilter {
  pageIndex: number;
  pageSize: number;
  name?: string;
  active: string;
  direction: string;
}