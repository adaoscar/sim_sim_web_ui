// SimTipoDocumento - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimTipoDocumentoModel } from './sim.tipodocumento.model';
import { SimTipoDocumentoService } from './sim.tipodocumento.service';


describe('SimTipoDocumentoService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimTipoDocumentoService;

    let rowBase = {
        SimTipoDocumentoId: 1234,
        SimTipoDocumentoCodigo: `CC`,
        SimTipoDocumentoNombre: `Cedula de Ciudadania`,
        SimTipoDocumentoEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimTipoDocumentoService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimTipoDocumentoModel(rowBase);

        service.getById(row.SimTipoDocumentoId).subscribe((value) => {
			    expect(value.SimTipoDocumentoId).toBe(row.SimTipoDocumentoId);
			    expect(value.SimTipoDocumentoCodigo).toBe(row.SimTipoDocumentoCodigo);
			    expect(value.SimTipoDocumentoNombre).toBe(row.SimTipoDocumentoNombre);
			    expect(value.SimTipoDocumentoEstado).toBe(row.SimTipoDocumentoEstado);
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

        let row = new SimTipoDocumentoModel(rowBase);

        service.getById(row.SimTipoDocumentoId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimTipoDocumentoModel ${JSON.stringify(error)}`);
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

        let row = new SimTipoDocumentoModel(rowBase);
        row._estado = 'N';
        delete row.SimTipoDocumentoId;

        //Add - SimTipoDocumento
        service.save(row, row).subscribe(value => {
			    expect(value.SimTipoDocumentoCodigo).toBe(row.SimTipoDocumentoCodigo);
			    expect(value.SimTipoDocumentoNombre).toBe(row.SimTipoDocumentoNombre);
			    expect(value.SimTipoDocumentoEstado).toBe(row.SimTipoDocumentoEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimTipoDocumentoModel(rowBase);
        row._estado = 'O';
        delete row.SimTipoDocumentoId;

        //Update - SimTipoDocumento
        service.save(row, row).subscribe(value => {
			    expect(value.SimTipoDocumentoCodigo).toBe(row.SimTipoDocumentoCodigo);
			    expect(value.SimTipoDocumentoNombre).toBe(row.SimTipoDocumentoNombre);
			    expect(value.SimTipoDocumentoEstado).toBe(row.SimTipoDocumentoEstado);
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

        let row = new SimTipoDocumentoModel({});
        row.SimTipoDocumentoId = -1;

        row._estado = 'O';

        //Update - SimTipoDocumento
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimTipoDocumentoModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimTipoDocumentoModel(rowBase);
        row._estado = 'O';
        delete row.SimTipoDocumentoId;

        //Delete - SimTipoDocumento
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

        let row = new SimTipoDocumentoModel({});
        row._estado = 'O';
        row.SimTipoDocumentoId = -1;

        //Delete - SimTipoDocumento
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
