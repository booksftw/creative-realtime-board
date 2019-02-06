import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// import { FormsModule }
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './material.module'
import { FormsModule } from '@angular/forms'

import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment'

import { BoardComponent } from './board/board.component'
import { BoardService } from './shared/board.service'
import { StickyNoteComponent } from './board/sticky-note/sticky-note.component'
import { DrawWithPenDirective } from './shared/draw-with-pen.directive'
import { DrawPenComponent } from './board/draw-pen/draw-pen.component'
import { DrawShapesComponent } from './board/draw-shapes/draw-shapes.component'
import { TwoJsDirective } from './shared/two-js.directive'
// import { MarkdownDirective } from './shared/markdown.directive'
import { TextEditorComponent } from './board/text-editor/text-editor.component'
import { AtramentPaintDirective } from './shared/atrament-paint.directive'
import { AltraPaintComponent } from './board/altra-paint/altra-paint.component'
import { PaintJsDirective } from './shared/paint-js.directive'
import { PaperPaintComponent } from './board/paper-paint/paper-paint.component'
import { ChatboxComponent } from './board/chatbox/chatbox.component'
import { ChatinputComponent } from './board/chatbox/chatinput/chatinput.component'
import { ChatmessagelistComponent } from './board/chatbox/chatmessagelist/chatmessagelist.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { ChooseRoomComponent } from './choose-room/choose-room.component'
import { VideoStreamComponent } from './board/video-stream/video-stream.component'
import { VideoHelpersDirective } from './shared/video-helpers.directive';
import { DrawCircleComponent } from './board/draw-circle/draw-circle.component';
import { DrawRectComponent } from './board/draw-rect/draw-rect.component';
import { CircleDirective } from './shared/shapes/circle.directive';
import { StarDirective } from './shared/shapes/star.directive';
import { RectangleDirective } from './shared/shapes/rectangle.directive';
import { DrawStarComponent } from './board/draw-star/draw-star.component';
import { FrameBackgroundComponent } from './board/frame-background/frame-background.component'


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StickyNoteComponent,
    DrawWithPenDirective,
    DrawPenComponent,
    DrawShapesComponent,
    TwoJsDirective,
    // MarkdownDirective,
    TextEditorComponent,
    AtramentPaintDirective,
    AltraPaintComponent,
    PaintJsDirective,
    PaperPaintComponent,

    ChatboxComponent,
    ChatinputComponent,
    ChatmessagelistComponent,
    HomeComponent,
    LoginComponent,
    ChooseRoomComponent,
    VideoStreamComponent,
    VideoHelpersDirective,
    DrawCircleComponent,
    DrawRectComponent,
    CircleDirective,
    StarDirective,
    RectangleDirective,
    DrawStarComponent,
    FrameBackgroundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [BoardService],
  bootstrap: [AppComponent],
  entryComponents: [
    StickyNoteComponent,
    DrawPenComponent,
    DrawShapesComponent,
    TextEditorComponent,
    AltraPaintComponent,
    PaperPaintComponent,
    VideoStreamComponent,
    DrawCircleComponent,
    DrawRectComponent,
    DrawStarComponent,
    FrameBackgroundComponent
  ],
})
export class AppModule { }
