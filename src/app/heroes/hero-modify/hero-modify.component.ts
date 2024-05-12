import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from './../../shared/modal.service';
import { Hero } from './../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-modify',
  templateUrl: './hero-modify.component.html',
  styleUrls: ['./hero-modify.component.scss']
})
export class HeroModifyComponent implements OnInit {
  public titleCard?: string;
  public heroForm!: FormGroup;
  public isAddHero = true;
  public isSaving = false;
  @ViewChild('inputName') inputName!: ElementRef;

  constructor(
    readonly route: ActivatedRoute, 
    readonly heroesService: HeroesService,
    readonly modalService: ModalService,
    readonly router: Router,
    readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: [{value: '', disabled: true}],
    });

    this.route.data.subscribe( ( data ) => {
      this.titleCard = data['title'];
    });

    this.route.paramMap.subscribe(paramsMap => {
      if ( paramsMap.get('id') ) {
        this.isAddHero = false;
        const idHero = Number(paramsMap.get('id'));
        this.getHero(idHero);
      }
    });
  }

  getHero( idHero: number ) {
    this.modalService.showLoading()
    this.heroesService.getHero(idHero).subscribe({
      next: ( hero: Hero ) =>
      {
        if ( !hero?.id ) {
          this.modalService.openSnackBar(`Hero with id ${idHero} not exists`, 'error')
          .afterDismissed().subscribe(
            () => this.router.navigate(['dashboard/heroes'])
          );
        } else {
          this.heroForm.patchValue(hero);
          this.inputName.nativeElement.select();
        }
      },
      complete: () => this.modalService.closeLoading(),
      error: ( err ) => {
        this.modalService.closeLoading();
        this.modalService.openSnackBar(err, 'error');
      }
    })
  }


  saveHero() {
    this.isSaving = true;
    const hero = this.heroForm.getRawValue() as Hero;
    const saveHero$ = this.isAddHero ? this.heroesService.addHero(hero) : this.heroesService.modifyHero(hero);
    saveHero$.subscribe({
      next: ( hero: Hero ) => {
        this.modalService.openSnackBar(`Hero ${hero.name} ${this.isAddHero ? 'added': 'modified'}!!`, 'info')
        .afterDismissed().subscribe(
          () => this.router.navigate(['dashboard/heroes'])
        );
      }, 
      error: ( err ) => {
        this.modalService.openSnackBar(err, 'error');
        this.isSaving = false;
      }
    })
  }
}
