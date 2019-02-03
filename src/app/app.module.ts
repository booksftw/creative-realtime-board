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
<<<<<<< HEAD
=======
import { TextEditorComponent } from './board/text-editor/text-editor.component';
import { AtramentPaintDirective } from './shared/atrament-paint.directive';
import { AltraPaintComponent } from './board/altra-paint/altra-paint.component';
import { PaintJsDirective } from './shared/paint-js.directive';
import { PaperPaintComponent } from './board/paper-paint/paper-paint.component';

>>>>>>> integrate/image_upload

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StickyNoteComponent,
    DrawWithPenDirective,
    DrawPenComponent,
    DrawShapesComponent,
    TwoJsDirective,
<<<<<<< HEAD
    MarkdownDirective
=======
    MarkdownDirective,
    TextEditorComponent,
    AtramentPaintDirective,
    AltraPaintComponent,
    PaintJsDirective,
    PaperPaintComponent,
>>>>>>> integrate/image_upload
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
  entryComponents: [
    StickyNoteComponent,
    DrawPenComponent,
    DrawShapesComponent,
    TextEditorComponent,
    AltraPaintComponent,
    PaperPaintComponent],
})
export class AppModule { }
