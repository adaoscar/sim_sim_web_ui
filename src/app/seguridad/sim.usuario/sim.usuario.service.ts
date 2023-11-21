import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';
import { SimUsuarioModel } from './sim.usuario.model';

@Injectable({ providedIn: 'root' })
export class SimUsuarioService {
    private simUsuarioUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simUsuarioUrl = `${environment.dataServiceUrl}/OData/ApplicationUser`;
    }

    getById(simUsuarioId: number): Observable<any> {
        const sUrl = `${this.simUsuarioUrl}(SimUsuarioId=${simUsuarioId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimUsuario")),
            catchError((error) => this.handleError("getSimUsuario", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        params["$expand"] = "SimTipoDocumento";

        return this.http.get<any>(this.simUsuarioUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimUsuario')),
            catchError((error) => this.handleError('getSimUsuarioList', error))
        );
    }

    getList(filter: string,
            paginator: MatPaginator,
            sort: MatSort,
            aplicativo: string): Observable<any> {

        const params: any = {};

        if (filter) {
            params["$filter"] = filter;
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";
        params["$expand"] = "SimTipoDocumento, Roles($expand=Role)"

        if (aplicativo !== '') {
            params["$filter"] = `Roles/any(x: x/Role/SimAplicacionId eq ${aplicativo})`;
        }

        return this.http.get<any>(this.simUsuarioUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimUsuario")),
            catchError((error) => this.handleError('getSimUsuarioList', error))
        );
    }

    add(row: any): Observable<any> {
        return this.http.post<any>(this.simUsuarioUrl, SimUsuarioModel.cloneAdd(row)).pipe(
            
            tap((_row: any) => this.log(`added SimUsuario w/ id=${_row.SimUsuarioId}`)),
            catchError((error) => this.handleError("addSimUsuario", error))
        );
    }

    update(row: any, original: any, tipo: number): Observable<any> {
        const sUrl = `${this.simUsuarioUrl}('${original.SimUsuarioId}')`;
    
        return this.http.put<any>(sUrl, SimUsuarioModel.cloneUpdate(row, tipo)).pipe(
            
            tap(_ => this.log(`update SimUsuario id=${row.SimUsuarioId}`)),
            catchError((error) => this.handleError("updateSimUsuario", error))
        );
    }

    save(row: any, original: any, tipo: number): Observable<any> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original, tipo);
        };
    }

    delete(row: any): Observable<any> {
        const sUrl = `${this.simUsuarioUrl}('${row.Id}')`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimUsuario id=${row.SimUsuarioId}`)),
            catchError((error) => this.handleError("deleteSimUsuario", error))
        );
    }

    filterSimTipoDocumentoNombre(val: string, pageSize: number = 10): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SimTipoDocumento`;

        let params: any = { };
        params["$filter"] = `contains(SimTipoDocumentoNombre,'${val}')`;
        params["$top"] = pageSize;

        return this.http.get<any>(sUrl, {params: params}).pipe(
            
            tap(_ => this.log(`filter SimTipoDocumentoNombre id=${val}`)),
            catchError((error) => this.handleError("filterSimTipoDocumentoNombre", error))
        );

    }

    getByIdSimTipoDocumentoNombre(simTipoDocumentoId: number): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SimTipoDocumento(SimTipoDocumentoId=${simTipoDocumentoId})`;

        return this.http.get<any>(sUrl, { }).pipe(
            
            tap(_ => this.log(`getById SimTipoDocumentoNombre SimTipoDocumentoId=${simTipoDocumentoId}`)),
            catchError((error) => this.handleError("getByIdSimTipoDocumentoNombre", error))
        );
    }

    getAllSimAplicacion(): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SimAplicacion`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(_ => this.log(`getAll SimAplicacion`)),
            catchError((error) => this.handleError("getAllSimAplicacion", error))
        );
    }
    
    getAllSimRoles(): Observable<any> {
        const sUrl = `${environment.dataServiceUrl}/odata/ApplicationRole`;

        const params: any = {};
        params["$orderby"] = `SimAplicacionId,Name asc`;
        params["$expand"] = "SimAplicacion";        

        return this.http.get<any>(sUrl, { params }).pipe(
            
            tap(() => this.log("fetched SimRoles")),
            catchError((error) => this.handleError("getSimRoles", error))
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

    /** Log a SimUsuarioService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimUsuarioService: ${message}`);
        console.log(`SimUsuarioService: ${message}`);
    }

}
