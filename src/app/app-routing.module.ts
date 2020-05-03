import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { RoomPageComponent } from './pages/room-page/room-page.component'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'room/:id', component: RoomPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
