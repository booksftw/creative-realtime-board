import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module'

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { BoardComponent } from './board/board.component';

import { BoardService } from './shared/board.service';
import { StickyNoteComponent } from './board/sticky-note/sticky-note.component';
import { DrawWithPenDirective } from './shared/draw-with-pen.directive';
import { DrawPenComponent } from './board/draw-pen/draw-pen.component';
import { DrawShapesComponent } from './board/draw-shapes/draw-shapes.component';
import { TwoJsDirective } from './shared/two-js.directive';
import { MarkdownDirective } from './shared/markdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StickyNoteComponent,
    DrawWithPenDirective,
    DrawPenComponent,
    DrawShapesComponent,
    TwoJsDirective,
    MarkdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [BoardService],
  bootstrap: [AppComponent],
  entryComponents: [StickyNoteComponent, DrawPenComponent, DrawShapesComponent],
})
export class AppModule { }
