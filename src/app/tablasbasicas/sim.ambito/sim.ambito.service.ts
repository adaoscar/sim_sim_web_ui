import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimAmbitoModel } from './sim.ambito.model';

@Injectable({ providedIn: 'root' })
export class SimAmbitoService {
    private simAmbitoUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simAmbitoUrl = `${environment.dataServiceUrl}/odata/SimAmbito`;
    }

    getById(simAmbitoId: number): Observable<any> {
        const sUrl = `${this.simAmbitoUrl}(SimAmbitoId=${simAmbitoId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimAmbito")),
            catchError((error) => this.handleError("getSimAmbito", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simAmbitoUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimAmbito')),
            catchError((error) => this.handleError('getSimAmbitoList', error))
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

        return this.http.get<any>(this.simAmbitoUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimAmbito")),
            catchError((error) => this.handleError('getSimAmbitoList', error))
        );
    }

    add(row: SimAmbitoModel): Observable<SimAmbitoModel> {
        return this.http.post<SimAmbitoModel>(this.simAmbitoUrl, SimAmbitoModel.clone(row)).pipe(
            
            tap((_row: SimAmbitoModel) => this.log(`added SimAmbito w/ id=${_row.SimAmbitoId}`)),
            catchError((error) => this.handleError("addSimAmbito", error))
        );
    }

    update(row: SimAmbitoModel, original: SimAmbitoModel): Observable<SimAmbitoModel> {
        const sUrl = `${this.simAmbitoUrl}(SimAmbitoId=${original.SimAmbitoId})`;
    
        return this.http.patch<SimAmbitoModel>(sUrl, SimAmbitoModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimAmbito id=${row.SimAmbitoId}`)),
            catchError((error) => this.handleError("updateSimAmbito", error))
        );
    }

    save(row: SimAmbitoModel, original: SimAmbitoModel): Observable<SimAmbitoModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimAmbitoModel): Observable<any> {
        const sUrl = `${this.simAmbitoUrl}(SimAmbitoId=${row.SimAmbitoId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimAmbito id=${row.SimAmbitoId}`)),
            catchError((error) => this.handleError("deleteSimAmbito", error))
        );
    }

    saveRows(rows: Array<SimAmbitoModel>): Observable<any> {
        const _rows = rows.map((row) => SimAmbitoModel.clone(row));
        return this.http.post<any>(this.simAmbitoUrl, _rows).pipe(
            
            tap((rrows: SimAmbitoModel) => this.log(`pasted rows in SimAmbito `)),
            catchError((error) => this.handleError("addSimAmbito", error))
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

    /** Log a SimAmbitoService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimAmbitoService: ${message}`);
        console.log(`SimAmbitoService: ${message}`);
    }

}
