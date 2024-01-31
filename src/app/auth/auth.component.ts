import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  public user:any = {}

  constructor(public auth:UsuarioService){

  }

  public registroGoogle(){
    this.auth.loginGoogle();
  }

  public registroGithub(){
    this.auth.loginGitHub();
  }
}
