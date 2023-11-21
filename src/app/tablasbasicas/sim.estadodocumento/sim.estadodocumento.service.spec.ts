// SimEstadoDocumento - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimEstadoDocumentoModel } from './sim.estadodocumento.model';
import { SimEstadoDocumentoService } from './sim.estadodocumento.service';


describe('SimEstadoDocumentoService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimEstadoDocumentoService;

    let rowBase = {
        SimEstadoDocumentoId: 1234,
        SimEstadoDocumentoCodigo: 1234,
        SimEstadoDocumentoNombre: `Negra. Palenquera y Afrodescendiente`,
        SimEstadoDocumentoEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimEstadoDocumentoService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimEstadoDocumentoModel(rowBase);

        service.getById(row.SimEstadoDocumentoId).subscribe((value) => {
			    expect(value.SimEstadoDocumentoId).toBe(row.SimEstadoDocumentoId);
			    expect(value.SimEstadoDocumentoCodigo).toBe(row.SimEstadoDocumentoCodigo);
			    expect(value.SimEstadoDocumentoNombre).toBe(row.SimEstadoDocumentoNombre);
			    expect(value.SimEstadoDocumentoEstado).toBe(row.SimEstadoDocumentoEstado);
          done();
        });
    });

    it('#getById should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = new SimEstadoDocumentoModel(rowBase);

        service.getById(row.SimEstadoDocumentoId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimEstadoDocumentoModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });

    it('#getAll should return array of rows', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({ value: [rowBase, rowBase] }));

        service.getAll().subscribe(value => {
            let result = value?.value;
            expect(result?.length).toEqual(2);
            done();
        });
    });

    it('#getList return array of rows', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({ value: [rowBase, rowBase] }));

        let filter = {
            value: '',
            condition: '',
            column: '',
            generate: (filter) => filter
        };

        let paginator = {
            pageIndex: 0,
            pageSize: 10
        };

        let sort = {
            active: '',
            direction: ''
        };

        service.getList(filter, <any>paginator, <any>sort).subscribe(value => {
            let result = value?.value;
            expect(result?.length).toEqual(2);
            done();
        });
    });

    it('#save-Add should return a Add row', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(asyncData(rowBase));

        let row = new SimEstadoDocumentoModel(rowBase);
        row._estado = 'N';
        delete row.SimEstadoDocumentoId;

        //Add - SimEstadoDocumento
        service.save(row, row).subscribe(value => {
			    expect(value.SimEstadoDocumentoCodigo).toBe(row.SimEstadoDocumentoCodigo);
			    expect(value.SimEstadoDocumentoNombre).toBe(row.SimEstadoDocumentoNombre);
			    expect(value.SimEstadoDocumentoEstado).toBe(row.SimEstadoDocumentoEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimEstadoDocumentoModel(rowBase);
        row._estado = 'O';
        delete row.SimEstadoDocumentoId;

        //Update - SimEstadoDocumento
        service.save(row, row).subscribe(value => {
			    expect(value.SimEstadoDocumentoCodigo).toBe(row.SimEstadoDocumentoCodigo);
			    expect(value.SimEstadoDocumentoNombre).toBe(row.SimEstadoDocumentoNombre);
			    expect(value.SimEstadoDocumentoEstado).toBe(row.SimEstadoDocumentoEstado);
            done();
        });
    });

    it('#save-update should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.patch.and.returnValue(asyncError(errorResponse));

        let row = new SimEstadoDocumentoModel({});
        row.SimEstadoDocumentoId = -1;

        row._estado = 'O';

        //Update - SimEstadoDocumento
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimEstadoDocumentoModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimEstadoDocumentoModel(rowBase);
        row._estado = 'O';
        delete row.SimEstadoDocumentoId;

        //Delete - SimEstadoDocumento
        service.delete(row).subscribe(value => {
            expect(value).toBe(true);
            done();
        });
    });

    it('#delete should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.delete.and.returnValue(asyncError(errorResponse));

        let row = new SimEstadoDocumentoModel({});
        row._estado = 'O';
        row.SimEstadoDocumentoId = -1;

        //Delete - SimEstadoDocumento
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
