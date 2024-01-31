import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(public auth:UsuarioService){

  }

  get isUserAuthenticated(): boolean {
    return !!this.auth.user.uid; 
  }

  logOut() {
    this.auth.cerrarSesion()
  }
}
