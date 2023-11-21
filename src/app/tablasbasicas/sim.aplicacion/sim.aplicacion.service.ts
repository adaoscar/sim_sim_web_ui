import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimAplicacionModel } from './sim.aplicacion.model';

@Injectable({ providedIn: 'root' })
export class SimAplicacionService {
    private simAplicacionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simAplicacionUrl = `${environment.dataServiceUrl}/odata/SimAplicacion`;
    }

    getById(simAplicacionId: number): Observable<any> {
        const sUrl = `${this.simAplicacionUrl}(SimAplicacionId=${simAplicacionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimAplicacion")),
            catchError((error) => this.handleError("getSimAplicacion", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simAplicacionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimAplicacion')),
            catchError((error) => this.handleError('getSimAplicacionList', error))
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

        return this.http.get<any>(this.simAplicacionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimAplicacion")),
            catchError((error) => this.handleError('getSimAplicacionList', error))
        );
    }

    add(row: SimAplicacionModel): Observable<SimAplicacionModel> {
        return this.http.post<SimAplicacionModel>(this.simAplicacionUrl, SimAplicacionModel.clone(row)).pipe(
            
            tap((_row: SimAplicacionModel) => this.log(`added SimAplicacion w/ id=${_row.SimAplicacionId}`)),
            catchError((error) => this.handleError("addSimAplicacion", error))
        );
    }

    update(row: SimAplicacionModel, original: SimAplicacionModel): Observable<SimAplicacionModel> {
        const sUrl = `${this.simAplicacionUrl}(SimAplicacionId=${original.SimAplicacionId})`;
    
        return this.http.patch<SimAplicacionModel>(sUrl, SimAplicacionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimAplicacion id=${row.SimAplicacionId}`)),
            catchError((error) => this.handleError("updateSimAplicacion", error))
        );
    }

    save(row: SimAplicacionModel, original: SimAplicacionModel): Observable<SimAplicacionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimAplicacionModel): Observable<any> {
        const sUrl = `${this.simAplicacionUrl}(SimAplicacionId=${row.SimAplicacionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimAplicacion id=${row.SimAplicacionId}`)),
            catchError((error) => this.handleError("deleteSimAplicacion", error))
        );
    }

    saveRows(rows: Array<SimAplicacionModel>): Observable<any> {
        const _rows = rows.map((row) => SimAplicacionModel.clone(row));
        return this.http.post<any>(this.simAplicacionUrl, _rows).pipe(
            
            tap((rrows: SimAplicacionModel) => this.log(`pasted rows in SimAplicacion `)),
            catchError((error) => this.handleError("addSimAplicacion", error))
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

    /** Log a SimAplicacionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimAplicacionService: ${message}`);
        console.log(`SimAplicacionService: ${message}`);
    }

}
