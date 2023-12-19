import { Injectable } from "@angular/core";
import { CanLoad, Route,Router,UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AutentificacionService } from "src/app/shared/servicios/autentificacion.service";

@Injectable({
  providedIn:'root'
})
export class PermisosCargarModulos implements CanLoad{

  constructor( private autenticacionPrd:AutentificacionService, private router:Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!Boolean(this.autenticacionPrd.habilitarlogeo())){
      return this.router.parseUrl('/sinsesion/login');
    }
    return Boolean(this.autenticacionPrd.habilitarlogeo());
  }

}
