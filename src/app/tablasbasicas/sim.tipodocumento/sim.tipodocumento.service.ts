import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimTipoDocumentoModel } from './sim.tipodocumento.model';

@Injectable({ providedIn: 'root' })
export class SimTipoDocumentoService {
    private simTipoDocumentoUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simTipoDocumentoUrl = `${environment.dataServiceUrl}/odata/SimTipoDocumento`;
    }

    getById(simTipoDocumentoId: number): Observable<any> {
        const sUrl = `${this.simTipoDocumentoUrl}(SimTipoDocumentoId=${simTipoDocumentoId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimTipoDocumento")),
            catchError((error) => this.handleError("getSimTipoDocumento", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simTipoDocumentoUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimTipoDocumento')),
            catchError((error) => this.handleError('getSimTipoDocumentoList', error))
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

        return this.http.get<any>(this.simTipoDocumentoUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimTipoDocumento")),
            catchError((error) => this.handleError('getSimTipoDocumentoList', error))
        );
    }

    add(row: SimTipoDocumentoModel): Observable<SimTipoDocumentoModel> {
        return this.http.post<SimTipoDocumentoModel>(this.simTipoDocumentoUrl, SimTipoDocumentoModel.clone(row)).pipe(
            
            tap((_row: SimTipoDocumentoModel) => this.log(`added SimTipoDocumento w/ id=${_row.SimTipoDocumentoId}`)),
            catchError((error) => this.handleError("addSimTipoDocumento", error))
        );
    }

    update(row: SimTipoDocumentoModel, original: SimTipoDocumentoModel): Observable<SimTipoDocumentoModel> {
        const sUrl = `${this.simTipoDocumentoUrl}(SimTipoDocumentoId=${original.SimTipoDocumentoId})`;
    
        return this.http.patch<SimTipoDocumentoModel>(sUrl, SimTipoDocumentoModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimTipoDocumento id=${row.SimTipoDocumentoId}`)),
            catchError((error) => this.handleError("updateSimTipoDocumento", error))
        );
    }

    save(row: SimTipoDocumentoModel, original: SimTipoDocumentoModel): Observable<SimTipoDocumentoModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimTipoDocumentoModel): Observable<any> {
        const sUrl = `${this.simTipoDocumentoUrl}(SimTipoDocumentoId=${row.SimTipoDocumentoId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimTipoDocumento id=${row.SimTipoDocumentoId}`)),
            catchError((error) => this.handleError("deleteSimTipoDocumento", error))
        );
    }

    saveRows(rows: Array<SimTipoDocumentoModel>): Observable<any> {
        const _rows = rows.map((row) => SimTipoDocumentoModel.clone(row));
        return this.http.post<any>(this.simTipoDocumentoUrl, _rows).pipe(
            
            tap((rrows: SimTipoDocumentoModel) => this.log(`pasted rows in SimTipoDocumento `)),
            catchError((error) => this.handleError("addSimTipoDocumento", error))
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

    /** Log a SimTipoDocumentoService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimTipoDocumentoService: ${message}`);
        console.log(`SimTipoDocumentoService: ${message}`);
    }

}
