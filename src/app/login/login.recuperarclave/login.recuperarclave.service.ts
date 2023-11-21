import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RecuperarClaveModel } from './login.recuperarclave.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LOGIN_RecuperarClave_Service {
    
    private recuperarClaveUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.recuperarClaveUrl = `${environment.dataServiceUrl}/odata/ActualizarRecuperar`;
    }

    recuperarClave(row: RecuperarClaveModel): Observable<any> {
        let data = {
            token: row.token,
            password: row.newPassword,
            cedula: row.cedula
        };

        return this.http.post<any>(this.recuperarClaveUrl, data).pipe(
            tap(_ => this.log(`update RecuperacionClave`)),
            catchError((error) => this.handleError('updateRecuperacionClave', error))
        );
    }

    private handleError(operation = 'operation', result?: any) {

        // TODO: send the error to remote logging infrastructure
        console.error(result.error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${result.message}`);

        // Let the app keep running by returning an empty result.
        return of(result);
  }

  /** Log a LOGIN_RecuperarClaveService message with the MessageService */
  private log(message: string) {
      // this.messageService.add(`LOGIN_RecuperarClaveService: ${message}`);
      console.log(`LOGIN_RecuperarClaveService: ${message}`);
  }

}
