import { Component, OnInit } from '@angular/core';
import { SidebarService } from './core/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  historicoHabilitado?: boolean;

  constructor(
    public sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.historicoHabilitado = this.sidebarService.historicoHabilitado;
  }
}
