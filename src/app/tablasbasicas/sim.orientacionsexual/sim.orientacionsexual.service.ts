import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimOrientacionSexualModel } from './sim.orientacionsexual.model';

@Injectable({ providedIn: 'root' })
export class SimOrientacionSexualService {
    private simOrientacionSexualUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simOrientacionSexualUrl = `${environment.dataServiceUrl}/odata/SimOrientacionSexual`;
    }

    getById(simOrientacionSexualId: number): Observable<any> {
        const sUrl = `${this.simOrientacionSexualUrl}(SimOrientacionSexualId=${simOrientacionSexualId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimOrientacionSexual")),
            catchError((error) => this.handleError("getSimOrientacionSexual", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simOrientacionSexualUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimOrientacionSexual')),
            catchError((error) => this.handleError('getSimOrientacionSexualList', error))
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

        return this.http.get<any>(this.simOrientacionSexualUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimOrientacionSexual")),
            catchError((error) => this.handleError('getSimOrientacionSexualList', error))
        );
    }

    add(row: SimOrientacionSexualModel): Observable<SimOrientacionSexualModel> {
        return this.http.post<SimOrientacionSexualModel>(this.simOrientacionSexualUrl, SimOrientacionSexualModel.clone(row)).pipe(
            
            tap((_row: SimOrientacionSexualModel) => this.log(`added SimOrientacionSexual w/ id=${_row.SimOrientacionSexualId}`)),
            catchError((error) => this.handleError("addSimOrientacionSexual", error))
        );
    }

    update(row: SimOrientacionSexualModel, original: SimOrientacionSexualModel): Observable<SimOrientacionSexualModel> {
        const sUrl = `${this.simOrientacionSexualUrl}(SimOrientacionSexualId=${original.SimOrientacionSexualId})`;
    
        return this.http.patch<SimOrientacionSexualModel>(sUrl, SimOrientacionSexualModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimOrientacionSexual id=${row.SimOrientacionSexualId}`)),
            catchError((error) => this.handleError("updateSimOrientacionSexual", error))
        );
    }

    save(row: SimOrientacionSexualModel, original: SimOrientacionSexualModel): Observable<SimOrientacionSexualModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimOrientacionSexualModel): Observable<any> {
        const sUrl = `${this.simOrientacionSexualUrl}(SimOrientacionSexualId=${row.SimOrientacionSexualId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimOrientacionSexual id=${row.SimOrientacionSexualId}`)),
            catchError((error) => this.handleError("deleteSimOrientacionSexual", error))
        );
    }

    saveRows(rows: Array<SimOrientacionSexualModel>): Observable<any> {
        const _rows = rows.map((row) => SimOrientacionSexualModel.clone(row));
        return this.http.post<any>(this.simOrientacionSexualUrl, _rows).pipe(
            
            tap((rrows: SimOrientacionSexualModel) => this.log(`pasted rows in SimOrientacionSexual `)),
            catchError((error) => this.handleError("addSimOrientacionSexual", error))
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

    /** Log a SimOrientacionSexualService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimOrientacionSexualService: ${message}`);
        console.log(`SimOrientacionSexualService: ${message}`);
    }

}
