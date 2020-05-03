import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomPageComponent } from './pages/room-page/room-page.component'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
