import { Component,OnInit } from '@angular/core';
import { CoingeckoService } from '../coingecko.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-monedas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './monedas.component.html',
  styleUrl: './monedas.component.css'
})
export class MonedasComponent implements OnInit{
  detallesMonedas:any;
  constructor(public ajax:CoingeckoService, public router:Router,public auth:UsuarioService){


  }
  ngOnInit(){
    this.monedas();
  }

  async monedas(){
    await this.auth.obtenerDatos()
        this.detallesMonedas = this.ajax.obtenerDetalles(this.auth.datosFS);
        console.log("Monedica",this.detallesMonedas);
  }

  enviarDetalle(id:any){
    console.log("Navigating datalle del "+ id );
    this.router.navigate(["detalle/",id])
  }

  eliminarMoneda(idMoneda: string) {
    console.log("moneda a borrar "+ idMoneda );
    this.auth.eliminarMoneda(idMoneda);
    this.monedas();
    
  }
}
