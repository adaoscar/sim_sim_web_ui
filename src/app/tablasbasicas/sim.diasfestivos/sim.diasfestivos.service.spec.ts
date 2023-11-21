// SimDiasFestivos - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimDiasFestivosModel } from './sim.diasfestivos.model';
import { SimDiasFestivosService } from './sim.diasfestivos.service';


describe('SimDiasFestivosService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimDiasFestivosService;

    let rowBase = {
        SimDiasFestivosId: 1234,
        SimDiasFestivosFecha: new Date(2020, 9, 26, 12, 0, 0),
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimDiasFestivosService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimDiasFestivosModel(rowBase);

        service.getById(row.SimDiasFestivosId).subscribe((value) => {
			    expect(value.SimDiasFestivosId).toBe(row.SimDiasFestivosId);
			    expect(new Date(value.SimDiasFestivosFecha)).toEqual(row.SimDiasFestivosFecha);
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

        let row = new SimDiasFestivosModel(rowBase);

        service.getById(row.SimDiasFestivosId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimDiasFestivosModel ${JSON.stringify(error)}`);
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

        let filter = '';

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

        let row = new SimDiasFestivosModel(rowBase);
        row._estado = 'N';
        delete row.SimDiasFestivosId;

        //Add - SimDiasFestivos
        service.save(row, row).subscribe(value => {
			    expect(new Date(value.SimDiasFestivosFecha)).toEqual(row.SimDiasFestivosFecha);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimDiasFestivosModel(rowBase);
        row._estado = 'O';
        delete row.SimDiasFestivosId;

        //Update - SimDiasFestivos
        service.save(row, row).subscribe(value => {
			    expect(new Date(value.SimDiasFestivosFecha)).toEqual(row.SimDiasFestivosFecha);
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

        let row = new SimDiasFestivosModel({});
        row.SimDiasFestivosId = -1;

        row._estado = 'O';

        //Update - SimDiasFestivos
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimDiasFestivosModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimDiasFestivosModel(rowBase);
        row._estado = 'O';
        delete row.SimDiasFestivosId;

        //Delete - SimDiasFestivos
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

        let row = new SimDiasFestivosModel({});
        row._estado = 'O';
        row.SimDiasFestivosId = -1;

        //Delete - SimDiasFestivos
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
