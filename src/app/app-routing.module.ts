import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { BoardComponent } from './board/board.component'
const routes: Routes = [
  {path: 'test', component: HomeComponent },
  {path: '' , component: BoardComponent, pathMatch:'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
