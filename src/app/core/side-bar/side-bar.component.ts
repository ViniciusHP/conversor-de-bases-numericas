import { SidebarService } from './../sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  exibirSideBar = false;
  historico!: boolean;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.historico = this.sidebarService.historicoHabilitado;
  }

  toggleHistorico() {
    this.sidebarService.historicoHabilitado = this.historico;
  }
}
