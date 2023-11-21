// SimEstadoAsignacion - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimEstadoAsignacionModel } from './sim.estadoasignacion.model';
import { SimEstadoAsignacionService } from './sim.estadoasignacion.service';


describe('SimEstadoAsignacionService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimEstadoAsignacionService;

    let rowBase = {
        SimEstadoAsignacionId: 1234,
        SimEstadoAsignacionCodigo: 1234,
        SimEstadoAsignacionNombre: `Por Asignar`,
        SimEstadoAsignacionEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimEstadoAsignacionService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimEstadoAsignacionModel(rowBase);

        service.getById(row.SimEstadoAsignacionId).subscribe((value) => {
			    expect(value.SimEstadoAsignacionId).toBe(row.SimEstadoAsignacionId);
			    expect(value.SimEstadoAsignacionCodigo).toBe(row.SimEstadoAsignacionCodigo);
			    expect(value.SimEstadoAsignacionNombre).toBe(row.SimEstadoAsignacionNombre);
			    expect(value.SimEstadoAsignacionEstado).toBe(row.SimEstadoAsignacionEstado);
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

        let row = new SimEstadoAsignacionModel(rowBase);

        service.getById(row.SimEstadoAsignacionId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimEstadoAsignacionModel ${JSON.stringify(error)}`);
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

        let row = new SimEstadoAsignacionModel(rowBase);
        row._estado = 'N';
        delete row.SimEstadoAsignacionId;

        //Add - SimEstadoAsignacion
        service.save(row, row).subscribe(value => {
			    expect(value.SimEstadoAsignacionCodigo).toBe(row.SimEstadoAsignacionCodigo);
			    expect(value.SimEstadoAsignacionNombre).toBe(row.SimEstadoAsignacionNombre);
			    expect(value.SimEstadoAsignacionEstado).toBe(row.SimEstadoAsignacionEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimEstadoAsignacionModel(rowBase);
        row._estado = 'O';
        delete row.SimEstadoAsignacionId;

        //Update - SimEstadoAsignacion
        service.save(row, row).subscribe(value => {
			    expect(value.SimEstadoAsignacionCodigo).toBe(row.SimEstadoAsignacionCodigo);
			    expect(value.SimEstadoAsignacionNombre).toBe(row.SimEstadoAsignacionNombre);
			    expect(value.SimEstadoAsignacionEstado).toBe(row.SimEstadoAsignacionEstado);
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

        let row = new SimEstadoAsignacionModel({});
        row.SimEstadoAsignacionId = -1;

        row._estado = 'O';

        //Update - SimEstadoAsignacion
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimEstadoAsignacionModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimEstadoAsignacionModel(rowBase);
        row._estado = 'O';
        delete row.SimEstadoAsignacionId;

        //Delete - SimEstadoAsignacion
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

        let row = new SimEstadoAsignacionModel({});
        row._estado = 'O';
        row.SimEstadoAsignacionId = -1;

        //Delete - SimEstadoAsignacion
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
