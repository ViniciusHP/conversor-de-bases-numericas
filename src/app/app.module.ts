import { SidebarModule } from 'primeng/sidebar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';

import { AppComponent } from './app.component';
import { ConversorModule } from './conversor/conversor.module';
import { CoreModule } from './core/core.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    ConfirmPopupModule,
    SidebarModule,
    ToggleButtonModule,

    ConversorModule,
    CoreModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
