import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimDiasFestivosModel } from './sim.diasfestivos.model';

@Injectable({ providedIn: 'root' })
export class SimDiasFestivosService {
    private simDiasFestivosUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simDiasFestivosUrl = `${environment.dataServiceUrl}/odata/SimDiasFestivos`;
    }

    getById(simDiasFestivosId: number): Observable<any> {
        const sUrl = `${this.simDiasFestivosUrl}(SimDiasFestivosId=${simDiasFestivosId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimDiasFestivos")),
            catchError((error) => this.handleError("getSimDiasFestivos", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simDiasFestivosUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimDiasFestivos')),
            catchError((error) => this.handleError('getSimDiasFestivosList', error))
        );
    }

    getList(filter: string,
            paginator: MatPaginator,
            sort: MatSort): Observable<any> {

        const params: any = {};

        if (filter) {
            params["$filter"] = filter;
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";

        return this.http.get<any>(this.simDiasFestivosUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimDiasFestivos")),
            catchError((error) => this.handleError('getSimDiasFestivosList', error))
        );
    }

    add(row: SimDiasFestivosModel): Observable<SimDiasFestivosModel> {
        return this.http.post<SimDiasFestivosModel>(this.simDiasFestivosUrl, SimDiasFestivosModel.clone(row)).pipe(
            
            tap((_row: SimDiasFestivosModel) => this.log(`added SimDiasFestivos w/ id=${_row.SimDiasFestivosId}`)),
            catchError((error) => this.handleError("addSimDiasFestivos", error))
        );
    }

    update(row: SimDiasFestivosModel, original: SimDiasFestivosModel): Observable<SimDiasFestivosModel> {
        const sUrl = `${this.simDiasFestivosUrl}(SimDiasFestivosId=${original.SimDiasFestivosId})`;
    
        return this.http.patch<SimDiasFestivosModel>(sUrl, SimDiasFestivosModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimDiasFestivos id=${row.SimDiasFestivosId}`)),
            catchError((error) => this.handleError("updateSimDiasFestivos", error))
        );
    }

    save(row: SimDiasFestivosModel, original: SimDiasFestivosModel): Observable<SimDiasFestivosModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimDiasFestivosModel): Observable<any> {
        const sUrl = `${this.simDiasFestivosUrl}(SimDiasFestivosId=${row.SimDiasFestivosId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimDiasFestivos id=${row.SimDiasFestivosId}`)),
            catchError((error) => this.handleError("deleteSimDiasFestivos", error))
        );
    }

    saveRows(rows: Array<SimDiasFestivosModel>): Observable<any> {
        const _rows = rows.map((row) => SimDiasFestivosModel.clone(row));
        return this.http.post<any>(this.simDiasFestivosUrl, _rows).pipe(
            
            tap((rrows: SimDiasFestivosModel) => this.log(`pasted rows in SimDiasFestivos `)),
            catchError((error) => this.handleError("addSimDiasFestivos", error))
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

    /** Log a SimDiasFestivosService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimDiasFestivosService: ${message}`);
        console.log(`SimDiasFestivosService: ${message}`);
    }

}
