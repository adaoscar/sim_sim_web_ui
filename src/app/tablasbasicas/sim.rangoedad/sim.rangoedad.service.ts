import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimRangoEdadModel } from './sim.rangoedad.model';

@Injectable({ providedIn: 'root' })
export class SimRangoEdadService {
    private simRangoEdadUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simRangoEdadUrl = `${environment.dataServiceUrl}/odata/SimRangoEdad`;
    }

    getById(simRangoEdadId: number): Observable<any> {
        const sUrl = `${this.simRangoEdadUrl}(SimRangoEdadId=${simRangoEdadId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimRangoEdad")),
            catchError((error) => this.handleError("getSimRangoEdad", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simRangoEdadUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimRangoEdad')),
            catchError((error) => this.handleError('getSimRangoEdadList', error))
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

        return this.http.get<any>(this.simRangoEdadUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimRangoEdad")),
            catchError((error) => this.handleError('getSimRangoEdadList', error))
        );
    }

    add(row: SimRangoEdadModel): Observable<SimRangoEdadModel> {
        return this.http.post<SimRangoEdadModel>(this.simRangoEdadUrl, SimRangoEdadModel.clone(row)).pipe(
            
            tap((_row: SimRangoEdadModel) => this.log(`added SimRangoEdad w/ id=${_row.SimRangoEdadId}`)),
            catchError((error) => this.handleError("addSimRangoEdad", error))
        );
    }

    update(row: SimRangoEdadModel, original: SimRangoEdadModel): Observable<SimRangoEdadModel> {
        const sUrl = `${this.simRangoEdadUrl}(SimRangoEdadId=${original.SimRangoEdadId})`;
    
        return this.http.patch<SimRangoEdadModel>(sUrl, SimRangoEdadModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimRangoEdad id=${row.SimRangoEdadId}`)),
            catchError((error) => this.handleError("updateSimRangoEdad", error))
        );
    }

    save(row: SimRangoEdadModel, original: SimRangoEdadModel): Observable<SimRangoEdadModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimRangoEdadModel): Observable<any> {
        const sUrl = `${this.simRangoEdadUrl}(SimRangoEdadId=${row.SimRangoEdadId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimRangoEdad id=${row.SimRangoEdadId}`)),
            catchError((error) => this.handleError("deleteSimRangoEdad", error))
        );
    }

    saveRows(rows: Array<SimRangoEdadModel>): Observable<any> {
        const _rows = rows.map((row) => SimRangoEdadModel.clone(row));
        return this.http.post<any>(this.simRangoEdadUrl, _rows).pipe(
            
            tap((rrows: SimRangoEdadModel) => this.log(`pasted rows in SimRangoEdad `)),
            catchError((error) => this.handleError("addSimRangoEdad", error))
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

    /** Log a SimRangoEdadService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimRangoEdadService: ${message}`);
        console.log(`SimRangoEdadService: ${message}`);
    }

}
