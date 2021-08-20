import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AnimationsModule } from '../animations/animations.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    AnimationsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  providers: [MessageService]
})
export class CoreModule { }
