import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimMotivoNoViabilidadModel } from './sim.motivonoviabilidad.model';

@Injectable({ providedIn: 'root' })
export class SimMotivoNoViabilidadService {
    private simMotivoNoViabilidadUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simMotivoNoViabilidadUrl = `${environment.dataServiceUrl}/odata/SimMotivoNoViabilidad`;
    }

    getById(simMotivoNoViabilidadId: number): Observable<any> {
        const sUrl = `${this.simMotivoNoViabilidadUrl}(SimMotivoNoViabilidadId=${simMotivoNoViabilidadId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimMotivoNoViabilidad")),
            catchError((error) => this.handleError("getSimMotivoNoViabilidad", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simMotivoNoViabilidadUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimMotivoNoViabilidad')),
            catchError((error) => this.handleError('getSimMotivoNoViabilidadList', error))
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

        return this.http.get<any>(this.simMotivoNoViabilidadUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimMotivoNoViabilidad")),
            catchError((error) => this.handleError('getSimMotivoNoViabilidadList', error))
        );
    }

    add(row: SimMotivoNoViabilidadModel): Observable<SimMotivoNoViabilidadModel> {
        return this.http.post<SimMotivoNoViabilidadModel>(this.simMotivoNoViabilidadUrl, SimMotivoNoViabilidadModel.clone(row)).pipe(
            
            tap((_row: SimMotivoNoViabilidadModel) => this.log(`added SimMotivoNoViabilidad w/ id=${_row.SimMotivoNoViabilidadId}`)),
            catchError((error) => this.handleError("addSimMotivoNoViabilidad", error))
        );
    }

    update(row: SimMotivoNoViabilidadModel, original: SimMotivoNoViabilidadModel): Observable<SimMotivoNoViabilidadModel> {
        const sUrl = `${this.simMotivoNoViabilidadUrl}(SimMotivoNoViabilidadId=${original.SimMotivoNoViabilidadId})`;
    
        return this.http.patch<SimMotivoNoViabilidadModel>(sUrl, SimMotivoNoViabilidadModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimMotivoNoViabilidad id=${row.SimMotivoNoViabilidadId}`)),
            catchError((error) => this.handleError("updateSimMotivoNoViabilidad", error))
        );
    }

    save(row: SimMotivoNoViabilidadModel, original: SimMotivoNoViabilidadModel): Observable<SimMotivoNoViabilidadModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimMotivoNoViabilidadModel): Observable<any> {
        const sUrl = `${this.simMotivoNoViabilidadUrl}(SimMotivoNoViabilidadId=${row.SimMotivoNoViabilidadId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimMotivoNoViabilidad id=${row.SimMotivoNoViabilidadId}`)),
            catchError((error) => this.handleError("deleteSimMotivoNoViabilidad", error))
        );
    }

    saveRows(rows: Array<SimMotivoNoViabilidadModel>): Observable<any> {
        const _rows = rows.map((row) => SimMotivoNoViabilidadModel.clone(row));
        return this.http.post<any>(this.simMotivoNoViabilidadUrl, _rows).pipe(
            
            tap((rrows: SimMotivoNoViabilidadModel) => this.log(`pasted rows in SimMotivoNoViabilidad `)),
            catchError((error) => this.handleError("addSimMotivoNoViabilidad", error))
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

    /** Log a SimMotivoNoViabilidadService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimMotivoNoViabilidadService: ${message}`);
        console.log(`SimMotivoNoViabilidadService: ${message}`);
    }

}
