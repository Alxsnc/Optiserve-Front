import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SesionComponent } from './layout/publico/sesion/sesion.component';
import { ContenidoComponent } from './layout/privado/contenido/contenido.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaPublicacionesComponent } from './modules/principal/pages/lista-publicaciones/lista-publicaciones.component';
import { ListaPubCerradasComponent } from './modules/principal/lista-pub-cerradas/lista-pub-cerradas.component';

@NgModule({
  declarations: [
    AppComponent,
    SesionComponent,
    ContenidoComponent,
    ListaPublicacionesComponent,
    ListaPubCerradasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
