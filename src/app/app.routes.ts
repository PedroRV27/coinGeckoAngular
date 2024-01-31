import { Routes } from '@angular/router';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { DetalleMonedaComponent } from './detalle-moneda/detalle-moneda.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { MonedasComponent } from './monedas/monedas.component';
import { autentificacionGuard } from './autentificacion.guard';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'cuerpo',component:CuerpoComponent, canActivate:[autentificacionGuard]},
    { path: 'detalle-moneda/:id', component: DetalleMonedaComponent,canActivate:[autentificacionGuard] },
    {path:'home',component:CabeceraComponent},
    {path:'login',component:AuthComponent},
    {path:'coin',component:MonedasComponent}
    
];
