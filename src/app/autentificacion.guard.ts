import { CanActivateFn } from '@angular/router';

export const autentificacionGuard: CanActivateFn = (route, state) => {
  console.log("Permiso para acceder");
  return true;
};
