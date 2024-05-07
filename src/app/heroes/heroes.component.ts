import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Hero } from '../interfaces/hero';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalService } from '../shared/modal.service';
import { MatSort } from '@angular/material/sort';
import { catchError, debounceTime, distinctUntilChanged, fromEvent, map, merge, pluck, startWith, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public totalHeroes: number = 0;
  public heroesResult: Hero[] = [];

  public formFilter!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input', {static: false}) input!: ElementRef;
  
  constructor(
    private heroesService: HeroesService, 
    private modalService: ModalService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formFilter = this.formBuilder.group({
      name: ''
   });
  }

  ngAfterViewInit(): void {

    const filterName$ = fromEvent<KeyboardEvent>( this.input.nativeElement, 'keyup' ).pipe( 
      map((ev:KeyboardEvent) => ev.key),
      debounceTime(500), 
      distinctUntilChanged((prev, current) => prev === current)
    );

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(filterName$, this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      tap(()=> this.modalService.showLoading()),
      switchMap(() => {
        return this.heroesService.getHeroes(
          {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            active: this.sort.active,
            direction: this.sort.direction,
            name: this.input.nativeElement.value,
          })
      }),
      tap(() => this.modalService.closeLoading())
    ).subscribe({
      next: ({ heroes, total }) => {
        this.heroesResult = heroes;
        this.totalHeroes = total
      },
      error: (err) => {
        this.modalService.openSnackBar(err, 'error');
        this.modalService.closeLoading();
      },
    })

  }

  applyFilter(event:any) {}

  deleteHero(hero: Hero) {
    this.modalService.confirmDialog('Delete Hero', `Are you sure to delete ${hero.name}?`).afterClosed().subscribe(
        result => result && 
          this.heroesService.deleteHero(hero.id).subscribe({
          next: (deleted) =>
            {
              deleted && this.modalService.openSnackBar(`${hero.name} deleted!`, 'info').afterDismissed().subscribe( () =>
                this.paginator.page.next(this.paginator)
              );
            },
          error: (err) => this.modalService.openSnackBar(err, 'error')
        })
      );
  }

}


