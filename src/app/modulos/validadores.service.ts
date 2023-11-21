import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidadoresService {

    getNombreErrorValidador(error: string): Observable<String> {
        let nombre: string = '';
        switch (error) {
            case 'required': nombre = 'Obligatorio'; break;
            case 'maxlength': nombre = 'Máximo Inválido'; break;
            case 'minlength': nombre = 'Mínimo Inválido'; break;
            case 'email': nombre = 'Correo Inválido'; break;
            case 'pattern': nombre = 'Dato Inválido'; break;
            default: 'Dato Inválido'; break;
        };
        return of(nombre);
    }
}