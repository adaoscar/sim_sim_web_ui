import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SimRolModel } from './sim.rol.model';

@Injectable({ providedIn: 'root' })
export class SimRolService {
    private simRolesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simRolesUrl = `${environment.dataServiceUrl}/odata/ApplicationRole`;
    }

    // Servicios Roles

    getAllRoles(): Observable<any> {
        const params: any = {};
        params["$expand"] = "SimAplicacion, Funcionalidades($expand=Claim)";

        return this.http.get<any>(`${this.simRolesUrl}?$orderby=SimAplicacionId,Name asc`, { params }).pipe(
            tap(row => this.log('getRoles')),
            catchError((error) => this.handleError('getRoles', error))
        );
    }

    saveRol(row: SimRolModel): Observable<SimRolModel> {
        if (row._estado === "N") {
            return this.addRol(row);
        } else {
            return this.updateRol(row);
        };
    }

    addRol(row: SimRolModel): Observable<SimRolModel> {
        return this.http.post<SimRolModel>(this.simRolesUrl, SimRolModel.clone(row)).pipe(
            tap((rrow: SimRolModel) => this.log(`added Rol`)),
            catchError((error) => this.handleError('addRol', error))
        );
    }

    updateRol(row: SimRolModel): Observable<SimRolModel> {
        const sUrl = `${this.simRolesUrl}('${row.Id}')`;

        return this.http.put<SimRolModel>(sUrl, SimRolModel.clone(row)).pipe(
            tap((rrow: SimRolModel) => this.log(`update Rol`)),
            catchError((error) => this.handleError('updateRol', error))
        );
    }

    deleteRol(row: SimRolModel): Observable<SimRolModel> {
        const sUrl = `${this.simRolesUrl}('${row.Id}')`;

        return this.http.delete(sUrl).pipe(
            tap(_ => this.log(`delete rolId=/${row.Id}`)),
            catchError((error) => this.handleError('deleteRol', error))
        );
    }

    // Aplicaciones

    getAplicaciones(): Observable<any> {
        const sUrl = `${environment.dataServiceUrl}/odata/SimAplicacion`;

        return this.http.get(sUrl).pipe(
            tap(_ => this.log(`getAplicaciones`)),
            catchError((error) => this.handleError('getAplicaciones', error))
        );
    }

    // Funcionalidades

    getFuncionalidadesByAplicacion(idAplicacion: number): Observable<any> {
        const sUrl = `${environment.dataServiceUrl}/odata/SimModulos`;
        const params: any = {};

        params["$filter"] = `SimAplicacionId eq ${idAplicacion}`;
        params["$expand"] = "SimAplicacion, Funcionalidades";

        return this.http.get(sUrl, { params }).pipe(
            tap(_ => this.log(`filter funcionalidadesAplicacion`)),
            catchError((error) => this.handleError('filterFuncionalidadesAplicacion', error))
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

    /** Log a RolService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`RolService: ${message}`);
        console.log(`RolService: ${message}`);
    }
}