import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Hero, HeroFilter, HeroResult } from './interfaces/hero';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        .set('active', filter.active) 
        .set('direction', filter.direction) 
    if (filter.name) {
      urlParams = urlParams.set('name', filter.name);
    }
    return this.http.get<HeroResult>(`heroes`, {params: urlParams}).pipe( catchError(this.handleError) );
  }

  addHero(hero: Hero): Observable<HeroResult>  {
    return this.http.post<HeroResult>(`heroes`, hero);
  }

  modifyHero(hero: Hero): Observable<HeroResult>  {
    return this.http.put<HeroResult>(`heroes/${hero.id}`, hero);
  }

  deleteHero(id: number): Observable<HeroResult>  {
    return this.http.delete<HeroResult>(`heroes/${id}`).pipe( catchError(this.handleError) );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => "Something bad happened; please try again later.");
  }

}
