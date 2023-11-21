import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { SimMunicipioModel } from './sim.municipio.model';

@Injectable({ providedIn: 'root' })
export class SimMunicipioService {
    private simMunicipioUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.simMunicipioUrl = `${environment.dataServiceUrl}/odata/SimMunicipio`;
    }

    getById(simMunicipioId: number): Observable<any> {
        const sUrl = `${this.simMunicipioUrl}(SimMunicipioId=${simMunicipioId})`;

        return this.http.get<any>(sUrl).pipe(
            
            tap(() => this.log("fetched SimMunicipio")),
            catchError((error) => this.handleError("getSimMunicipio", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        params["$expand"] = "SimDepartamento,SiceqAutoridadJudicial";

        return this.http.get<any>(this.simMunicipioUrl, { params }).pipe(
            
            tap(row => this.log('fetched SimMunicipio')),
            catchError((error) => this.handleError('getSimMunicipioList', error))
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

        params["$expand"] = "SimDepartamento,SiceqAutoridadJudicial";

        return this.http.get<any>(this.simMunicipioUrl, { params }).pipe(    
            
            tap(row => this.log("fetched SimMunicipio")),
            catchError((error) => this.handleError('getSimMunicipioList', error))
        );
    }

    add(row: SimMunicipioModel): Observable<SimMunicipioModel> {
        return this.http.post<SimMunicipioModel>(this.simMunicipioUrl, SimMunicipioModel.clone(row)).pipe(
            
            tap((_row: SimMunicipioModel) => this.log(`added SimMunicipio w/ id=${_row.SimMunicipioId}`)),
            catchError((error) => this.handleError("addSimMunicipio", error))
        );
    }

    update(row: SimMunicipioModel, original: SimMunicipioModel): Observable<SimMunicipioModel> {
        const sUrl = `${this.simMunicipioUrl}(SimMunicipioId=${original.SimMunicipioId})`;
    
        return this.http.patch<SimMunicipioModel>(sUrl, SimMunicipioModel.clone(row)).pipe(
            
            tap(_ => this.log(`update SimMunicipio id=${row.SimMunicipioId}`)),
            catchError((error) => this.handleError("updateSimMunicipio", error))
        );
    }

    save(row: SimMunicipioModel, original: SimMunicipioModel): Observable<SimMunicipioModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimMunicipioModel): Observable<any> {
        const sUrl = `${this.simMunicipioUrl}(SimMunicipioId=${row.SimMunicipioId})`;

        return this.http.delete(sUrl).pipe(
            
            tap(_ => this.log(`filter SimMunicipio id=${row.SimMunicipioId}`)),
            catchError((error) => this.handleError("deleteSimMunicipio", error))
        );
    }

    saveRows(rows: Array<SimMunicipioModel>): Observable<any> {
        const _rows = rows.map((row) => SimMunicipioModel.clone(row));
        return this.http.post<any>(this.simMunicipioUrl, _rows).pipe(
            
            tap((rrows: SimMunicipioModel) => this.log(`pasted rows in SimMunicipio `)),
            catchError((error) => this.handleError("addSimMunicipio", error))
        );
    }

    filterSimDepartamentoNombre(val: string, pageSize: number = 10): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SimDepartamento`;

        let params: any = { };
        
        params["$filter"] = `contains(SimDepartamentoNombre,'${val}')`;
        params["$top"] = pageSize;

        return this.http.get<any>(sUrl, {params: params}).pipe(
            
            tap(_ => this.log(`filter SimDepartamentoNombre id=${val}`)),
            catchError((error) => this.handleError("filterSimDepartamentoNombre", error))
        );
    }

    getByIdSimDepartamentoNombre(simDepartamentoId: number): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SimDepartamento(SimDepartamentoId=${simDepartamentoId})`;

        return this.http.get<any>(sUrl, { }).pipe(
            
            tap(_ => this.log(`getById SimDepartamentoNombre SimDepartamentoId=${simDepartamentoId}`)),
            catchError((error) => this.handleError("getByIdSimDepartamentoNombre", error))
        );
    }

    filterSimMunicipioNombre(val: string, pageSize: number = 10): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SiceqAutoridadJudicial`;

        let params: any = { };
        
        params["$filter"] = `contains(SimMunicipioNombre,'${val}')`;
        params["$top"] = pageSize;

        return this.http.get<any>(sUrl, {params: params}).pipe(
            
            tap(_ => this.log(`filter SimMunicipioNombre id=${val}`)),
            catchError((error) => this.handleError("filterSimMunicipioNombre", error))
        );
    }

    getByIdSimMunicipioNombre(siceqAutoridadJudicialId: number): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/SiceqAutoridadJudicial(SiceqAutoridadJudicialId=${siceqAutoridadJudicialId})`;

        return this.http.get<any>(sUrl, { }).pipe(
            
            tap(_ => this.log(`getById SimMunicipioNombre SiceqAutoridadJudicialId=${siceqAutoridadJudicialId}`)),
            catchError((error) => this.handleError("getByIdSimMunicipioNombre", error))
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

    /** Log a SimMunicipioService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimMunicipioService: ${message}`);
        console.log(`SimMunicipioService: ${message}`);
    }

}
