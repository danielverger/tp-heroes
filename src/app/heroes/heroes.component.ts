import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Hero } from '../interfaces/hero';
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public totalHeroes: number = 0;
  public heroesResult: Hero[] = [];

  constructor(private heroesService: HeroesService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getHeroes(this.pageIndex, this.pageSize);
  }

  getHeroes(pageIndex: number, pageSize: number) {
    this.modalService.showLoading()
    this.heroesService.getHeroes({ pageIndex, pageSize }).subscribe({
      next: ({ heroes, total }) => {
        this.heroesResult = heroes;
        this.totalHeroes = total
      },
      complete: () => this.modalService.closeLoading()
    })
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getHeroes(this.pageIndex, this.pageSize);
  }
}
