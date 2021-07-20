import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SidebarModule} from 'primeng/sidebar';

import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    FooterComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,

    SidebarModule
  ],
  exports: [
    FooterComponent,
    SideBarComponent
  ]
})
export class CoreModule { }
