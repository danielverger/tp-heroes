import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Hero, HeroFilter, HeroResult } from './../interfaces/hero';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private _lastFilter = new HeroFilter();
  public get lastFilter() {
    return this._lastFilter;
  }

  constructor(private http: HttpClient) {}

  getHeroes(filter: HeroFilter): Observable<HeroResult>  {
    this._lastFilter = filter;
    let urlParams = new HttpParams()
        .set( 'pageIndex', filter.pageIndex ) 
        .set( 'pageSize', filter.pageSize ) 
        .set( 'sortField', filter.sortField ) 
        .set( 'sortDirection', filter.sortDirection ) 
    filter.name && (urlParams = urlParams.set( 'name', filter.name ));

    return this.http.get<HeroResult>( `heroes`, { params: urlParams } ).pipe( catchError(this.handleError) );
  }

  getHero(id: number): Observable<Hero>{
    return this.http.get<Hero>( `heroes/${id}` ).pipe( catchError(this.handleError) );
  }

  addHero(hero: Hero): Observable<Hero>  {
    return this.http.post<Hero>( `heroes`, hero ).pipe( catchError(this.handleError) );
  }

  modifyHero(hero: Hero): Observable<Hero>  {
    return this.http.put<Hero>( `heroes/${hero.id}`, hero ).pipe( catchError(this.handleError) );
  }

  deleteHero(id: number): Observable<boolean>  {
    return this.http.delete<boolean>( `heroes/${id}` ).pipe( catchError(this.handleError) );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError( () => "Something bad happened; please try again later." );
  }

}
