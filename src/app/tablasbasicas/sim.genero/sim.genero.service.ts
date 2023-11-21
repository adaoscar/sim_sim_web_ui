import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimGeneroModel } from './sim.genero.model';

@Injectable({ providedIn: 'root' })
export class SimGeneroService {
    private simGeneroUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simGeneroUrl = `${environment.dataServiceUrl}/odata/SimGenero`;
    }

    getById(simGeneroId: number): Observable<any> {
        const sUrl = `${this.simGeneroUrl}(SimGeneroId=${simGeneroId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimGenero")),
            catchError((error) => this.handleError("getSimGenero", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simGeneroUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimGenero')),
            catchError((error) => this.handleError('getSimGeneroList', error))
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

        return this.http.get<any>(this.simGeneroUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimGenero")),
            catchError((error) => this.handleError('getSimGeneroList', error))
        );
    }

    add(row: SimGeneroModel): Observable<SimGeneroModel> {
        return this.http.post<SimGeneroModel>(this.simGeneroUrl, SimGeneroModel.clone(row)).pipe(
            
            tap((_row: SimGeneroModel) => this.log(`added SimGenero w/ id=${_row.SimGeneroId}`)),
            catchError((error) => this.handleError("addSimGenero", error))
        );
    }

    update(row: SimGeneroModel, original: SimGeneroModel): Observable<SimGeneroModel> {
        const sUrl = `${this.simGeneroUrl}(SimGeneroId=${original.SimGeneroId})`;
    
        return this.http.patch<SimGeneroModel>(sUrl, SimGeneroModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimGenero id=${row.SimGeneroId}`)),
            catchError((error) => this.handleError("updateSimGenero", error))
        );
    }

    save(row: SimGeneroModel, original: SimGeneroModel): Observable<SimGeneroModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimGeneroModel): Observable<any> {
        const sUrl = `${this.simGeneroUrl}(SimGeneroId=${row.SimGeneroId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimGenero id=${row.SimGeneroId}`)),
            catchError((error) => this.handleError("deleteSimGenero", error))
        );
    }

    saveRows(rows: Array<SimGeneroModel>): Observable<any> {
        const _rows = rows.map((row) => SimGeneroModel.clone(row));
        return this.http.post<any>(this.simGeneroUrl, _rows).pipe(
            
            tap((rrows: SimGeneroModel) => this.log(`pasted rows in SimGenero `)),
            catchError((error) => this.handleError("addSimGenero", error))
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

    /** Log a SimGeneroService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimGeneroService: ${message}`);
        console.log(`SimGeneroService: ${message}`);
    }

}
