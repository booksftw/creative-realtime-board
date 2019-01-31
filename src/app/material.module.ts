import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
    imports: [MatButtonModule, DragDropModule],
    exports: [MatButtonModule, DragDropModule],
})
export class MaterialModule {}