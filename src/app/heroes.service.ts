import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, HeroFilter, HeroResult } from './interfaces/hero';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroes(filter: HeroFilter): Observable<HeroResult>  {
    let urlParams = new HttpParams()
        .set('pageIndex', filter.pageIndex) 
        .set('pageSize', filter.pageSize) 
    filter.name && urlParams.set('name', filter.name);
    return this.http.get<HeroResult>(`heroes`, {params: urlParams});
  }

  addHero(hero: Hero): Observable<HeroResult>  {
    return this.http.post<HeroResult>(`heroes`, hero);
  }

  modifyHero(hero: Hero): Observable<HeroResult>  {
    return this.http.put<HeroResult>(`heroes/${hero.id}`, hero);
  }

  deleteHero(id: number): Observable<HeroResult>  {
    return this.http.delete<HeroResult>(`heroes/${id}`);
  }



}
