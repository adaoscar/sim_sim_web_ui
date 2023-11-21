import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimMedioComunicacionModel } from './sim.mediocomunicacion.model';

@Injectable({ providedIn: 'root' })
export class SimMedioComunicacionService {
    private simMedioComunicacionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simMedioComunicacionUrl = `${environment.dataServiceUrl}/odata/SimMedioComunicacion`;
    }

    getById(simMedioComunicacionId: number): Observable<any> {
        const sUrl = `${this.simMedioComunicacionUrl}(SimMedioComunicacionId=${simMedioComunicacionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimMedioComunicacion")),
            catchError((error) => this.handleError("getSimMedioComunicacion", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simMedioComunicacionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimMedioComunicacion')),
            catchError((error) => this.handleError('getSimMedioComunicacionList', error))
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

        return this.http.get<any>(this.simMedioComunicacionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimMedioComunicacion")),
            catchError((error) => this.handleError('getSimMedioComunicacionList', error))
        );
    }

    add(row: SimMedioComunicacionModel): Observable<SimMedioComunicacionModel> {
        return this.http.post<SimMedioComunicacionModel>(this.simMedioComunicacionUrl, SimMedioComunicacionModel.clone(row)).pipe(
            
            tap((_row: SimMedioComunicacionModel) => this.log(`added SimMedioComunicacion w/ id=${_row.SimMedioComunicacionId}`)),
            catchError((error) => this.handleError("addSimMedioComunicacion", error))
        );
    }

    update(row: SimMedioComunicacionModel, original: SimMedioComunicacionModel): Observable<SimMedioComunicacionModel> {
        const sUrl = `${this.simMedioComunicacionUrl}(SimMedioComunicacionId=${original.SimMedioComunicacionId})`;
    
        return this.http.patch<SimMedioComunicacionModel>(sUrl, SimMedioComunicacionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimMedioComunicacion id=${row.SimMedioComunicacionId}`)),
            catchError((error) => this.handleError("updateSimMedioComunicacion", error))
        );
    }

    save(row: SimMedioComunicacionModel, original: SimMedioComunicacionModel): Observable<SimMedioComunicacionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimMedioComunicacionModel): Observable<any> {
        const sUrl = `${this.simMedioComunicacionUrl}(SimMedioComunicacionId=${row.SimMedioComunicacionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimMedioComunicacion id=${row.SimMedioComunicacionId}`)),
            catchError((error) => this.handleError("deleteSimMedioComunicacion", error))
        );
    }

    saveRows(rows: Array<SimMedioComunicacionModel>): Observable<any> {
        const _rows = rows.map((row) => SimMedioComunicacionModel.clone(row));
        return this.http.post<any>(this.simMedioComunicacionUrl, _rows).pipe(
            
            tap((rrows: SimMedioComunicacionModel) => this.log(`pasted rows in SimMedioComunicacion `)),
            catchError((error) => this.handleError("addSimMedioComunicacion", error))
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

    /** Log a SimMedioComunicacionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimMedioComunicacionService: ${message}`);
        console.log(`SimMedioComunicacionService: ${message}`);
    }

}
