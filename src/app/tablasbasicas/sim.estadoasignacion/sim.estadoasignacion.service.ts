import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimEstadoAsignacionModel } from './sim.estadoasignacion.model';

@Injectable({ providedIn: 'root' })
export class SimEstadoAsignacionService {
    private simEstadoAsignacionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simEstadoAsignacionUrl = `${environment.dataServiceUrl}/odata/SimEstadoAsignacion`;
    }

    getById(simEstadoAsignacionId: number): Observable<any> {
        const sUrl = `${this.simEstadoAsignacionUrl}(SimEstadoAsignacionId=${simEstadoAsignacionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimEstadoAsignacion")),
            catchError((error) => this.handleError("getSimEstadoAsignacion", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simEstadoAsignacionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimEstadoAsignacion')),
            catchError((error) => this.handleError('getSimEstadoAsignacionList', error))
        );
    }

    getList(filter: {
                value: any,
                condition: string,
                column: string,
                generate: any
            },
            paginator: MatPaginator,
            sort: MatSort): Observable<any> {

        const params: any = {};

        if (filter.column) {
            params["$filter"] = filter.generate(filter);
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";

        return this.http.get<any>(this.simEstadoAsignacionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimEstadoAsignacion")),
            catchError((error) => this.handleError('getSimEstadoAsignacionList', error))
        );
    }

    add(row: SimEstadoAsignacionModel): Observable<SimEstadoAsignacionModel> {
        return this.http.post<SimEstadoAsignacionModel>(this.simEstadoAsignacionUrl, SimEstadoAsignacionModel.clone(row)).pipe(
            
            tap((_row: SimEstadoAsignacionModel) => this.log(`added SimEstadoAsignacion w/ id=${_row.SimEstadoAsignacionId}`)),
            catchError((error) => this.handleError("addSimEstadoAsignacion", error))
        );
    }

    update(row: SimEstadoAsignacionModel, original: SimEstadoAsignacionModel): Observable<SimEstadoAsignacionModel> {
        const sUrl = `${this.simEstadoAsignacionUrl}(SimEstadoAsignacionId=${original.SimEstadoAsignacionId})`;
    
        return this.http.patch<SimEstadoAsignacionModel>(sUrl, SimEstadoAsignacionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimEstadoAsignacion id=${row.SimEstadoAsignacionId}`)),
            catchError((error) => this.handleError("updateSimEstadoAsignacion", error))
        );
    }

    save(row: SimEstadoAsignacionModel, original: SimEstadoAsignacionModel): Observable<SimEstadoAsignacionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimEstadoAsignacionModel): Observable<any> {
        const sUrl = `${this.simEstadoAsignacionUrl}(SimEstadoAsignacionId=${row.SimEstadoAsignacionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimEstadoAsignacion id=${row.SimEstadoAsignacionId}`)),
            catchError((error) => this.handleError("deleteSimEstadoAsignacion", error))
        );
    }

    saveRows(rows: Array<SimEstadoAsignacionModel>): Observable<any> {
        const _rows = rows.map((row) => SimEstadoAsignacionModel.clone(row));
        return this.http.post<any>(this.simEstadoAsignacionUrl, _rows).pipe(
            
            tap((rrows: SimEstadoAsignacionModel) => this.log(`pasted rows in SimEstadoAsignacion `)),
            catchError((error) => this.handleError("addSimEstadoAsignacion", error))
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

    /** Log a SimEstadoAsignacionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimEstadoAsignacionService: ${message}`);
        console.log(`SimEstadoAsignacionService: ${message}`);
    }

}
