import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  pageState = 0

  constructor() { }

  ngOnInit(): void {
  }

  changePageState(num: number): void {
    this.pageState = num
    console.log('this.pageState:', this.pageState)
  }

}
