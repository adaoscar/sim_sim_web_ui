// SimPeriodoDias - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimPeriodoDiasModel } from './sim.periododias.model';
import { SimPeriodoDiasService } from './sim.periododias.service';


describe('SimPeriodoDiasService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimPeriodoDiasService;

    let rowBase = {
        SimPeriodoDiasId: 1234,
        SimPeriodoDiasCodigo: 1234,
        SimPeriodoDiasNombre: `Por Asignar`,
        SimPeriodoDiasEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimPeriodoDiasService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimPeriodoDiasModel(rowBase);

        service.getById(row.SimPeriodoDiasId).subscribe((value) => {
			    expect(value.SimPeriodoDiasId).toBe(row.SimPeriodoDiasId);
			    expect(value.SimPeriodoDiasCodigo).toBe(row.SimPeriodoDiasCodigo);
			    expect(value.SimPeriodoDiasNombre).toBe(row.SimPeriodoDiasNombre);
			    expect(value.SimPeriodoDiasEstado).toBe(row.SimPeriodoDiasEstado);
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

        let row = new SimPeriodoDiasModel(rowBase);

        service.getById(row.SimPeriodoDiasId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimPeriodoDiasModel ${JSON.stringify(error)}`);
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

        let row = new SimPeriodoDiasModel(rowBase);
        row._estado = 'N';
        delete row.SimPeriodoDiasId;

        //Add - SimPeriodoDias
        service.save(row, row).subscribe(value => {
			    expect(value.SimPeriodoDiasCodigo).toBe(row.SimPeriodoDiasCodigo);
			    expect(value.SimPeriodoDiasNombre).toBe(row.SimPeriodoDiasNombre);
			    expect(value.SimPeriodoDiasEstado).toBe(row.SimPeriodoDiasEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimPeriodoDiasModel(rowBase);
        row._estado = 'O';
        delete row.SimPeriodoDiasId;

        //Update - SimPeriodoDias
        service.save(row, row).subscribe(value => {
			    expect(value.SimPeriodoDiasCodigo).toBe(row.SimPeriodoDiasCodigo);
			    expect(value.SimPeriodoDiasNombre).toBe(row.SimPeriodoDiasNombre);
			    expect(value.SimPeriodoDiasEstado).toBe(row.SimPeriodoDiasEstado);
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

        let row = new SimPeriodoDiasModel({});
        row.SimPeriodoDiasId = -1;

        row._estado = 'O';

        //Update - SimPeriodoDias
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimPeriodoDiasModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimPeriodoDiasModel(rowBase);
        row._estado = 'O';
        delete row.SimPeriodoDiasId;

        //Delete - SimPeriodoDias
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

        let row = new SimPeriodoDiasModel({});
        row._estado = 'O';
        row.SimPeriodoDiasId = -1;

        //Delete - SimPeriodoDias
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
