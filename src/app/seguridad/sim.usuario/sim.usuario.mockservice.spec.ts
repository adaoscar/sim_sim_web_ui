import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SimUsuarioModel } from './sim.usuario.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class SimUsuarioMockService {
    rows: Array<SimUsuarioModel> = [];
    autoincrement = this.rows.length;

    rowsSimTipoDocumento: Array<any> = [{
        SimTipoDocumentoId: 47,
        SimTipoDocumentoNombre: "Cedula"
    }];

    constructor() { }

    getById(simUsuarioId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.SimUsuarioId === simUsuarioId);

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

    getList(filter: string,
            paginator: any,
            sort: any): Observable<any> {

        let _filtered = [...this.rows];

        if (filter) {
            const _filter = new Function("x", `return ${filter};`);
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

    add(row: SimUsuarioModel): Observable<SimUsuarioModel> {
        let _row = SimUsuarioModel.clone(row);
        _row.SimUsuarioId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: SimUsuarioModel, original: SimUsuarioModel): Observable<SimUsuarioModel> {
        const inx = this.rows.findIndex((x) => x.SimUsuarioId === original.SimUsuarioId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = SimUsuarioModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: SimUsuarioModel, original: SimUsuarioModel): Observable<SimUsuarioModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: SimUsuarioModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.SimUsuarioId === row.SimUsuarioId);

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

    saveRows(rows: Array<SimUsuarioModel>): Observable<any> {
        const _rows = rows.map((row) => this.add(row));
        return of(_rows);
    }

    filterSimTipoDocumentoNombre(val: string, pageSize: number = 10): Observable<any> {
        let _filtered = this.rowsSimTipoDocumento.filter((x) => x.SimTipoDocumentoNombre.includes(val)).slice(0, pageSize);
        
        return of(_filtered);
    }

    getByIdSimTipoDocumentoNombre(simTipoDocumentoId: number): Observable<any> {
        let _filtered = this.rowsSimTipoDocumento.filter((x) => x.SimTipoDocumentoId === simTipoDocumentoId);

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

    /** Log a SimUsuarioService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`SimUsuarioService: ${message}`);
        console.log(`SimUsuarioService: ${message}`);
    }

}
