import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { BoardComponent } from './board/board.component'
import { LoginComponent } from './login/login.component';
import { ChooseRoomComponent } from './choose-room/choose-room.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'choose', component: ChooseRoomComponent},
  {path: 'board' , component: BoardComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
