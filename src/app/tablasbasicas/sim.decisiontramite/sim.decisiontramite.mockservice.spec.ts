import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SimDecisionTramiteModel } from './sim.decisiontramite.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class SimDecisionTramiteMockService {
    rows: Array<SimDecisionTramiteModel> = [];
    autoincrement = this.rows.length;

    constructor() { }

    getById(simDecisionTramiteId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.SimDecisionTramiteId === simDecisionTramiteId);

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

    add(row: SimDecisionTramiteModel): Observable<SimDecisionTramiteModel> {
        let _row = SimDecisionTramiteModel.clone(row);
        _row.SimDecisionTramiteId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: SimDecisionTramiteModel, original: SimDecisionTramiteModel): Observable<SimDecisionTramiteModel> {
        const inx = this.rows.findIndex((x) => x.SimDecisionTramiteId === original.SimDecisionTramiteId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = SimDecisionTramiteModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: SimDecisionTramiteModel, original: SimDecisionTramiteModel): Observable<SimDecisionTramiteModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimDecisionTramiteModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.SimDecisionTramiteId === row.SimDecisionTramiteId);

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

    saveRows(rows: Array<SimDecisionTramiteModel>): Observable<any> {
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

    /** Log a SimDecisionTramiteService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimDecisionTramiteService: ${message}`);
        console.log(`SimDecisionTramiteService: ${message}`);
    }

}
