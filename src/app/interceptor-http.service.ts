import {Injectable} from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import {from, Observable, of} from 'rxjs'
import {delay, skip, take} from 'rxjs/operators'
import { Hero, HeroResult } from './interfaces/hero'
import * as heroes from './../assets/heroes.json'


@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

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
      const pageSize: number = parseInt(searchParams.get('pageSize') || '10');
      const pageIndex: number = parseInt(searchParams.get('pageIndex') || '0');
      const heroesList = heroes;
      let heroesResult: Hero[] = [];
      from(heroesList).pipe(
        skip(pageIndex*pageSize), 
        take(pageSize))
      .subscribe((hero: Hero) => {
        heroesResult.push(hero);
      });

      const body = <HeroResult>{ heroes:heroesResult, total:heroesList.length }
      return of(new HttpResponse({ status: 200, body })).pipe(delay(1000));
    }

    return next.handle(req);
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
