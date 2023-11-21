import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LOGIN_CambioClaveModel } from './login.cambioclave.model';

@Injectable({ providedIn: 'root' })
export class LOGIN_CambioClave_Service {
    private LOGINCambioClaveUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.LOGINCambioClaveUrl = `${environment.dataServiceUrl}/odata/ApplicationUser/Default.ChangePassword`;
    }

    update(row: LOGIN_CambioClaveModel): Observable<LOGIN_CambioClaveModel> {
        return this.http.post<LOGIN_CambioClaveModel>(this.LOGINCambioClaveUrl, LOGIN_CambioClaveModel.clone(row)).pipe(
            tap(_ => this.log(`update LOGIN_CambioClave`)),
            catchError((error) => this.handleError('updateLOGIN_CambioClave', error))
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

    /** Log a LOGIN_CambioClaveService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`LOGIN_CambioClaveService: ${message}`);
        console.log(`LOGIN_CambioClaveService: ${message}`);
    }

}
