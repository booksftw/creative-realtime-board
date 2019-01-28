import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { BoardComponent } from './board/board.component';

import { BoardService } from './shared/board.service';
import { StickyNoteComponent } from './board/sticky-note/sticky-note.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StickyNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [BoardService],
  entryComponents: [StickyNoteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
