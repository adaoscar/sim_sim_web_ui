import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JwtDecodeTokenService {

    constructor(private http: HttpClient) {}

    getUsuario(): Observable<any> {
        let _usuario;
        try {
          let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
          let data = jwt_decode(currentUser.token);
          _usuario = {
            id: data.id,
            given_name: data.given_name,
            mail: data.mail,
            roles: data.roles
          };
        } catch (error) {
          _usuario = {};
        };
        return of(_usuario);
    }

    getPermisos(): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/ObtenerPermisos`;
        
        return this.http.get<any>(sUrl).pipe(
          tap(() => this.log("fetched SimPermisos")),
          map(data => {
            let _permisos = data.filter(reg => reg.nombre === environment.aplicativo);
            return _permisos || '';
          }),
          catchError((error) => this.handleError("getSimPermisos", error))
        );
    }

    private handleError(operation = "operation", result?: any) {

        // TODO: send the error to remote logging infrastructure
        console.error(result.message); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${result.message}`);

        // Let the app keep running by returning an empty result.
        return of(result);
    }

    /** Log a JwtDecodeTokenService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`JwtDecodeTokenService: ${message}`);
        console.log(`JwtDecodeTokenService: ${message}`);
    }
    
}