import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimPertenenciaEtnicaModel } from './sim.pertenenciaetnica.model';

@Injectable({ providedIn: 'root' })
export class SimPertenenciaEtnicaService {
    private simPertenenciaEtnicaUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simPertenenciaEtnicaUrl = `${environment.dataServiceUrl}/odata/SimPertenenciaEtnica`;
    }

    getById(simPertenenciaEtnicaId: number): Observable<any> {
        const sUrl = `${this.simPertenenciaEtnicaUrl}(SimPertenenciaEtnicaId=${simPertenenciaEtnicaId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimPertenenciaEtnica")),
            catchError((error) => this.handleError("getSimPertenenciaEtnica", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simPertenenciaEtnicaUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimPertenenciaEtnica')),
            catchError((error) => this.handleError('getSimPertenenciaEtnicaList', error))
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

        return this.http.get<any>(this.simPertenenciaEtnicaUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimPertenenciaEtnica")),
            catchError((error) => this.handleError('getSimPertenenciaEtnicaList', error))
        );
    }

    add(row: SimPertenenciaEtnicaModel): Observable<SimPertenenciaEtnicaModel> {
        return this.http.post<SimPertenenciaEtnicaModel>(this.simPertenenciaEtnicaUrl, SimPertenenciaEtnicaModel.clone(row)).pipe(
            
            tap((_row: SimPertenenciaEtnicaModel) => this.log(`added SimPertenenciaEtnica w/ id=${_row.SimPertenenciaEtnicaId}`)),
            catchError((error) => this.handleError("addSimPertenenciaEtnica", error))
        );
    }

    update(row: SimPertenenciaEtnicaModel, original: SimPertenenciaEtnicaModel): Observable<SimPertenenciaEtnicaModel> {
        const sUrl = `${this.simPertenenciaEtnicaUrl}(SimPertenenciaEtnicaId=${original.SimPertenenciaEtnicaId})`;
    
        return this.http.patch<SimPertenenciaEtnicaModel>(sUrl, SimPertenenciaEtnicaModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimPertenenciaEtnica id=${row.SimPertenenciaEtnicaId}`)),
            catchError((error) => this.handleError("updateSimPertenenciaEtnica", error))
        );
    }

    save(row: SimPertenenciaEtnicaModel, original: SimPertenenciaEtnicaModel): Observable<SimPertenenciaEtnicaModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimPertenenciaEtnicaModel): Observable<any> {
        const sUrl = `${this.simPertenenciaEtnicaUrl}(SimPertenenciaEtnicaId=${row.SimPertenenciaEtnicaId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimPertenenciaEtnica id=${row.SimPertenenciaEtnicaId}`)),
            catchError((error) => this.handleError("deleteSimPertenenciaEtnica", error))
        );
    }

    saveRows(rows: Array<SimPertenenciaEtnicaModel>): Observable<any> {
        const _rows = rows.map((row) => SimPertenenciaEtnicaModel.clone(row));
        return this.http.post<any>(this.simPertenenciaEtnicaUrl, _rows).pipe(
            
            tap((rrows: SimPertenenciaEtnicaModel) => this.log(`pasted rows in SimPertenenciaEtnica `)),
            catchError((error) => this.handleError("addSimPertenenciaEtnica", error))
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

    /** Log a SimPertenenciaEtnicaService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimPertenenciaEtnicaService: ${message}`);
        console.log(`SimPertenenciaEtnicaService: ${message}`);
    }

}
