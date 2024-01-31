import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  buscarTexto='';

  // buscarCoin(){
  //   this.coins = this.coins.filter(coin=> coin.name.toLowerCase().includes(this.buscarTexto.toLowerCase()))
  // }
}
