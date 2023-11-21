import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimPeriodoDiasModel } from './sim.periododias.model';

@Injectable({ providedIn: 'root' })
export class SimPeriodoDiasService {
    private simPeriodoDiasUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simPeriodoDiasUrl = `${environment.dataServiceUrl}/odata/SimPeriodoDias`;
    }

    getById(simPeriodoDiasId: number): Observable<any> {
        const sUrl = `${this.simPeriodoDiasUrl}(SimPeriodoDiasId=${simPeriodoDiasId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimPeriodoDias")),
            catchError((error) => this.handleError("getSimPeriodoDias", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simPeriodoDiasUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimPeriodoDias')),
            catchError((error) => this.handleError('getSimPeriodoDiasList', error))
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

        return this.http.get<any>(this.simPeriodoDiasUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimPeriodoDias")),
            catchError((error) => this.handleError('getSimPeriodoDiasList', error))
        );
    }

    add(row: SimPeriodoDiasModel): Observable<SimPeriodoDiasModel> {
        return this.http.post<SimPeriodoDiasModel>(this.simPeriodoDiasUrl, SimPeriodoDiasModel.clone(row)).pipe(
            
            tap((_row: SimPeriodoDiasModel) => this.log(`added SimPeriodoDias w/ id=${_row.SimPeriodoDiasId}`)),
            catchError((error) => this.handleError("addSimPeriodoDias", error))
        );
    }

    update(row: SimPeriodoDiasModel, original: SimPeriodoDiasModel): Observable<SimPeriodoDiasModel> {
        const sUrl = `${this.simPeriodoDiasUrl}(SimPeriodoDiasId=${original.SimPeriodoDiasId})`;
    
        return this.http.patch<SimPeriodoDiasModel>(sUrl, SimPeriodoDiasModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimPeriodoDias id=${row.SimPeriodoDiasId}`)),
            catchError((error) => this.handleError("updateSimPeriodoDias", error))
        );
    }

    save(row: SimPeriodoDiasModel, original: SimPeriodoDiasModel): Observable<SimPeriodoDiasModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimPeriodoDiasModel): Observable<any> {
        const sUrl = `${this.simPeriodoDiasUrl}(SimPeriodoDiasId=${row.SimPeriodoDiasId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimPeriodoDias id=${row.SimPeriodoDiasId}`)),
            catchError((error) => this.handleError("deleteSimPeriodoDias", error))
        );
    }

    saveRows(rows: Array<SimPeriodoDiasModel>): Observable<any> {
        const _rows = rows.map((row) => SimPeriodoDiasModel.clone(row));
        return this.http.post<any>(this.simPeriodoDiasUrl, _rows).pipe(
            
            tap((rrows: SimPeriodoDiasModel) => this.log(`pasted rows in SimPeriodoDias `)),
            catchError((error) => this.handleError("addSimPeriodoDias", error))
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

    /** Log a SimPeriodoDiasService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimPeriodoDiasService: ${message}`);
        console.log(`SimPeriodoDiasService: ${message}`);
    }

}
