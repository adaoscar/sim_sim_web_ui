// SimDepartamento - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimDepartamentoModel } from './sim.departamento.model';
import { SimDepartamentoService } from './sim.departamento.service';


describe('SimDepartamentoService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimDepartamentoService;

    let rowBase = {
        SimDepartamentoId: 134,
        SimDepartamentoCodigo: 99,
        SimDepartamentoNombre: `VICHADA`,
        SimDepartamentoEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimDepartamentoService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimDepartamentoModel(rowBase);

        service.getById(row.SimDepartamentoId).subscribe((value) => {
			    expect(value.SimDepartamentoId).toBe(row.SimDepartamentoId);
			    expect(value.SimDepartamentoCodigo).toBe(row.SimDepartamentoCodigo);
			    expect(value.SimDepartamentoNombre).toBe(row.SimDepartamentoNombre);
			    expect(value.SimDepartamentoEstado).toBe(row.SimDepartamentoEstado);
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

        let row = new SimDepartamentoModel(rowBase);

        service.getById(row.SimDepartamentoId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimDepartamentoModel ${JSON.stringify(error)}`);
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

        let row = new SimDepartamentoModel(rowBase);
        row._estado = 'N';
        delete row.SimDepartamentoId;

        //Add - SimDepartamento
        service.save(row, row).subscribe(value => {
			    expect(value.SimDepartamentoCodigo).toBe(row.SimDepartamentoCodigo);
			    expect(value.SimDepartamentoNombre).toBe(row.SimDepartamentoNombre);
			    expect(value.SimDepartamentoEstado).toBe(row.SimDepartamentoEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimDepartamentoModel(rowBase);
        row._estado = 'O';
        delete row.SimDepartamentoId;

        //Update - SimDepartamento
        service.save(row, row).subscribe(value => {
			    expect(value.SimDepartamentoCodigo).toBe(row.SimDepartamentoCodigo);
			    expect(value.SimDepartamentoNombre).toBe(row.SimDepartamentoNombre);
			    expect(value.SimDepartamentoEstado).toBe(row.SimDepartamentoEstado);
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

        let row = new SimDepartamentoModel({});
        row.SimDepartamentoId = -1;

        row._estado = 'O';

        //Update - SimDepartamento
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimDepartamentoModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimDepartamentoModel(rowBase);
        row._estado = 'O';
        delete row.SimDepartamentoId;

        //Delete - SimDepartamento
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

        let row = new SimDepartamentoModel({});
        row._estado = 'O';
        row.SimDepartamentoId = -1;

        //Delete - SimDepartamento
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
