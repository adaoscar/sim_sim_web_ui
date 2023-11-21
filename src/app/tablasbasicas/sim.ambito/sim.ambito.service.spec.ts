// SimAmbito - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimAmbitoModel } from './sim.ambito.model';
import { SimAmbitoService } from './sim.ambito.service';


describe('SimAmbitoService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimAmbitoService;

    let rowBase = {
        SimAmbitoId: 1234,
        SimAmbitoCodigo: 1234,
        SimAmbitoNombre: `Ámbito familiar conviviente`,
        SimAmbitoEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimAmbitoService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimAmbitoModel(rowBase);

        service.getById(row.SimAmbitoId).subscribe((value) => {
			    expect(value.SimAmbitoId).toBe(row.SimAmbitoId);
			    expect(value.SimAmbitoCodigo).toBe(row.SimAmbitoCodigo);
			    expect(value.SimAmbitoNombre).toBe(row.SimAmbitoNombre);
			    expect(value.SimAmbitoEstado).toBe(row.SimAmbitoEstado);
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

        let row = new SimAmbitoModel(rowBase);

        service.getById(row.SimAmbitoId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimAmbitoModel ${JSON.stringify(error)}`);
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

        let row = new SimAmbitoModel(rowBase);
        row._estado = 'N';
        delete row.SimAmbitoId;

        //Add - SimAmbito
        service.save(row, row).subscribe(value => {
			    expect(value.SimAmbitoCodigo).toBe(row.SimAmbitoCodigo);
			    expect(value.SimAmbitoNombre).toBe(row.SimAmbitoNombre);
			    expect(value.SimAmbitoEstado).toBe(row.SimAmbitoEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimAmbitoModel(rowBase);
        row._estado = 'O';
        delete row.SimAmbitoId;

        //Update - SimAmbito
        service.save(row, row).subscribe(value => {
			    expect(value.SimAmbitoCodigo).toBe(row.SimAmbitoCodigo);
			    expect(value.SimAmbitoNombre).toBe(row.SimAmbitoNombre);
			    expect(value.SimAmbitoEstado).toBe(row.SimAmbitoEstado);
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

        let row = new SimAmbitoModel({});
        row.SimAmbitoId = -1;

        row._estado = 'O';

        //Update - SimAmbito
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimAmbitoModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimAmbitoModel(rowBase);
        row._estado = 'O';
        delete row.SimAmbitoId;

        //Delete - SimAmbito
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

        let row = new SimAmbitoModel({});
        row._estado = 'O';
        row.SimAmbitoId = -1;

        //Delete - SimAmbito
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
