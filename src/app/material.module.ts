import { NgModule } from '@angular/core'
import {MatButtonModule} from '@angular/material/button'
import {DragDropModule} from '@angular/cdk/drag-drop'
import {MatInputModule} from '@angular/material/input'

@NgModule({
    imports: [MatButtonModule, DragDropModule, MatInputModule],
    exports: [MatButtonModule, DragDropModule, MatInputModule],
})

export class MaterialModule { }
