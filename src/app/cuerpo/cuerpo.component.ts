import { Component,Input,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CoingeckoService } from '../coingecko.service';
import { UsuarioService } from '../usuario.service';



interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price:number;
  price_change_percentage_24h:number;
  total_volume:number;
}

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css'
})
export class CuerpoComponent implements OnInit{
  coins: Coin[] = [];
  filtrarCoin: Coin[] = [];
  titles: string[] = ['#','','Coin', 'Price', 'Price Change', '24H Volume',''];
  buscarTexto='';
  monedaSeleccionada: any;
  seguida=false;
  logueado=false;

  constructor(public http:HttpClient ,public router: Router,public ajax:CoingeckoService,public auth:UsuarioService){

  }
  

  buscarCoin(){
    this.filtrarCoin = this.coins.filter((coin)=> 
      coin.name.toLowerCase().includes(this.buscarTexto.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.buscarTexto.toLowerCase())

      );
  }
  ngOnInit() {
    this.obtenerPeticionAjax();
  }

  obtenerPeticionAjax(){
    this.ajax.peticionAJAX();
    this.ajax.coins$.subscribe((data: any[]) => {
      this.coins=data;
      this.buscarCoin();
    });
  }

  seguirMoneda(id: string) {
    this.auth.seguirMonedad(id);
  }

  get isUserAuthenticated(): boolean {
    return !!this.auth.user.uid; 
  }

}
