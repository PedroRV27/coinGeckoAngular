import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { DetalleMonedaComponent } from './detalle-moneda/detalle-moneda.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { PieComponent } from './pie/pie.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CuerpoComponent,DetalleMonedaComponent,RouterModule,CabeceraComponent,NavComponent,PieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public  http:HttpClient){

  }
  title = 'proyecto';
}
