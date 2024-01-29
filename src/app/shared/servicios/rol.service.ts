//Este servicio almacena el tipo de roll para luego compartirlo entre componentes
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor() { }

  private rolSource = new BehaviorSubject<number>(0);
  rol$ = this.rolSource.asObservable();

  setRol(rol:number){
    this.rolSource.next(rol);
  }
}
