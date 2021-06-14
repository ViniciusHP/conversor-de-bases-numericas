import { Component, OnInit } from '@angular/core';

export class DadoDeCoversao {
  constructor(
    public baseInicial?: string,
    public baseFinal?: string,
    public valorInicial?: string,
    public valorFinal?: string
  ) {}
}

@Component({
  selector: 'app-tela-conversor',
  templateUrl: './tela-conversor.component.html',
  styleUrls: ['./tela-conversor.component.css']
})
export class TelaConversorComponent implements OnInit {

  dadosDoFormulario = new DadoDeCoversao();

  bases = [
    { label: 'Binária', value: 'Binária' },
    { label: 'Decimal', value: 'Decimal' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  converter(): void {
    console.log(this.dadosDoFormulario);
  }

}
