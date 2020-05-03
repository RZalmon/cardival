import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { BoardCmpComponent } from './cmps/board-cmp/board-cmp.component';
import { CardPreviewComponent } from './cmps/card-preview/card-preview.component';
import { PlayerPreviewComponent } from './cmps/player-preview/player-preview.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomPageComponent,
    BoardCmpComponent,
    CardPreviewComponent,
    PlayerPreviewComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
