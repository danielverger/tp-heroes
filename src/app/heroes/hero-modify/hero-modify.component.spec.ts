import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModifyComponent } from './hero-modify.component';
import { SharedModule } from './../../shared/shared.module';
import { ActivatedRoute, Data, Params, Router, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HeroesService } from '../../heroes.service';
import { ModalService } from './../../shared/modal.service';
import { Hero } from './../../interfaces/hero';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';


class MockModalService {
  openSnackBar = jasmine.createSpy('openSnackBar')
    .and.returnValue({afterDismissed: () => of(<MatSnackBarDismiss>{dismissedByAction: true})})

  showLoading() {};
  closeLoading() {};
}

describe('HeroModifyComponent', () => {
  let params: Subject<Params>;
  let data: Subject<Data>;
  let component: HeroModifyComponent;
  let fixture: ComponentFixture<HeroModifyComponent>;
  let heroesService: HeroesService;
  let modalService: ModalService;
  let router: Router;
  let modalInfo: jasmine.Spy;

  beforeEach(() => {
    params = new Subject<Params>();
    data = new Subject<Data>();
    TestBed.configureTestingModule({
      declarations: [HeroModifyComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: { data: data, paramMap: params },
        },
        {provide: ModalService, useClass: MockModalService }
      ]
    });
    fixture = TestBed.createComponent(HeroModifyComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    modalService = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the hero data if we receive a valid id', () => {
    spyOn(heroesService, 'getHero').and.returnValue(of({id: 9, name: 'SUPER-MOCK-MAN'}))
    params.next(convertToParamMap({ 'id': '9' }));
    data.next({ 'title': 'Modify' });
    fixture.detectChanges();
    const matcardtitle = fixture.debugElement.query(By.css('mat-card-title'))
    expect(matcardtitle.nativeElement.innerHTML).toBe('Modify');

    const inputName = fixture.debugElement.nativeElement.querySelector('#inputName');
    expect(inputName.value).toBe('SUPER-MOCK-MAN');
  });

  it('should show message error if we receive a invalid id', () => {
    const navigate = spyOn(router, 'navigate')
    spyOn(heroesService, 'getHero').and.returnValue(of(<Hero>{}));
    params.next(convertToParamMap({ 'id': '123' }));
    fixture.detectChanges();

    expect(modalService.openSnackBar).toHaveBeenCalledWith('Hero with id 123 not exists', 'error');
  });

  it('should show message error if api call fails', () => {
    spyOn(heroesService, 'getHero').and.returnValue(throwError(() => '404'));

    params.next(convertToParamMap({ 'id': '9' }));
    fixture.detectChanges();

    expect(modalService.openSnackBar).toHaveBeenCalledWith('404', 'error');
  });

  it('should display an informative message and navigate to the list when adding a new hero', () => {
    const navigate = spyOn(router, 'navigate');
    spyOn(heroesService, 'addHero').and.returnValue(of({id: 100, name: 'NEW HERO MAN'}));
    data.next({ 'title': 'Add' });
    params.next(convertToParamMap({  }));
    fixture.detectChanges();
    const newHero = {name: 'NEW HERO MAN'};

    component.heroForm.patchValue(newHero);
    component.saveHero();

    expect(modalService.openSnackBar).toHaveBeenCalledWith('Hero NEW HERO MAN added!!', 'info');
    expect(navigate).toHaveBeenCalledWith(['dashboard/heroes']);
  });

  it('should display an informative message and navigate to the list when modify a hero', () => {
    const navigate = spyOn(router, 'navigate');
    spyOn(heroesService, 'modifyHero').and.returnValue(of({id: 9, name: 'SUPER-MOCK-MAN-MODIFIED'}));
    spyOn(heroesService, 'getHero').and.returnValue(of({id: 9, name: 'SUPER-MOCK-MAN'}))
    params.next(convertToParamMap({ 'id': '9' }));
    data.next({ 'title': 'Modify' });
    fixture.detectChanges();

    component.heroForm.get('name')?.setValue('SUPER-MOCK-MAN-MODIFIED');
    component.saveHero();

    expect(modalService.openSnackBar).toHaveBeenCalledWith('Hero SUPER-MOCK-MAN-MODIFIED modified!!', 'info');
    expect(navigate).toHaveBeenCalledWith(['dashboard/heroes']);
  });

});
