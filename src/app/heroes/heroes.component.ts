import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Hero, HeroFilter } from '../interfaces/hero';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name'];
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public totalHeroes: number = 0;
  public heroesResult: Hero[] = [];

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit(): void {
    this.getHeroes(this.pageIndex, this.pageSize);
  }

  getHeroes(pageIndex: number, pageSize: number){
    this.heroesService.getHeroes({pageIndex, pageSize}).subscribe(({heroes, total}) => {
      this.heroesResult = heroes;
      this.totalHeroes = total
    })
  }


  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getHeroes(this.pageIndex, this.pageSize);
  }
}
