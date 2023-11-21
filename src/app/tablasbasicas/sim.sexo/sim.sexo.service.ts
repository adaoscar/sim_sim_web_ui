import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimSexoModel } from './sim.sexo.model';

@Injectable({ providedIn: 'root' })
export class SimSexoService {
    private simSexoUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simSexoUrl = `${environment.dataServiceUrl}/odata/SimSexo`;
    }

    getById(simSexoId: number): Observable<any> {
        const sUrl = `${this.simSexoUrl}(SimSexoId=${simSexoId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimSexo")),
            catchError((error) => this.handleError("getSimSexo", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.simSexoUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimSexo')),
            catchError((error) => this.handleError('getSimSexoList', error))
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

        return this.http.get<any>(this.simSexoUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimSexo")),
            catchError((error) => this.handleError('getSimSexoList', error))
        );
    }

    add(row: SimSexoModel): Observable<SimSexoModel> {
        return this.http.post<SimSexoModel>(this.simSexoUrl, SimSexoModel.clone(row)).pipe(
            
            tap((_row: SimSexoModel) => this.log(`added SimSexo w/ id=${_row.SimSexoId}`)),
            catchError((error) => this.handleError("addSimSexo", error))
        );
    }

    update(row: SimSexoModel, original: SimSexoModel): Observable<SimSexoModel> {
        const sUrl = `${this.simSexoUrl}(SimSexoId=${original.SimSexoId})`;
    
        return this.http.patch<SimSexoModel>(sUrl, SimSexoModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimSexo id=${row.SimSexoId}`)),
            catchError((error) => this.handleError("updateSimSexo", error))
        );
    }

    save(row: SimSexoModel, original: SimSexoModel): Observable<SimSexoModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimSexoModel): Observable<any> {
        const sUrl = `${this.simSexoUrl}(SimSexoId=${row.SimSexoId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimSexo id=${row.SimSexoId}`)),
            catchError((error) => this.handleError("deleteSimSexo", error))
        );
    }

    saveRows(rows: Array<SimSexoModel>): Observable<any> {
        const _rows = rows.map((row) => SimSexoModel.clone(row));
        return this.http.post<any>(this.simSexoUrl, _rows).pipe(
            
            tap((rrows: SimSexoModel) => this.log(`pasted rows in SimSexo `)),
            catchError((error) => this.handleError("addSimSexo", error))
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

    /** Log a SimSexoService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimSexoService: ${message}`);
        console.log(`SimSexoService: ${message}`);
    }

}
