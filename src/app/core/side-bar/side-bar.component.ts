import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  exibirSideBar = false;

  constructor() { }

  ngOnInit(): void {
  }

  get historicoHabilitado() {
    return true
  }

  set historicoHabilitado(isHabilitado) {
    console.log(isHabilitado)
  }
}