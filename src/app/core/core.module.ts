import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SidebarModule} from 'primeng/sidebar';
import {ToggleButtonModule} from 'primeng/togglebutton';

import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SidebarModule,
    ToggleButtonModule
  ],
  exports: [
    FooterComponent,
    SideBarComponent
  ]
})
export class CoreModule { }
