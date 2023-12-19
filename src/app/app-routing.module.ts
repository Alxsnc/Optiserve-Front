import { CanLoad } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { SesionComponent } from './layout/publico/sesion/sesion.component';
import { ContenidoComponent } from './layout/privado/contenido/contenido.component';
import { PermisosRutasService } from './core/permisosRutas/permisos-rutas.service';
import { PermisosCargarModulos } from './core/permisosRutas/permisosCargarModulos';

const routes: Routes = [{
  path:'sinsesion', component:SesionComponent,loadChildren:()=>import('./modules/login/login.module').then(m=>m.loginModule)
},
{
  path:'sesion', component:ContenidoComponent,canActivate:[PermisosRutasService],canLoad:[PermisosCargarModulos],loadChildren:()=>import('./modules/principal/principal.module').then(m=>m.principalModule)
},
{
  path:"**", redirectTo:'sinsesion/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
