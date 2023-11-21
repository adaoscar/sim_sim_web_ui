import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimVigenciaModel } from './sim.vigencia.model';

@Injectable({ providedIn: 'root' })
export class SimVigenciaService {
    private simVigenciaUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simVigenciaUrl = `${environment.dataServiceUrl}/odata/SimVigencia`;
    }

    getById(simVigenciaId: number): Observable<any> {
        const sUrl = `${this.simVigenciaUrl}(SimVigenciaId=${simVigenciaId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimVigencia")),
            catchError((error) => this.handleError("getSimVigencia", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simVigenciaUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimVigencia')),
            catchError((error) => this.handleError('getSimVigenciaList', error))
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

        return this.http.get<any>(this.simVigenciaUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimVigencia")),
            catchError((error) => this.handleError('getSimVigenciaList', error))
        );
    }

    add(row: SimVigenciaModel): Observable<SimVigenciaModel> {
        return this.http.post<SimVigenciaModel>(this.simVigenciaUrl, SimVigenciaModel.clone(row)).pipe(
            
            tap((_row: SimVigenciaModel) => this.log(`added SimVigencia w/ id=${_row.SimVigenciaId}`)),
            catchError((error) => this.handleError("addSimVigencia", error))
        );
    }

    update(row: SimVigenciaModel, original: SimVigenciaModel): Observable<SimVigenciaModel> {
        const sUrl = `${this.simVigenciaUrl}(SimVigenciaId=${original.SimVigenciaId})`;
    
        return this.http.patch<SimVigenciaModel>(sUrl, SimVigenciaModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimVigencia id=${row.SimVigenciaId}`)),
            catchError((error) => this.handleError("updateSimVigencia", error))
        );
    }

    save(row: SimVigenciaModel, original: SimVigenciaModel): Observable<SimVigenciaModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimVigenciaModel): Observable<any> {
        const sUrl = `${this.simVigenciaUrl}(SimVigenciaId=${row.SimVigenciaId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimVigencia id=${row.SimVigenciaId}`)),
            catchError((error) => this.handleError("deleteSimVigencia", error))
        );
    }

    saveRows(rows: Array<SimVigenciaModel>): Observable<any> {
        const _rows = rows.map((row) => SimVigenciaModel.clone(row));
        return this.http.post<any>(this.simVigenciaUrl, _rows).pipe(
            
            tap((rrows: SimVigenciaModel) => this.log(`pasted rows in SimVigencia `)),
            catchError((error) => this.handleError("addSimVigencia", error))
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

    /** Log a SimVigenciaService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimVigenciaService: ${message}`);
        console.log(`SimVigenciaService: ${message}`);
    }

}
