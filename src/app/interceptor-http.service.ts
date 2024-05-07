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

  private heroesList = (heroes as any).default;
  private totalFilteredHeroes = 0;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method, urlWithParams } = req;

    if (url.startsWith("heroes") && method === "GET") {
      const searchParams = new URLSearchParams(urlWithParams.split('?')[1]);
      const pageSize = parseInt(searchParams.get('pageSize') || '10');
      const pageIndex = parseInt(searchParams.get('pageIndex') || '0');
      const name = searchParams.get('name') || ''; 
      const active = <keyof Hero>searchParams.get('active') || 'name';
      const direction = searchParams.get('direction') || '';
      let heroesResult: Hero[] = [];

      const filteredDataObservable$ = of(<Hero[]>this.heroesList)
        .pipe(
          map((data:Hero[]) => {
            return data.filter(hero => hero.name.toUpperCase().includes(name.toLocaleUpperCase())).sort((a: Hero, b: Hero) => {
              return (direction === 'desc' ? a[active] < b[active] : a[active] > b[active]) ? 1 : -1
            })
          }),
        )
      
      filteredDataObservable$.subscribe((filteredData:Hero[]) => {
        this.totalFilteredHeroes = filteredData.length;
        from(<Hero[]>filteredData).pipe(
          skip(pageIndex * pageSize),
          take(pageSize))
          .subscribe((hero: Hero) => {
            heroesResult.push(hero);
          });
      });

      const body = <HeroResult>{ heroes: heroesResult, total: this.totalFilteredHeroes }
      return of(new HttpResponse({ status: 200, body })).pipe(delay(1000));
    }

    if (url.startsWith("heroes") && method === "DELETE") {
      const idHero = parseInt(urlWithParams.split('/')[1]);
      this.heroesList = this.heroesList.filter((hero:Hero) => hero.id !== idHero)
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(500));
    }

    if (url.startsWith("heroes") && method === "POST") {

    }

    if (url.startsWith("heroes") && method === "PUT") {

    }

    return next.handle(req);
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
