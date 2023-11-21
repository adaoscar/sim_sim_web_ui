import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimOcupacionModel } from './sim.ocupacion.model';

@Injectable({ providedIn: 'root' })
export class SimOcupacionService {
    private simOcupacionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simOcupacionUrl = `${environment.dataServiceUrl}/odata/SimOcupacion`;
    }

    getById(simOcupacionId: number): Observable<any> {
        const sUrl = `${this.simOcupacionUrl}(SimOcupacionId=${simOcupacionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimOcupacion")),
            catchError((error) => this.handleError("getSimOcupacion", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simOcupacionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimOcupacion')),
            catchError((error) => this.handleError('getSimOcupacionList', error))
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

        return this.http.get<any>(this.simOcupacionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimOcupacion")),
            catchError((error) => this.handleError('getSimOcupacionList', error))
        );
    }

    add(row: SimOcupacionModel): Observable<SimOcupacionModel> {
        return this.http.post<SimOcupacionModel>(this.simOcupacionUrl, SimOcupacionModel.clone(row)).pipe(
            
            tap((_row: SimOcupacionModel) => this.log(`added SimOcupacion w/ id=${_row.SimOcupacionId}`)),
            catchError((error) => this.handleError("addSimOcupacion", error))
        );
    }

    update(row: SimOcupacionModel, original: SimOcupacionModel): Observable<SimOcupacionModel> {
        const sUrl = `${this.simOcupacionUrl}(SimOcupacionId=${original.SimOcupacionId})`;
    
        return this.http.patch<SimOcupacionModel>(sUrl, SimOcupacionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimOcupacion id=${row.SimOcupacionId}`)),
            catchError((error) => this.handleError("updateSimOcupacion", error))
        );
    }

    save(row: SimOcupacionModel, original: SimOcupacionModel): Observable<SimOcupacionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimOcupacionModel): Observable<any> {
        const sUrl = `${this.simOcupacionUrl}(SimOcupacionId=${row.SimOcupacionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimOcupacion id=${row.SimOcupacionId}`)),
            catchError((error) => this.handleError("deleteSimOcupacion", error))
        );
    }

    saveRows(rows: Array<SimOcupacionModel>): Observable<any> {
        const _rows = rows.map((row) => SimOcupacionModel.clone(row));
        return this.http.post<any>(this.simOcupacionUrl, _rows).pipe(
            
            tap((rrows: SimOcupacionModel) => this.log(`pasted rows in SimOcupacion `)),
            catchError((error) => this.handleError("addSimOcupacion", error))
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

    /** Log a SimOcupacionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimOcupacionService: ${message}`);
        console.log(`SimOcupacionService: ${message}`);
    }

}
