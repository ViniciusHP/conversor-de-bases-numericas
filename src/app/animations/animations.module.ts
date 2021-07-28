import { HoverColorChangeDirective } from './hover-color-change.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HoverColorChangeDirective],
  imports: [
    CommonModule
  ],
  exports: [HoverColorChangeDirective]
})
export class AnimationsModule { }
