import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, map, merge, startWith, switchMap, tap } from 'rxjs';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from '../../heroes.service';
import { ModalService } from '../../shared/modal.service';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  public totalHeroes: number = 0;
  public heroesResult: Hero[] = [];
  // public data: Hero[] = [];
  // public dataSource = new MatTableDataSource<Hero>(this.data);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputName') inputName!: ElementRef;
  
  constructor(
    private heroesService: HeroesService, 
    private modalService: ModalService,
    private cd: ChangeDetectorRef
  ){}

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    const { pageIndex, pageSize, name, sortDirection, sortField } = this.heroesService.lastFilter;
    this.paginator.pageIndex = pageIndex;
    this.paginator.pageSize = pageSize;
    this.inputName.nativeElement.value = name;
    this.sort.active = sortField;
    this.sort.direction = sortDirection;
    this.cd.detectChanges();

    const filterName$ = fromEvent<KeyboardEvent>( this.inputName.nativeElement, 'keyup' ).pipe( 
      map( ( ev: KeyboardEvent ) => (<HTMLInputElement>ev.target).value ),
      debounceTime(500), 
      distinctUntilChanged( ( prev, current ) => prev === current)
    );

    this.sort.sortChange.subscribe( () => this.paginator.pageIndex = 0 );

    merge(filterName$, this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      tap( () => this.modalService.showLoading()),
      switchMap( () => {
        return this.heroesService.getHeroes(
          {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDirection: this.sort.direction,
            name: this.inputName.nativeElement.value,
          })
      } ),
      tap( () => this.modalService.closeLoading() )
    ).subscribe({
      next: ({ heroes, total }) => {
        // this.dataSource.data = heroes;
        this.heroesResult = heroes;
        this.totalHeroes = total;
        // this.paginator.length = total;
        // this.dataSource = new MatTableDataSource<Hero>(this.dataSource.data);
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        // });
      },
      error: ( err ) => {
        this.modalService.openSnackBar(err, 'error');
        this.modalService.closeLoading();
      },
    })

  }

  deleteHero(hero: Hero) {
    this.modalService.confirmDialog('Delete Hero', `Are you sure to delete ${hero.name}?`).afterClosed().subscribe(
        deleteOK => deleteOK && 
          this.heroesService.deleteHero(hero.id).subscribe({
          next: ( deleted ) =>
              deleted && this.modalService.openSnackBar(`${hero.name} deleted!`, 'info').afterOpened().subscribe( () => {
                this.paginator.page.next(this.paginator)
          }),
          error: ( err ) => this.modalService.openSnackBar(err, 'error')
        })
      );
  }

}


