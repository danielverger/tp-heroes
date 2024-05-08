import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import * as heroes from './../assets/heroes.json'
import { Hero, HeroFilter, HeroResult } from './interfaces/hero';

fdescribe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify()
  })

  it('call getHeroes with filter and return heroes data', () => {
    const mockHeroesResponse = (heroes as any).default as Hero[];
    const heroFilter = new HeroFilter();
    heroFilter.name = 'name';
    heroFilter.pageIndex = 1;
    heroFilter.pageSize = 10;
    heroFilter.sortDirection = 'desc';
    heroFilter.sortField = 'id';
    const heroResult = <HeroResult>{heroes: mockHeroesResponse, total:11}

    service.getHeroes(heroFilter).subscribe( (res: HeroResult) => {
      expect(res).toEqual(heroResult)
    })

    httpMock.expectOne({url: 'heroes?pageIndex=1&pageSize=10&sortField=id&sortDirection=desc&name=name'}).flush(heroResult);
  });

  it('call getHero with id and return hero data', () => {
    const mockHeroResponse = <Hero>{ id: 1, name: 'MOCK-MAN' };

    service.getHero(1).subscribe( (res: Hero) => {
      expect(res).toEqual(mockHeroResponse);
    })

    httpMock.expectOne({url: 'heroes/1'}).flush(mockHeroResponse);
  })

});
