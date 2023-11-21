import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimTipoDelitoModel } from './sim.tipodelito.model';

@Injectable({ providedIn: 'root' })
export class SimTipoDelitoService {
    private simTipoDelitoUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simTipoDelitoUrl = `${environment.dataServiceUrl}/odata/SimTipoDelito`;
    }

    getById(simTipoDelitoId: number): Observable<any> {
        const sUrl = `${this.simTipoDelitoUrl}(SimTipoDelitoId=${simTipoDelitoId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimTipoDelito")),
            catchError((error) => this.handleError("getSimTipoDelito", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simTipoDelitoUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimTipoDelito')),
            catchError((error) => this.handleError('getSimTipoDelitoList', error))
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

        return this.http.get<any>(this.simTipoDelitoUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimTipoDelito")),
            catchError((error) => this.handleError('getSimTipoDelitoList', error))
        );
    }

    add(row: SimTipoDelitoModel): Observable<SimTipoDelitoModel> {
        return this.http.post<SimTipoDelitoModel>(this.simTipoDelitoUrl, SimTipoDelitoModel.clone(row)).pipe(
            
            tap((_row: SimTipoDelitoModel) => this.log(`added SimTipoDelito w/ id=${_row.SimTipoDelitoId}`)),
            catchError((error) => this.handleError("addSimTipoDelito", error))
        );
    }

    update(row: SimTipoDelitoModel, original: SimTipoDelitoModel): Observable<SimTipoDelitoModel> {
        const sUrl = `${this.simTipoDelitoUrl}(SimTipoDelitoId=${original.SimTipoDelitoId})`;
    
        return this.http.patch<SimTipoDelitoModel>(sUrl, SimTipoDelitoModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimTipoDelito id=${row.SimTipoDelitoId}`)),
            catchError((error) => this.handleError("updateSimTipoDelito", error))
        );
    }

    save(row: SimTipoDelitoModel, original: SimTipoDelitoModel): Observable<SimTipoDelitoModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimTipoDelitoModel): Observable<any> {
        const sUrl = `${this.simTipoDelitoUrl}(SimTipoDelitoId=${row.SimTipoDelitoId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimTipoDelito id=${row.SimTipoDelitoId}`)),
            catchError((error) => this.handleError("deleteSimTipoDelito", error))
        );
    }

    saveRows(rows: Array<SimTipoDelitoModel>): Observable<any> {
        const _rows = rows.map((row) => SimTipoDelitoModel.clone(row));
        return this.http.post<any>(this.simTipoDelitoUrl, _rows).pipe(
            
            tap((rrows: SimTipoDelitoModel) => this.log(`pasted rows in SimTipoDelito `)),
            catchError((error) => this.handleError("addSimTipoDelito", error))
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

    /** Log a SimTipoDelitoService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimTipoDelitoService: ${message}`);
        console.log(`SimTipoDelitoService: ${message}`);
    }

}
