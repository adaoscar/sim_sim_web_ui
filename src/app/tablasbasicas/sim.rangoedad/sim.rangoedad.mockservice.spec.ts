import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SimRangoEdadModel } from './sim.rangoedad.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class SimRangoEdadMockService {
    rows: Array<SimRangoEdadModel> = [];
    autoincrement = this.rows.length;

    constructor() { }

    getById(simRangoEdadId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.SimRangoEdadId === simRangoEdadId);

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

    add(row: SimRangoEdadModel): Observable<SimRangoEdadModel> {
        let _row = SimRangoEdadModel.clone(row);
        _row.SimRangoEdadId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: SimRangoEdadModel, original: SimRangoEdadModel): Observable<SimRangoEdadModel> {
        const inx = this.rows.findIndex((x) => x.SimRangoEdadId === original.SimRangoEdadId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = SimRangoEdadModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: SimRangoEdadModel, original: SimRangoEdadModel): Observable<SimRangoEdadModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimRangoEdadModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.SimRangoEdadId === row.SimRangoEdadId);

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

    saveRows(rows: Array<SimRangoEdadModel>): Observable<any> {
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

    /** Log a SimRangoEdadService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimRangoEdadService: ${message}`);
        console.log(`SimRangoEdadService: ${message}`);
    }

}
