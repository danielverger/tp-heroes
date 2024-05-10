import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroesListComponent } from './heroes-list.component';
import { SharedModule } from './../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ModalService } from './../../shared/modal.service';
import { HeroesService } from '../../services/heroes.service';
import * as heroes from './../../../assets/heroes.json'
import { HeroFilter } from './../../interfaces/hero';

class MockModalService {
  confirmDialog = jasmine.createSpy('confirmDialog')
    .and.returnValue({afterClosed: () => of(true)})
  openSnackBar = jasmine.createSpy('openSnackBar')
    .and.returnValue({
      afterDismissed: () => of(<MatSnackBarDismiss>{dismissedByAction: true}),
      afterOpened: () => of(true),
    })

  showLoading() {};
  closeLoading() {};
}

describe('HeroesListComponent', () => {
  const heroesList = ( heroes as any ).default;
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesService: HeroesService;
  let modalService: ModalService;
  class MockComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesListComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'heroes/5', component: MockComponent},
        ]),
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '24fkzrw3487943uf358lovd'}}
          }
        },
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
    const getHeroes = spyOn(heroesService, 'getHeroes').and.returnValue(of(heroesList));

    component.inputName.nativeElement.value = 'MOCKMAN';
    component.getObersrvableFilters().subscribe(()=>{});

    expect(getHeroes).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 10,
      sortField: 'name',
      sortDirection: 'asc',
      name: 'MOCKMAN'} as HeroFilter);
  }));

  it('should call the hero search when change sort', fakeAsync(() => {
    const getHeroes = spyOn(heroesService, 'getHeroes').and.returnValue(of(heroesList));

    component.sort.active = 'id';
    component.getObersrvableFilters().subscribe(()=>{});

    expect(getHeroes).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 10,
      sortField: 'id',
      sortDirection: 'asc',
      name: ''} as HeroFilter);

  }));

  it('should call the hero search when change page size', fakeAsync(() => {
    const getHeroes = spyOn(heroesService, 'getHeroes').and.returnValue(of(heroesList));

    component.paginator.pageSize = 5;
    component.getObersrvableFilters().subscribe(()=>{});

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
    const inputElement = component.inputName.nativeElement;
    inputElement.value = 'Hero'
    inputElement.dispatchEvent(new KeyboardEvent('keyup'));

    tick(501);
    fixture.detectChanges();

    expect(inputValue).toBe('Hero');
  }));
});
