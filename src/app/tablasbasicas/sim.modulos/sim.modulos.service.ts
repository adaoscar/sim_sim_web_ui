import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimModulosModel } from './sim.modulos.model';

@Injectable({ providedIn: 'root' })
export class SimModulosService {
    private simModulosUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simModulosUrl = `${environment.dataServiceUrl}/odata/SimModulos`;
    }

    getById(simModulosId: number): Observable<any> {
        const sUrl = `${this.simModulosUrl}(SimModulosId=${simModulosId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimModulos")),
            catchError((error) => this.handleError("getSimModulos", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simModulosUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimModulos')),
            catchError((error) => this.handleError('getSimModulosList', error))
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

        return this.http.get<any>(this.simModulosUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimModulos")),
            catchError((error) => this.handleError('getSimModulosList', error))
        );
    }

    add(row: SimModulosModel): Observable<SimModulosModel> {
        return this.http.post<SimModulosModel>(this.simModulosUrl, SimModulosModel.clone(row)).pipe(
            
            tap((_row: SimModulosModel) => this.log(`added SimModulos w/ id=${_row.SimModulosId}`)),
            catchError((error) => this.handleError("addSimModulos", error))
        );
    }

    update(row: SimModulosModel, original: SimModulosModel): Observable<SimModulosModel> {
        const sUrl = `${this.simModulosUrl}(SimModulosId=${original.SimModulosId})`;
    
        return this.http.patch<SimModulosModel>(sUrl, SimModulosModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimModulos id=${row.SimModulosId}`)),
            catchError((error) => this.handleError("updateSimModulos", error))
        );
    }

    save(row: SimModulosModel, original: SimModulosModel): Observable<SimModulosModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimModulosModel): Observable<any> {
        const sUrl = `${this.simModulosUrl}(SimModulosId=${row.SimModulosId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimModulos id=${row.SimModulosId}`)),
            catchError((error) => this.handleError("deleteSimModulos", error))
        );
    }

    saveRows(rows: Array<SimModulosModel>): Observable<any> {
        const _rows = rows.map((row) => SimModulosModel.clone(row));
        return this.http.post<any>(this.simModulosUrl, _rows).pipe(
            
            tap((rrows: SimModulosModel) => this.log(`pasted rows in SimModulos `)),
            catchError((error) => this.handleError("addSimModulos", error))
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

    /** Log a SimModulosService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimModulosService: ${message}`);
        console.log(`SimModulosService: ${message}`);
    }

}
