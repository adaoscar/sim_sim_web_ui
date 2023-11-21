import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimTipoDecisionModel } from './sim.tipodecision.model';

@Injectable({ providedIn: 'root' })
export class SimTipoDecisionService {
    private simTipoDecisionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simTipoDecisionUrl = `${environment.dataServiceUrl}/odata/SimTipoDecision`;
    }

    getById(simTipoDecisionId: number): Observable<any> {
        const sUrl = `${this.simTipoDecisionUrl}(SimTipoDecisionId=${simTipoDecisionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimTipoDecision")),
            catchError((error) => this.handleError("getSimTipoDecision", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simTipoDecisionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimTipoDecision')),
            catchError((error) => this.handleError('getSimTipoDecisionList', error))
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

        return this.http.get<any>(this.simTipoDecisionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimTipoDecision")),
            catchError((error) => this.handleError('getSimTipoDecisionList', error))
        );
    }

    add(row: SimTipoDecisionModel): Observable<SimTipoDecisionModel> {
        return this.http.post<SimTipoDecisionModel>(this.simTipoDecisionUrl, SimTipoDecisionModel.clone(row)).pipe(
            
            tap((_row: SimTipoDecisionModel) => this.log(`added SimTipoDecision w/ id=${_row.SimTipoDecisionId}`)),
            catchError((error) => this.handleError("addSimTipoDecision", error))
        );
    }

    update(row: SimTipoDecisionModel, original: SimTipoDecisionModel): Observable<SimTipoDecisionModel> {
        const sUrl = `${this.simTipoDecisionUrl}(SimTipoDecisionId=${original.SimTipoDecisionId})`;
    
        return this.http.patch<SimTipoDecisionModel>(sUrl, SimTipoDecisionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimTipoDecision id=${row.SimTipoDecisionId}`)),
            catchError((error) => this.handleError("updateSimTipoDecision", error))
        );
    }

    save(row: SimTipoDecisionModel, original: SimTipoDecisionModel): Observable<SimTipoDecisionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimTipoDecisionModel): Observable<any> {
        const sUrl = `${this.simTipoDecisionUrl}(SimTipoDecisionId=${row.SimTipoDecisionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimTipoDecision id=${row.SimTipoDecisionId}`)),
            catchError((error) => this.handleError("deleteSimTipoDecision", error))
        );
    }

    saveRows(rows: Array<SimTipoDecisionModel>): Observable<any> {
        const _rows = rows.map((row) => SimTipoDecisionModel.clone(row));
        return this.http.post<any>(this.simTipoDecisionUrl, _rows).pipe(
            
            tap((rrows: SimTipoDecisionModel) => this.log(`pasted rows in SimTipoDecision `)),
            catchError((error) => this.handleError("addSimTipoDecision", error))
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

    /** Log a SimTipoDecisionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimTipoDecisionService: ${message}`);
        console.log(`SimTipoDecisionService: ${message}`);
    }

}
