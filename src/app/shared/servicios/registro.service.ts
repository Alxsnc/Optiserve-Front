import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private urlRegister: string = ENV.apiHost + ENV.apiAuthUrl + '/singup';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: any) {
    return this.http.post<any>(this.urlRegister, usuario);
  }

  validarCedula(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cedula = control.value;

      if (!cedula) {
        return null;
      }

      if (!/^\d{10}$/.test(cedula)) {
        return { 'cedulaInvalida': true };
      }

      const digitoVerificador = parseInt(cedula.charAt(9));

      let suma = 0;
      for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedula.charAt(i));

        if (i % 2 === 0) {
          digito *= 2;
          if (digito > 9) {
            digito -= 9;
          }
        }

        suma += digito;
      }

      const resultado = 10 - (suma % 10);

      if ((resultado === 10 && digitoVerificador === 0) || resultado === digitoVerificador) {
        return null; // La cédula es válida
      } else {
        return { 'cedulaInvalida': true }; // La cédula es inválida
      }
    };
  }
}
