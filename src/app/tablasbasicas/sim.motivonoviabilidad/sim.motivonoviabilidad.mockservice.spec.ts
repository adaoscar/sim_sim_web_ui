import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SimMotivoNoViabilidadModel } from './sim.motivonoviabilidad.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class SimMotivoNoViabilidadMockService {
    rows: Array<SimMotivoNoViabilidadModel> = [];
    autoincrement = this.rows.length;

    constructor() { }

    getById(simMotivoNoViabilidadId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.SimMotivoNoViabilidadId === simMotivoNoViabilidadId);

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

    add(row: SimMotivoNoViabilidadModel): Observable<SimMotivoNoViabilidadModel> {
        let _row = SimMotivoNoViabilidadModel.clone(row);
        _row.SimMotivoNoViabilidadId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: SimMotivoNoViabilidadModel, original: SimMotivoNoViabilidadModel): Observable<SimMotivoNoViabilidadModel> {
        const inx = this.rows.findIndex((x) => x.SimMotivoNoViabilidadId === original.SimMotivoNoViabilidadId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = SimMotivoNoViabilidadModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: SimMotivoNoViabilidadModel, original: SimMotivoNoViabilidadModel): Observable<SimMotivoNoViabilidadModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimMotivoNoViabilidadModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.SimMotivoNoViabilidadId === row.SimMotivoNoViabilidadId);

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

    saveRows(rows: Array<SimMotivoNoViabilidadModel>): Observable<any> {
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

    /** Log a SimMotivoNoViabilidadService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimMotivoNoViabilidadService: ${message}`);
        console.log(`SimMotivoNoViabilidadService: ${message}`);
    }

}
