import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimDecisionTramiteModel } from './sim.decisiontramite.model';

@Injectable({ providedIn: 'root' })
export class SimDecisionTramiteService {
    private simDecisionTramiteUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simDecisionTramiteUrl = `${environment.dataServiceUrl}/odata/SimDecisionTramite`;
    }

    getById(simDecisionTramiteId: number): Observable<any> {
        const sUrl = `${this.simDecisionTramiteUrl}(SimDecisionTramiteId=${simDecisionTramiteId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimDecisionTramite")),
            catchError((error) => this.handleError("getSimDecisionTramite", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simDecisionTramiteUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimDecisionTramite')),
            catchError((error) => this.handleError('getSimDecisionTramiteList', error))
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

        return this.http.get<any>(this.simDecisionTramiteUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimDecisionTramite")),
            catchError((error) => this.handleError('getSimDecisionTramiteList', error))
        );
    }

    add(row: SimDecisionTramiteModel): Observable<SimDecisionTramiteModel> {
        return this.http.post<SimDecisionTramiteModel>(this.simDecisionTramiteUrl, SimDecisionTramiteModel.clone(row)).pipe(
            
            tap((_row: SimDecisionTramiteModel) => this.log(`added SimDecisionTramite w/ id=${_row.SimDecisionTramiteId}`)),
            catchError((error) => this.handleError("addSimDecisionTramite", error))
        );
    }

    update(row: SimDecisionTramiteModel, original: SimDecisionTramiteModel): Observable<SimDecisionTramiteModel> {
        const sUrl = `${this.simDecisionTramiteUrl}(SimDecisionTramiteId=${original.SimDecisionTramiteId})`;
    
        return this.http.patch<SimDecisionTramiteModel>(sUrl, SimDecisionTramiteModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimDecisionTramite id=${row.SimDecisionTramiteId}`)),
            catchError((error) => this.handleError("updateSimDecisionTramite", error))
        );
    }

    save(row: SimDecisionTramiteModel, original: SimDecisionTramiteModel): Observable<SimDecisionTramiteModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimDecisionTramiteModel): Observable<any> {
        const sUrl = `${this.simDecisionTramiteUrl}(SimDecisionTramiteId=${row.SimDecisionTramiteId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimDecisionTramite id=${row.SimDecisionTramiteId}`)),
            catchError((error) => this.handleError("deleteSimDecisionTramite", error))
        );
    }

    saveRows(rows: Array<SimDecisionTramiteModel>): Observable<any> {
        const _rows = rows.map((row) => SimDecisionTramiteModel.clone(row));
        return this.http.post<any>(this.simDecisionTramiteUrl, _rows).pipe(
            
            tap((rrows: SimDecisionTramiteModel) => this.log(`pasted rows in SimDecisionTramite `)),
            catchError((error) => this.handleError("addSimDecisionTramite", error))
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

    /** Log a SimDecisionTramiteService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimDecisionTramiteService: ${message}`);
        console.log(`SimDecisionTramiteService: ${message}`);
    }

}
