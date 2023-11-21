import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, tap, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from './login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginUrl = '';  // URL to web api
  public actualUsuario: Observable<LoginModel>;
  private usuarioLogueadoSubjeto: BehaviorSubject<LoginModel>;
  public estaLogueado: boolean = false;

  public get ValorUsuarioLogueado(): LoginModel {
    return this.usuarioLogueadoSubjeto.value;
  }

  constructor(private http: HttpClient) {
    this.loginUrl = `${environment.dataServiceUrl}/odata/ApplicationUserLogin`;
    this.usuarioLogueadoSubjeto = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('actualUsuario')));
    this.actualUsuario = this.usuarioLogueadoSubjeto.asObservable();
  }

  login(usuario: string, contrasena: string): Observable<any> {
    this.estaLogueado = true;
    sessionStorage.setItem("estaLogueado", "true");
    return this.http.post<any>(this.loginUrl, { username: usuario, password: contrasena })
      .pipe(map(user => {
        localStorage.setItem('usuarioLogueado', JSON.stringify(user));
        this.usuarioLogueadoSubjeto.next(user);
        return user;
      }), 
      catchError((error) => this.handleError("login", error))
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    sessionStorage.setItem("estaLogueado", "false");
    this.usuarioLogueadoSubjeto.next(null);
  }

  recuperarClave(cedula: string): Observable<any> {
    let sUrl = `${environment.dataServiceUrl}/odata/Recuperar?cedula=${cedula}`;

    return this.http.get<any>(sUrl).pipe(
        tap((row: any) => this.log(`fetched LoginRecuperacionClave`)),
        catchError((error) => this.handleError('addLoginRecuperacionClave', error))
    );
  }

  private handleError(operation = "operation", result?: any) {

    console.error(result.message); // log to console instead

    this.log(`${operation} failed: ${result.message}`);
    return of(result);
  }

  private log(message: string) {
    console.log(`SiceqAmbitoService: ${message}`);

  }
}
