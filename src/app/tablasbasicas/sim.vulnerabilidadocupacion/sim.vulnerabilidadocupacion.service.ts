import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimVulnerabilidadOcupacionModel } from './sim.vulnerabilidadocupacion.model';

@Injectable({ providedIn: 'root' })
export class SimVulnerabilidadOcupacionService {
    private simVulnerabilidadOcupacionUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simVulnerabilidadOcupacionUrl = `${environment.dataServiceUrl}/odata/SimVulnerabilidadOcupacion`;
    }

    getById(simVulnerabilidadOcupacionId: number): Observable<any> {
        const sUrl = `${this.simVulnerabilidadOcupacionUrl}(SimVulnerabilidadOcupacionId=${simVulnerabilidadOcupacionId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimVulnerabilidadOcupacion")),
            catchError((error) => this.handleError("getSimVulnerabilidadOcupacion", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simVulnerabilidadOcupacionUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimVulnerabilidadOcupacion')),
            catchError((error) => this.handleError('getSimVulnerabilidadOcupacionList', error))
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

        return this.http.get<any>(this.simVulnerabilidadOcupacionUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimVulnerabilidadOcupacion")),
            catchError((error) => this.handleError('getSimVulnerabilidadOcupacionList', error))
        );
    }

    add(row: SimVulnerabilidadOcupacionModel): Observable<SimVulnerabilidadOcupacionModel> {
        return this.http.post<SimVulnerabilidadOcupacionModel>(this.simVulnerabilidadOcupacionUrl, SimVulnerabilidadOcupacionModel.clone(row)).pipe(
            
            tap((_row: SimVulnerabilidadOcupacionModel) => this.log(`added SimVulnerabilidadOcupacion w/ id=${_row.SimVulnerabilidadOcupacionId}`)),
            catchError((error) => this.handleError("addSimVulnerabilidadOcupacion", error))
        );
    }

    update(row: SimVulnerabilidadOcupacionModel, original: SimVulnerabilidadOcupacionModel): Observable<SimVulnerabilidadOcupacionModel> {
        const sUrl = `${this.simVulnerabilidadOcupacionUrl}(SimVulnerabilidadOcupacionId=${original.SimVulnerabilidadOcupacionId})`;
    
        return this.http.patch<SimVulnerabilidadOcupacionModel>(sUrl, SimVulnerabilidadOcupacionModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimVulnerabilidadOcupacion id=${row.SimVulnerabilidadOcupacionId}`)),
            catchError((error) => this.handleError("updateSimVulnerabilidadOcupacion", error))
        );
    }

    save(row: SimVulnerabilidadOcupacionModel, original: SimVulnerabilidadOcupacionModel): Observable<SimVulnerabilidadOcupacionModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimVulnerabilidadOcupacionModel): Observable<any> {
        const sUrl = `${this.simVulnerabilidadOcupacionUrl}(SimVulnerabilidadOcupacionId=${row.SimVulnerabilidadOcupacionId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimVulnerabilidadOcupacion id=${row.SimVulnerabilidadOcupacionId}`)),
            catchError((error) => this.handleError("deleteSimVulnerabilidadOcupacion", error))
        );
    }

    saveRows(rows: Array<SimVulnerabilidadOcupacionModel>): Observable<any> {
        const _rows = rows.map((row) => SimVulnerabilidadOcupacionModel.clone(row));
        return this.http.post<any>(this.simVulnerabilidadOcupacionUrl, _rows).pipe(
            
            tap((rrows: SimVulnerabilidadOcupacionModel) => this.log(`pasted rows in SimVulnerabilidadOcupacion `)),
            catchError((error) => this.handleError("addSimVulnerabilidadOcupacion", error))
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

    /** Log a SimVulnerabilidadOcupacionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimVulnerabilidadOcupacionService: ${message}`);
        console.log(`SimVulnerabilidadOcupacionService: ${message}`);
    }

}
