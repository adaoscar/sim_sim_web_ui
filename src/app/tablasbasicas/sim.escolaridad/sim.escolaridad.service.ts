import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimEscolaridadModel } from './sim.escolaridad.model';

@Injectable({ providedIn: 'root' })
export class SimEscolaridadService {
    private simEscolaridadUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simEscolaridadUrl = `${environment.dataServiceUrl}/odata/SimEscolaridad`;
    }

    getById(simEscolaridadId: number): Observable<any> {
        const sUrl = `${this.simEscolaridadUrl}(SimEscolaridadId=${simEscolaridadId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimEscolaridad")),
            catchError((error) => this.handleError("getSimEscolaridad", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simEscolaridadUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimEscolaridad')),
            catchError((error) => this.handleError('getSimEscolaridadList', error))
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

        return this.http.get<any>(this.simEscolaridadUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimEscolaridad")),
            catchError((error) => this.handleError('getSimEscolaridadList', error))
        );
    }

    add(row: SimEscolaridadModel): Observable<SimEscolaridadModel> {
        return this.http.post<SimEscolaridadModel>(this.simEscolaridadUrl, SimEscolaridadModel.clone(row)).pipe(
            
            tap((_row: SimEscolaridadModel) => this.log(`added SimEscolaridad w/ id=${_row.SimEscolaridadId}`)),
            catchError((error) => this.handleError("addSimEscolaridad", error))
        );
    }

    update(row: SimEscolaridadModel, original: SimEscolaridadModel): Observable<SimEscolaridadModel> {
        const sUrl = `${this.simEscolaridadUrl}(SimEscolaridadId=${original.SimEscolaridadId})`;
    
        return this.http.patch<SimEscolaridadModel>(sUrl, SimEscolaridadModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimEscolaridad id=${row.SimEscolaridadId}`)),
            catchError((error) => this.handleError("updateSimEscolaridad", error))
        );
    }

    save(row: SimEscolaridadModel, original: SimEscolaridadModel): Observable<SimEscolaridadModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimEscolaridadModel): Observable<any> {
        const sUrl = `${this.simEscolaridadUrl}(SimEscolaridadId=${row.SimEscolaridadId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimEscolaridad id=${row.SimEscolaridadId}`)),
            catchError((error) => this.handleError("deleteSimEscolaridad", error))
        );
    }

    saveRows(rows: Array<SimEscolaridadModel>): Observable<any> {
        const _rows = rows.map((row) => SimEscolaridadModel.clone(row));
        return this.http.post<any>(this.simEscolaridadUrl, _rows).pipe(
            
            tap((rrows: SimEscolaridadModel) => this.log(`pasted rows in SimEscolaridad `)),
            catchError((error) => this.handleError("addSimEscolaridad", error))
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

    /** Log a SimEscolaridadService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimEscolaridadService: ${message}`);
        console.log(`SimEscolaridadService: ${message}`);
    }

}
