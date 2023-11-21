import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SimEstadoAsignacionModel } from './sim.estadoasignacion.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class SimEstadoAsignacionMockService {
    rows: Array<SimEstadoAsignacionModel> = [];
    autoincrement = this.rows.length;

    constructor() { }

    getById(simEstadoAsignacionId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.SimEstadoAsignacionId === simEstadoAsignacionId);

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

    add(row: SimEstadoAsignacionModel): Observable<SimEstadoAsignacionModel> {
        let _row = SimEstadoAsignacionModel.clone(row);
        _row.SimEstadoAsignacionId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: SimEstadoAsignacionModel, original: SimEstadoAsignacionModel): Observable<SimEstadoAsignacionModel> {
        const inx = this.rows.findIndex((x) => x.SimEstadoAsignacionId === original.SimEstadoAsignacionId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = SimEstadoAsignacionModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: SimEstadoAsignacionModel, original: SimEstadoAsignacionModel): Observable<SimEstadoAsignacionModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimEstadoAsignacionModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.SimEstadoAsignacionId === row.SimEstadoAsignacionId);

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

    saveRows(rows: Array<SimEstadoAsignacionModel>): Observable<any> {
        const _rows = rows.map((row) => this.add(row));
        return of(_rows);
    }

    private handleError(operation = 'operation', result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.error(result.error); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${result.message}`);

          // Let the app keep running by returning an empty result.
          return of(result);
    }

    /** Log a SimEstadoAsignacionService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimEstadoAsignacionService: ${message}`);
        console.log(`SimEstadoAsignacionService: ${message}`);
    }

}
