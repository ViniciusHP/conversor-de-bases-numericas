import { HoverColorChangeDirective } from './hover-color-change.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHeightChangeDirective } from './smooth-height-change.directive';



@NgModule({
  declarations: [
    HoverColorChangeDirective,
    SmoothHeightChangeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HoverColorChangeDirective,
    SmoothHeightChangeDirective
  ]
})
export class AnimationsModule { }
