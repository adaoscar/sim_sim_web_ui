import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimEstadoDocumentoModel } from './sim.estadodocumento.model';

@Injectable({ providedIn: 'root' })
export class SimEstadoDocumentoService {
    private simEstadoDocumentoUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simEstadoDocumentoUrl = `${environment.dataServiceUrl}/odata/SimEstadoDocumento`;
    }

    getById(simEstadoDocumentoId: number): Observable<any> {
        const sUrl = `${this.simEstadoDocumentoUrl}(SimEstadoDocumentoId=${simEstadoDocumentoId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimEstadoDocumento")),
            catchError((error) => this.handleError("getSimEstadoDocumento", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simEstadoDocumentoUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimEstadoDocumento')),
            catchError((error) => this.handleError('getSimEstadoDocumentoList', error))
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

        return this.http.get<any>(this.simEstadoDocumentoUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimEstadoDocumento")),
            catchError((error) => this.handleError('getSimEstadoDocumentoList', error))
        );
    }

    add(row: SimEstadoDocumentoModel): Observable<SimEstadoDocumentoModel> {
        return this.http.post<SimEstadoDocumentoModel>(this.simEstadoDocumentoUrl, SimEstadoDocumentoModel.clone(row)).pipe(
            
            tap((_row: SimEstadoDocumentoModel) => this.log(`added SimEstadoDocumento w/ id=${_row.SimEstadoDocumentoId}`)),
            catchError((error) => this.handleError("addSimEstadoDocumento", error))
        );
    }

    update(row: SimEstadoDocumentoModel, original: SimEstadoDocumentoModel): Observable<SimEstadoDocumentoModel> {
        const sUrl = `${this.simEstadoDocumentoUrl}(SimEstadoDocumentoId=${original.SimEstadoDocumentoId})`;
    
        return this.http.patch<SimEstadoDocumentoModel>(sUrl, SimEstadoDocumentoModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimEstadoDocumento id=${row.SimEstadoDocumentoId}`)),
            catchError((error) => this.handleError("updateSimEstadoDocumento", error))
        );
    }

    save(row: SimEstadoDocumentoModel, original: SimEstadoDocumentoModel): Observable<SimEstadoDocumentoModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimEstadoDocumentoModel): Observable<any> {
        const sUrl = `${this.simEstadoDocumentoUrl}(SimEstadoDocumentoId=${row.SimEstadoDocumentoId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimEstadoDocumento id=${row.SimEstadoDocumentoId}`)),
            catchError((error) => this.handleError("deleteSimEstadoDocumento", error))
        );
    }

    saveRows(rows: Array<SimEstadoDocumentoModel>): Observable<any> {
        const _rows = rows.map((row) => SimEstadoDocumentoModel.clone(row));
        return this.http.post<any>(this.simEstadoDocumentoUrl, _rows).pipe(
            
            tap((rrows: SimEstadoDocumentoModel) => this.log(`pasted rows in SimEstadoDocumento `)),
            catchError((error) => this.handleError("addSimEstadoDocumento", error))
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

    /** Log a SimEstadoDocumentoService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimEstadoDocumentoService: ${message}`);
        console.log(`SimEstadoDocumentoService: ${message}`);
    }

}
