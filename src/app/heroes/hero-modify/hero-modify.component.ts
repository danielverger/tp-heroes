import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from './../../heroes.service';
import { ModalService } from './../../shared/modal.service';
import { Hero } from './../../interfaces/hero';

@Component({
  selector: 'app-hero-modify',
  templateUrl: './hero-modify.component.html',
  styleUrls: ['./hero-modify.component.scss']
})
export class HeroModifyComponent implements OnInit, AfterViewInit {
  public titleCard?: string;
  public heroForm!: FormGroup;
  public isAddHero = true;
  public isSaving = false;
  @ViewChild('inputName') inputName!: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private heroesService: HeroesService,
    private modalService: ModalService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
  }

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
    const { id, name } = this.heroForm.getRawValue();
    const saveHero$ = this.isAddHero ? this.heroesService.addHero({ id, name }) : this.heroesService.modifyHero({ id, name });
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
