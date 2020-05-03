import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isJoinShown = false
  roomId = ''

  constructor(private utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.roomId) this.joinRoom(this.roomId)
  }

  joinRoom(id: string): void {
    this.router.navigate([`/room/${id}`])
  }

  hostRoom(): void {
    const id = this.utilService.setId()
    // Save user is host for the this id to localstorage
    this.joinRoom(id)
  }

  toggleJoinRoom(): void {
    this.isJoinShown = !this.isJoinShown
  }
}
