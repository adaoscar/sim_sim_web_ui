import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SimMunicipioModel } from './sim.municipio.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class SimMunicipioMockService {
    rows: Array<SimMunicipioModel> = [];
    autoincrement = this.rows.length;

    rowsSimDepartamento: Array<any> = [{
        SimDepartamentoId: 45,
        SimDepartamentoNombre: "Vichada"
    }];

    rowsSiceqAutoridadJudicial: Array<any> = [{
        SiceqAutoridadJudicialId: 135,
        SimMunicipioNombre: "ZONA BANANERA"
    }];

    constructor() { }

    getById(simMunicipioId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.SimMunicipioId === simMunicipioId);

        let _row = <any>{};

        if (_filtered.length) {
            _row = _filtered[0];
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }
        
        return of(_row);
    }

    getAll(): Observable<any> {
        return of({
            "@odata.count": this.rows.length,
            value: this.rows        
        });
    }

    getList(filter: {
                value: any,
                condition: string,
                column: string,
                generate: any
            },
            paginator: any,
            sort: any): Observable<any> {

        let _filtered = [...this.rows];

        if (filter.column) {
            const _filter = new Function("x", `return x.${filter.column} ${filter.condition} "${filter.value}";`);
            _filtered = this.rows.filter((x) => _filter(x));
        }

        if (sort?.active) {
            const _sort = new Function("a", "b", `return (a.${sort.active.column} === b.${sort.active.column}])?0:((a.${sort.active.column}] > b.${sort.active.column}])?1:-1);`);
            _filtered = _filtered.sort((a, b) => _sort(a, b));
            if(sort.direction === "desc") {
                _filtered = _filtered.reverse();
            }
        }

        _filtered = _filtered.slice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);
        return of({
            "@odata.count": _filtered.length,
            value: _filtered        
        });
    }

    add(row: SimMunicipioModel): Observable<SimMunicipioModel> {
        let _row = SimMunicipioModel.clone(row);
        _row.SimMunicipioId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: SimMunicipioModel, original: SimMunicipioModel): Observable<SimMunicipioModel> {
        const inx = this.rows.findIndex((x) => x.SimMunicipioId === original.SimMunicipioId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = SimMunicipioModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: SimMunicipioModel, original: SimMunicipioModel): Observable<SimMunicipioModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimMunicipioModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.SimMunicipioId === row.SimMunicipioId);

        let _row = null;

        if (inx >= 0) {
            this.rows.splice(inx, 1);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    saveRows(rows: Array<SimMunicipioModel>): Observable<any> {
        const _rows = rows.map((row) => this.add(row));
        return of(_rows);
    }

    filterSimDepartamentoNombre(val: string, pageSize: number = 10): Observable<any> {
        let _filtered = this.rowsSimDepartamento.filter((x) => x.SimDepartamentoNombre.includes(val)).slice(0, pageSize);
        
        return of(_filtered);
    }

    getByIdSimDepartamentoNombre(simDepartamentoId: number): Observable<any> {
        let _filtered = this.rowsSimDepartamento.filter((x) => x.SimDepartamentoId === simDepartamentoId);

        let _row = null;

        if (_filtered.length) {
            _row = _filtered[0];
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
        }

        return of(_row);
    }

    filterSimMunicipioNombre(val: string, pageSize: number = 10): Observable<any> {
        let _filtered = this.rowsSiceqAutoridadJudicial.filter((x) => x.SimMunicipioNombre.includes(val)).slice(0, pageSize);
        
        return of(_filtered);
    }

    getByIdSimMunicipioNombre(siceqAutoridadJudicialId: number): Observable<any> {
        let _filtered = this.rowsSiceqAutoridadJudicial.filter((x) => x.SiceqAutoridadJudicialId === siceqAutoridadJudicialId);

        let _row = null;

        if (_filtered.length) {
            _row = _filtered[0];
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
        }

        return of(_row);
    }

    private handleError(operation = 'operation', result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.error(result.error); // log to console instead

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
