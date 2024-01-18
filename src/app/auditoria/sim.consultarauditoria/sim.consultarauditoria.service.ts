import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class SimConsultarAuditoriaService {

    private simConsultarAuditoriaUrl = '';  // URL to web api

    

    constructor(private http: HttpClient) {
        this.simConsultarAuditoriaUrl = `${environment.dataServiceUrl}/odata/SimConsultarAuditoria`;
    }

    getById(simConsultarAuditoriaId: number): Observable<any> {
        const sUrl = `${this.simConsultarAuditoriaUrl}(SimConsultarAuditoriaId=${simConsultarAuditoriaId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimConsultarAuditoria")),
            catchError((error) => this.handleError("getSimConsultarAuditoria", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};

        return this.http.get<any>(this.simConsultarAuditoriaUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimConsultarAuditoria')),
            catchError((error) => this.handleError('getSimConsultarAuditoriaList', error))
        );
    }

    getList(_filter: string,
            filter: {
                value: any,
                condition: string,
                column: string,
                generate: any
            },
            paginator: MatPaginator,
            sort: MatSort): Observable<any> {

        const params: any = {};
        
        if (filter.column) {
            params["$filter"] = `${_filter} and ${filter.generate(filter)}`;
        } else {
            params["$filter"] = _filter;
        };

        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        };

        params["$top"] = paginator.pageSize;

        if (sort.active) {
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        };

        params["$count"] = "true";

        params["$expand"] = "Usuario"

        return this.http.get<any>(this.simConsultarAuditoriaUrl, { params }).pipe(
            
            tap(row => this.log("fetched SimConsultarAuditoria")),
            catchError((error) => this.handleError('getSimConsultarAuditoriaList', error))
        );
    }

    onDeleteAuditoria(fechaInicial: string, fechaFinal: string, aplicacion: string,): Observable<any> {
        const sUrl = `${environment.dataServiceUrl}/odata/EliminarAuditoria?FechaInicio=${fechaInicial}&FechaFin=${fechaFinal}&Aplicacion=${aplicacion}`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("deleteAuditoria")),
            catchError((error) => this.handleError("deleteAuditoria", error))
        );
    }

    onExportAuditoria(fechaInicial: string, fechaFinal: string, aplicacion: string,): Observable<any> {
        const sUrl = `${environment.dataServiceUrl}/odata/ExportarAuditoria?FechaInicio=${fechaInicial}&FechaFin=${fechaFinal}&Aplicacion=${aplicacion}`;

        return this.http.get(sUrl, { responseType: "blob" }).pipe(
            map((result: any) => { return result; }),
            tap(() => this.log("exportarAuditoria")),
            catchError((error) => this.handleError("exportarAuditoria", error))
        );
    }

    // Autocompletes

    filterSimAuditoriaAplicacion(val: string, pageSize: number = 10): Observable<any> {
        let params: any = { };

        params["$top"] = pageSize;
        params['$apply'] = `groupby((SimConsultarAuditoriaAplicacion))`;
        params['$filter'] = `contains(SimConsultarAuditoriaAplicacion, '${val}')`;

        return this.http.get<any>(this.simConsultarAuditoriaUrl, {params}).pipe(
            tap(_ => this.log(`filter SimConsultarAuditoriaAplicacion id=${val}`)),
            catchError((error) => this.handleError("filterSimConsultarAuditoriaAplicacion", error))
        );
    }

    filterSimAuditoriaModulo(val: string, aplicacion: string, pageSize: number = 10): Observable<any> {
        let params: any = { };

        params["$top"] = pageSize;
        params['$apply'] = `filter(SimConsultarAuditoriaAplicacion eq '${aplicacion}')/groupby((SimConsultarAuditoriaModulo))`;
        params['$filter'] = `contains(SimConsultarAuditoriaModulo, '${val}')`;

        return this.http.get<any>(this.simConsultarAuditoriaUrl, {params}).pipe(
            tap(_ => this.log(`filter SimConsultarAuditoriaModulo id=${val}`)),
            catchError((error) => this.handleError("filterSimConsultarAuditoriaModulo", error))
        );
    }

    filterSimAuditoriaFuncionalidad(val: string, aplicacion: string, modulo: string, pageSize: number = 10): Observable<any> {
        let params: any = { };

        params["$top"] = pageSize;
        params['$apply'] = `filter(SimConsultarAuditoriaAplicacion eq '${aplicacion}' and SimConsultarAuditoriaModulo eq '${modulo}')/groupby((SimConsultarAuditoriaFuncionalidad))`;
        params['$filter'] = `contains(SimConsultarAuditoriaFuncionalidad, '${val}')`;

        return this.http.get<any>(this.simConsultarAuditoriaUrl, {params}).pipe(
            tap(_ => this.log(`filter SimConsultarAuditoriaFuncionalidad id=${val}`)),
            catchError((error) => this.handleError("filterSimConsultarAuditoriaFuncionalidad", error))
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

    /** Log a SimConsultarAuditoriaService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimConsultarAuditoriaService: ${message}`);
        console.log(`SimConsultarAuditoriaService: ${message}`);
    }

}
