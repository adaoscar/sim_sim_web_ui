import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimCondicionesVunerabilidadModel } from './sim.condicionesvunerabilidad.model';

@Injectable({ providedIn: 'root' })
export class SimCondicionesVunerabilidadService {
    private simCondicionesVunerabilidadUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simCondicionesVunerabilidadUrl = `${environment.dataServiceUrl}/odata/SimCondicionesVunerabilidad`;
    }

    getById(simCondicionesVunerabilidadId: number): Observable<any> {
        const sUrl = `${this.simCondicionesVunerabilidadUrl}(SimCondicionesVunerabilidadId=${simCondicionesVunerabilidadId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimCondicionesVunerabilidad")),
            catchError((error) => this.handleError("getSimCondicionesVunerabilidad", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simCondicionesVunerabilidadUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimCondicionesVunerabilidad')),
            catchError((error) => this.handleError('getSimCondicionesVunerabilidadList', error))
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

        return this.http.get<any>(this.simCondicionesVunerabilidadUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimCondicionesVunerabilidad")),
            catchError((error) => this.handleError('getSimCondicionesVunerabilidadList', error))
        );
    }

    add(row: SimCondicionesVunerabilidadModel): Observable<SimCondicionesVunerabilidadModel> {
        return this.http.post<SimCondicionesVunerabilidadModel>(this.simCondicionesVunerabilidadUrl, SimCondicionesVunerabilidadModel.clone(row)).pipe(
            
            tap((_row: SimCondicionesVunerabilidadModel) => this.log(`added SimCondicionesVunerabilidad w/ id=${_row.SimCondicionesVunerabilidadId}`)),
            catchError((error) => this.handleError("addSimCondicionesVunerabilidad", error))
        );
    }

    update(row: SimCondicionesVunerabilidadModel, original: SimCondicionesVunerabilidadModel): Observable<SimCondicionesVunerabilidadModel> {
        const sUrl = `${this.simCondicionesVunerabilidadUrl}(SimCondicionesVunerabilidadId=${original.SimCondicionesVunerabilidadId})`;
    
        return this.http.patch<SimCondicionesVunerabilidadModel>(sUrl, SimCondicionesVunerabilidadModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimCondicionesVunerabilidad id=${row.SimCondicionesVunerabilidadId}`)),
            catchError((error) => this.handleError("updateSimCondicionesVunerabilidad", error))
        );
    }

    save(row: SimCondicionesVunerabilidadModel, original: SimCondicionesVunerabilidadModel): Observable<SimCondicionesVunerabilidadModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimCondicionesVunerabilidadModel): Observable<any> {
        const sUrl = `${this.simCondicionesVunerabilidadUrl}(SimCondicionesVunerabilidadId=${row.SimCondicionesVunerabilidadId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimCondicionesVunerabilidad id=${row.SimCondicionesVunerabilidadId}`)),
            catchError((error) => this.handleError("deleteSimCondicionesVunerabilidad", error))
        );
    }

    saveRows(rows: Array<SimCondicionesVunerabilidadModel>): Observable<any> {
        const _rows = rows.map((row) => SimCondicionesVunerabilidadModel.clone(row));
        return this.http.post<any>(this.simCondicionesVunerabilidadUrl, _rows).pipe(
            
            tap((rrows: SimCondicionesVunerabilidadModel) => this.log(`pasted rows in SimCondicionesVunerabilidad `)),
            catchError((error) => this.handleError("addSimCondicionesVunerabilidad", error))
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

    /** Log a SimCondicionesVunerabilidadService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimCondicionesVunerabilidadService: ${message}`);
        console.log(`SimCondicionesVunerabilidadService: ${message}`);
    }

}
