import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimTipoSesionModel } from './sim.tiposesion.model';

@Injectable({ providedIn: 'root' })
export class SimTipoSesionService {
    private simTipoSesionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simTipoSesionUrl = `${environment.dataServiceUrl}/odata/SimTipoSesion`;
    }

    getById(simTipoSesionId: number): Observable<any> {
        const sUrl = `${this.simTipoSesionUrl}(SimTipoSesionId=${simTipoSesionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimTipoSesion")),
            catchError((error) => this.handleError("getSimTipoSesion", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simTipoSesionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimTipoSesion')),
            catchError((error) => this.handleError('getSimTipoSesionList', error))
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

        return this.http.get<any>(this.simTipoSesionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimTipoSesion")),
            catchError((error) => this.handleError('getSimTipoSesionList', error))
        );
    }

    add(row: SimTipoSesionModel): Observable<SimTipoSesionModel> {
        return this.http.post<SimTipoSesionModel>(this.simTipoSesionUrl, SimTipoSesionModel.clone(row)).pipe(
            
            tap((_row: SimTipoSesionModel) => this.log(`added SimTipoSesion w/ id=${_row.SimTipoSesionId}`)),
            catchError((error) => this.handleError("addSimTipoSesion", error))
        );
    }

    update(row: SimTipoSesionModel, original: SimTipoSesionModel): Observable<SimTipoSesionModel> {
        const sUrl = `${this.simTipoSesionUrl}(SimTipoSesionId=${original.SimTipoSesionId})`;
    
        return this.http.patch<SimTipoSesionModel>(sUrl, SimTipoSesionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimTipoSesion id=${row.SimTipoSesionId}`)),
            catchError((error) => this.handleError("updateSimTipoSesion", error))
        );
    }

    save(row: SimTipoSesionModel, original: SimTipoSesionModel): Observable<SimTipoSesionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimTipoSesionModel): Observable<any> {
        const sUrl = `${this.simTipoSesionUrl}(SimTipoSesionId=${row.SimTipoSesionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimTipoSesion id=${row.SimTipoSesionId}`)),
            catchError((error) => this.handleError("deleteSimTipoSesion", error))
        );
    }

    saveRows(rows: Array<SimTipoSesionModel>): Observable<any> {
        const _rows = rows.map((row) => SimTipoSesionModel.clone(row));
        return this.http.post<any>(this.simTipoSesionUrl, _rows).pipe(
            
            tap((rrows: SimTipoSesionModel) => this.log(`pasted rows in SimTipoSesion `)),
            catchError((error) => this.handleError("addSimTipoSesion", error))
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

    /** Log a SimTipoSesionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimTipoSesionService: ${message}`);
        console.log(`SimTipoSesionService: ${message}`);
    }

}
