import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';

@Injectable({
  providedIn: 'root'
})

//sirve para proteger las rutas para que no entren personas no verificadas
export class PermisosRutasService implements CanActivate {

  constructor(private router:Router,private autenticacionPrd:AutentificacionService) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(!Boolean(this.autenticacionPrd.habilitarlogeo())){
      return this.router.parseUrl('/sinsesion/login');
    }
    return Boolean(this.autenticacionPrd.habilitarlogeo());
  }
}
