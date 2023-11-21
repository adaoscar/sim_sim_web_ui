import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimDepartamentoModel } from './sim.departamento.model';

@Injectable({ providedIn: 'root' })
export class SimDepartamentoService {
    private simDepartamentoUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simDepartamentoUrl = `${environment.dataServiceUrl}/odata/SimDepartamento`;
    }

    getById(simDepartamentoId: number): Observable<any> {
        const sUrl = `${this.simDepartamentoUrl}(SimDepartamentoId=${simDepartamentoId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimDepartamento")),
            catchError((error) => this.handleError("getSimDepartamento", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simDepartamentoUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimDepartamento')),
            catchError((error) => this.handleError('getSimDepartamentoList', error))
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

        return this.http.get<any>(this.simDepartamentoUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimDepartamento")),
            catchError((error) => this.handleError('getSimDepartamentoList', error))
        );
    }

    add(row: SimDepartamentoModel): Observable<SimDepartamentoModel> {
        return this.http.post<SimDepartamentoModel>(this.simDepartamentoUrl, SimDepartamentoModel.clone(row)).pipe(
            
            tap((_row: SimDepartamentoModel) => this.log(`added SimDepartamento w/ id=${_row.SimDepartamentoId}`)),
            catchError((error) => this.handleError("addSimDepartamento", error))
        );
    }

    update(row: SimDepartamentoModel, original: SimDepartamentoModel): Observable<SimDepartamentoModel> {
        const sUrl = `${this.simDepartamentoUrl}(SimDepartamentoId=${original.SimDepartamentoId})`;
    
        return this.http.patch<SimDepartamentoModel>(sUrl, SimDepartamentoModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimDepartamento id=${row.SimDepartamentoId}`)),
            catchError((error) => this.handleError("updateSimDepartamento", error))
        );
    }

    save(row: SimDepartamentoModel, original: SimDepartamentoModel): Observable<SimDepartamentoModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimDepartamentoModel): Observable<any> {
        const sUrl = `${this.simDepartamentoUrl}(SimDepartamentoId=${row.SimDepartamentoId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimDepartamento id=${row.SimDepartamentoId}`)),
            catchError((error) => this.handleError("deleteSimDepartamento", error))
        );
    }

    saveRows(rows: Array<SimDepartamentoModel>): Observable<any> {
        const _rows = rows.map((row) => SimDepartamentoModel.clone(row));
        return this.http.post<any>(this.simDepartamentoUrl, _rows).pipe(
            
            tap((rrows: SimDepartamentoModel) => this.log(`pasted rows in SimDepartamento `)),
            catchError((error) => this.handleError("addSimDepartamento", error))
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

    /** Log a SimDepartamentoService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimDepartamentoService: ${message}`);
        console.log(`SimDepartamentoService: ${message}`);
    }

}
