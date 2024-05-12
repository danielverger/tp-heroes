import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroesListComponent } from './heroes-list.component';
import { SharedModule } from './../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
import { from, of, throwError } from 'rxjs';
import { ModalService } from './../../shared/modal.service';
import { HeroesService } from '../../services/heroes.service';
import * as heroes from './../../../assets/heroes.json'
import { Hero, HeroFilter, HeroResult } from './../../interfaces/hero';

class MockModalService {
  confirmDialog = jasmine.createSpy('confirmDialog')
    .and.returnValue({afterClosed: () => of(true)})
  openSnackBar = jasmine.createSpy('openSnackBar')
    .and.returnValue({
      afterDismissed: () => of({dismissedByAction: true} as MatSnackBarDismiss),
      afterOpened: () => of(true),
    })

  showLoading = () => true;
  closeLoading = () => true;
}

describe('HeroesListComponent', () => {
  const heroesList: Hero[] = [];
  from(heroes).subscribe( (hero: Hero) => {heroesList.push(hero)} );
  const heroesResult = {heroes: heroesList, total: heroesList.length} as HeroResult;

  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesService: HeroesService;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesListComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {provide: ModalService, useClass: MockModalService }
      ]
    });
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should display an informative message when delete a hero', () => {
    spyOn(heroesService, 'deleteHero').and.returnValue(of(true));

    component.deleteHero({id: 5, name: 'MOCKMAN'});
    expect(modalService.confirmDialog).toHaveBeenCalledWith('Delete Hero', 'Are you sure to delete MOCKMAN?');
    expect(modalService.openSnackBar).toHaveBeenCalledWith('MOCKMAN deleted!', 'info');
  });


  it('should display an error message when delete a hero and return exception', () => {
    spyOn(heroesService, 'deleteHero').and.returnValue(throwError(() => '404'));

    component.deleteHero({id: 5, name: 'MOCKMAN'});

    expect(modalService.openSnackBar).toHaveBeenCalledWith('404', 'error');
  });


  it('should call the hero search when filtering by name', fakeAsync(() => {
    const getHeroes = spyOn(heroesService, 'getHeroes').and.returnValue(of(heroesResult));

    component.inputName.nativeElement.value = 'MOCKMAN';
    component.getObersrvableFilters().subscribe( (heroes) => {
      expect(heroes).not.toBeNull();
    });

    expect(getHeroes).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 10,
      sortField: 'name',
      sortDirection: 'asc',
      name: 'MOCKMAN'} as HeroFilter);
  }));

  it('should call the hero search when change sort', fakeAsync(() => {
    const getHeroes = spyOn(heroesService, 'getHeroes').and.returnValue(of(heroesResult));

    component.sort.active = 'id';
    component.getObersrvableFilters().subscribe( (heroes) => {
      expect(heroes).not.toBeNull();
    });

    expect(getHeroes).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 10,
      sortField: 'id',
      sortDirection: 'asc',
      name: ''} as HeroFilter);

  }));

  it('should call the hero search when change page size', fakeAsync(() => {
    const getHeroes = spyOn(heroesService, 'getHeroes').and.returnValue(of(heroesResult));

    component.paginator.pageSize = 5;
    component.getObersrvableFilters().subscribe( (heroes) => {
      expect(heroes).not.toBeNull();
    });

    expect(getHeroes).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 5,
      sortField: 'name',
      sortDirection: 'asc',
      name: ''} as HeroFilter);

  }));

  it('should emit input value changes', fakeAsync(() => {
    let inputValue = '';
    component.getObservableFilterName().subscribe((value)=>{inputValue = value});
    component.filterNameControl.setValue('Hero');

    tick(501);
    fixture.detectChanges();

    expect(inputValue).toBe('Hero');
  }));
});
