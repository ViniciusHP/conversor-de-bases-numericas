import { SidebarService } from './../sidebar.service';
import { Component, OnInit } from '@angular/core';
import { slideDown } from 'src/app/animations/animations';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations: [slideDown]
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
