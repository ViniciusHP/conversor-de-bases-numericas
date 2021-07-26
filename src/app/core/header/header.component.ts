import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  onMenuClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  emitirEventoMenuClick() {
    this.onMenuClick.emit();
  }
}
