import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomPageComponent } from './cmps/room-page/room-page.component';
import { BoardCmpComponent } from './cmps/board-cmp/board-cmp.component';
import { CardPreviewComponent } from './cmps/card-preview/card-preview.component';
import { PlayerPreviewComponent } from './cmps/player-preview/player-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomPageComponent,
    BoardCmpComponent,
    CardPreviewComponent,
    PlayerPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
