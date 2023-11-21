// SimMotivoNoViabilidad - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimMotivoNoViabilidadModel } from './sim.motivonoviabilidad.model';
import { SimMotivoNoViabilidadService } from './sim.motivonoviabilidad.service';


describe('SimMotivoNoViabilidadService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimMotivoNoViabilidadService;

    let rowBase = {
        SimMotivoNoViabilidadId: 1234,
        SimMotivoNoViabilidadCodigo: 1234,
        SimMotivoNoViabilidadNombre: `Condena a prisión perpetua`,
        SimMotivoNoViabilidadEstado: true,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimMotivoNoViabilidadService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimMotivoNoViabilidadModel(rowBase);

        service.getById(row.SimMotivoNoViabilidadId).subscribe((value) => {
			    expect(value.SimMotivoNoViabilidadId).toBe(row.SimMotivoNoViabilidadId);
			    expect(value.SimMotivoNoViabilidadCodigo).toBe(row.SimMotivoNoViabilidadCodigo);
			    expect(value.SimMotivoNoViabilidadNombre).toBe(row.SimMotivoNoViabilidadNombre);
			    expect(value.SimMotivoNoViabilidadEstado).toBe(row.SimMotivoNoViabilidadEstado);
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

        let row = new SimMotivoNoViabilidadModel(rowBase);

        service.getById(row.SimMotivoNoViabilidadId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimMotivoNoViabilidadModel ${JSON.stringify(error)}`);
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

        let row = new SimMotivoNoViabilidadModel(rowBase);
        row._estado = 'N';
        delete row.SimMotivoNoViabilidadId;

        //Add - SimMotivoNoViabilidad
        service.save(row, row).subscribe(value => {
			    expect(value.SimMotivoNoViabilidadCodigo).toBe(row.SimMotivoNoViabilidadCodigo);
			    expect(value.SimMotivoNoViabilidadNombre).toBe(row.SimMotivoNoViabilidadNombre);
			    expect(value.SimMotivoNoViabilidadEstado).toBe(row.SimMotivoNoViabilidadEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimMotivoNoViabilidadModel(rowBase);
        row._estado = 'O';
        delete row.SimMotivoNoViabilidadId;

        //Update - SimMotivoNoViabilidad
        service.save(row, row).subscribe(value => {
			    expect(value.SimMotivoNoViabilidadCodigo).toBe(row.SimMotivoNoViabilidadCodigo);
			    expect(value.SimMotivoNoViabilidadNombre).toBe(row.SimMotivoNoViabilidadNombre);
			    expect(value.SimMotivoNoViabilidadEstado).toBe(row.SimMotivoNoViabilidadEstado);
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

        let row = new SimMotivoNoViabilidadModel({});
        row.SimMotivoNoViabilidadId = -1;

        row._estado = 'O';

        //Update - SimMotivoNoViabilidad
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimMotivoNoViabilidadModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimMotivoNoViabilidadModel(rowBase);
        row._estado = 'O';
        delete row.SimMotivoNoViabilidadId;

        //Delete - SimMotivoNoViabilidad
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

        let row = new SimMotivoNoViabilidadModel({});
        row._estado = 'O';
        row.SimMotivoNoViabilidadId = -1;

        //Delete - SimMotivoNoViabilidad
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
