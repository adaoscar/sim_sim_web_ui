import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimMotivosFinalizacionTramiteModel } from './sim.motivosfinalizaciontramite.model';

@Injectable({ providedIn: 'root' })
export class SimMotivosFinalizacionTramiteService {
    private simMotivosFinalizacionTramiteUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simMotivosFinalizacionTramiteUrl = `${environment.dataServiceUrl}/odata/SimMotivosFinalizacionTramite`;
    }

    getById(simMotivosFinalizacionTramiteId: number): Observable<any> {
        const sUrl = `${this.simMotivosFinalizacionTramiteUrl}(SimMotivosFinalizacionTramiteId=${simMotivosFinalizacionTramiteId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimMotivosFinalizacionTramite")),
            catchError((error) => this.handleError("getSimMotivosFinalizacionTramite", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simMotivosFinalizacionTramiteUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimMotivosFinalizacionTramite')),
            catchError((error) => this.handleError('getSimMotivosFinalizacionTramiteList', error))
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

        return this.http.get<any>(this.simMotivosFinalizacionTramiteUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimMotivosFinalizacionTramite")),
            catchError((error) => this.handleError('getSimMotivosFinalizacionTramiteList', error))
        );
    }

    add(row: SimMotivosFinalizacionTramiteModel): Observable<SimMotivosFinalizacionTramiteModel> {
        return this.http.post<SimMotivosFinalizacionTramiteModel>(this.simMotivosFinalizacionTramiteUrl, SimMotivosFinalizacionTramiteModel.clone(row)).pipe(
            
            tap((_row: SimMotivosFinalizacionTramiteModel) => this.log(`added SimMotivosFinalizacionTramite w/ id=${_row.SimMotivosFinalizacionTramiteId}`)),
            catchError((error) => this.handleError("addSimMotivosFinalizacionTramite", error))
        );
    }

    update(row: SimMotivosFinalizacionTramiteModel, original: SimMotivosFinalizacionTramiteModel): Observable<SimMotivosFinalizacionTramiteModel> {
        const sUrl = `${this.simMotivosFinalizacionTramiteUrl}(SimMotivosFinalizacionTramiteId=${original.SimMotivosFinalizacionTramiteId})`;
    
        return this.http.patch<SimMotivosFinalizacionTramiteModel>(sUrl, SimMotivosFinalizacionTramiteModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimMotivosFinalizacionTramite id=${row.SimMotivosFinalizacionTramiteId}`)),
            catchError((error) => this.handleError("updateSimMotivosFinalizacionTramite", error))
        );
    }

    save(row: SimMotivosFinalizacionTramiteModel, original: SimMotivosFinalizacionTramiteModel): Observable<SimMotivosFinalizacionTramiteModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimMotivosFinalizacionTramiteModel): Observable<any> {
        const sUrl = `${this.simMotivosFinalizacionTramiteUrl}(SimMotivosFinalizacionTramiteId=${row.SimMotivosFinalizacionTramiteId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimMotivosFinalizacionTramite id=${row.SimMotivosFinalizacionTramiteId}`)),
            catchError((error) => this.handleError("deleteSimMotivosFinalizacionTramite", error))
        );
    }

    saveRows(rows: Array<SimMotivosFinalizacionTramiteModel>): Observable<any> {
        const _rows = rows.map((row) => SimMotivosFinalizacionTramiteModel.clone(row));
        return this.http.post<any>(this.simMotivosFinalizacionTramiteUrl, _rows).pipe(
            
            tap((rrows: SimMotivosFinalizacionTramiteModel) => this.log(`pasted rows in SimMotivosFinalizacionTramite `)),
            catchError((error) => this.handleError("addSimMotivosFinalizacionTramite", error))
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

    /** Log a SimMotivosFinalizacionTramiteService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimMotivosFinalizacionTramiteService: ${message}`);
        console.log(`SimMotivosFinalizacionTramiteService: ${message}`);
    }

}
