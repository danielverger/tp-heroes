import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { from, Observable, of } from 'rxjs'
import { delay, map, skip, take } from 'rxjs/operators'
import { Hero, HeroResult } from './interfaces/hero'
import * as heroes from './../assets/heroes.json'


@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

  private heroesList: Hero[] = [];
  private totalFilteredHeroes = 0;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  constructor() {
    from(heroes).subscribe( (hero: Hero) => {this.heroesList.push(hero)} );
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method, urlWithParams } = req;
    

    if ( url === 'heroes' && method === 'GET' ) {
      const searchParams  = new URLSearchParams( urlWithParams.split( '?' )[1] );
      const pageSize      = parseInt( searchParams.get( 'pageSize') ?? '10' );
      const pageIndex     = parseInt( searchParams.get( 'pageIndex') ?? '0' );
      const name          = searchParams.get( 'name' ) ?? '';
      const sortField     = searchParams.get( 'sortField' ) as keyof Hero || 'name';
      const sortDirection = searchParams.get( 'sortDirection' ) ?? '';
      const heroesResult: Hero[] = [];

      const filteredDataObservable$ = of( this.heroesList )
        .pipe(
          map( ( data: Hero[] ) => {
            return data.filter( hero =>
              hero.name.toUpperCase().includes( name.toLocaleUpperCase() )
            )
            .sort( ( a: Hero, b: Hero ) => {
              // return (sortDirection === 'desc' ? a[sortField] < b[sortField] : a[sortField] > b[sortField]) ? 1 : -1
              return  (a[sortField] < b[sortField] ? 1 : -1) * (sortDirection === 'desc' ? 1 : -1)
            })
          }),
        )

      filteredDataObservable$.subscribe( ( filteredData: Hero[] ) => {
        this.totalFilteredHeroes = filteredData.length;
        from( filteredData ).pipe(
          skip( pageIndex * pageSize ),
          take( pageSize ))
          .subscribe( ( hero: Hero ) => {
            heroesResult.push( hero );
          });
      });

      const body = { heroes: heroesResult, total: this.totalFilteredHeroes } as HeroResult;
      return of( new HttpResponse({ status: 200, body }) ).pipe(delay(1000));
    }

    if ( url.startsWith( 'heroes/' ) && method === 'GET' ) {
      const idHero = parseInt( urlWithParams.split('/')[1] );
      const hero = this.heroesList.find( (hero: Hero) => hero.id === idHero );
      const body = hero;
      return of( new HttpResponse({ status: 200, body }) ).pipe(delay(1000));
    }

    if ( url.startsWith( 'heroes' ) && method === 'DELETE' ) {
      const idHero = parseInt( urlWithParams.split('/')[1] );
      this.heroesList = this.heroesList.filter( ( hero: Hero ) => hero.id !== idHero );
      return of( new HttpResponse({ status: 200, body: true }) ).pipe(delay(200));
    }

    if ( url.startsWith( 'heroes' ) && method === 'POST' ) {
      const { body } = req;
      (body as Hero).id = Math.max( ...this.heroesList.map( ( hero:Hero ) => hero.id ), 0 ) + 1;
      this.heroesList.push(body);
      return of( new HttpResponse({ status: 200, body }) ).pipe(delay(200));
    }

    if ( url.startsWith( 'heroes' ) && method === 'PUT' ) {
      const { body } = req;
      const idHero = parseInt(urlWithParams.split( '/' )[1]);
      this.heroesList = this.heroesList.filter( ( hero: Hero ) => hero.id !== idHero );
      this.heroesList.push(body);
      return of( new HttpResponse({ status: 200, body }) ).pipe(delay(200));

    }

    return next.handle(req);
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
