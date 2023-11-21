import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimPaisModel } from './sim.pais.model';

@Injectable({ providedIn: 'root' })
export class SimPaisService {
    private simPaisUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simPaisUrl = `${environment.dataServiceUrl}/odata/SimPais`;
    }

    getById(simPaisId: number): Observable<any> {
        const sUrl = `${this.simPaisUrl}(SimPaisId=${simPaisId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimPais")),
            catchError((error) => this.handleError("getSimPais", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simPaisUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimPais')),
            catchError((error) => this.handleError('getSimPaisList', error))
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

        return this.http.get<any>(this.simPaisUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimPais")),
            catchError((error) => this.handleError('getSimPaisList', error))
        );
    }

    add(row: SimPaisModel): Observable<SimPaisModel> {
        return this.http.post<SimPaisModel>(this.simPaisUrl, SimPaisModel.clone(row)).pipe(
            
            tap((_row: SimPaisModel) => this.log(`added SimPais w/ id=${_row.SimPaisId}`)),
            catchError((error) => this.handleError("addSimPais", error))
        );
    }

    update(row: SimPaisModel, original: SimPaisModel): Observable<SimPaisModel> {
        const sUrl = `${this.simPaisUrl}(SimPaisId=${original.SimPaisId})`;
    
        return this.http.patch<SimPaisModel>(sUrl, SimPaisModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimPais id=${row.SimPaisId}`)),
            catchError((error) => this.handleError("updateSimPais", error))
        );
    }

    save(row: SimPaisModel, original: SimPaisModel): Observable<SimPaisModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimPaisModel): Observable<any> {
        const sUrl = `${this.simPaisUrl}(SimPaisId=${row.SimPaisId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimPais id=${row.SimPaisId}`)),
            catchError((error) => this.handleError("deleteSimPais", error))
        );
    }

    saveRows(rows: Array<SimPaisModel>): Observable<any> {
        const _rows = rows.map((row) => SimPaisModel.clone(row));
        return this.http.post<any>(this.simPaisUrl, _rows).pipe(
            
            tap((rrows: SimPaisModel) => this.log(`pasted rows in SimPais `)),
            catchError((error) => this.handleError("addSimPais", error))
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

    /** Log a SimPaisService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimPaisService: ${message}`);
        console.log(`SimPaisService: ${message}`);
    }

}
