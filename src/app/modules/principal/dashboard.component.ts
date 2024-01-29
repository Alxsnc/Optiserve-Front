import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mostrarNavLateral: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.recuperarEstadoNavLateral(); // Intenta recuperar el estado al iniciar

    // Subscribirse a eventos de cambio de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.actualizarMostrarNavLateral();
    });
  }

  private actualizarMostrarNavLateral(): void {
    const rutaActual = this.router.routerState.snapshot.url;
    this.mostrarNavLateral = rutaActual.includes('/publicacion') || rutaActual.includes('/ListaPublicaciones')
    || rutaActual.includes('/ListaPubCerradas')||(rutaActual.includes('/editarPublicacion')||(rutaActual.includes('gestionarPublicacion')));

    // Guardar el estado en el LocalStorage
    this.guardarEstadoNavLateral();
  }

  private guardarEstadoNavLateral(): void {
    localStorage.setItem('mostrarNavLateral', JSON.stringify(this.mostrarNavLateral));
  }

  private recuperarEstadoNavLateral(): void {
    const estadoGuardado = localStorage.getItem('mostrarNavLateral');
    this.mostrarNavLateral = estadoGuardado ? JSON.parse(estadoGuardado) : false;
  }
}
