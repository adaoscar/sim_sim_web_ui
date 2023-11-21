// SimConsultarAuditoria - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimConsultarAuditoriaModel } from './sim.consultarauditoria.model';
import { SimConsultarAuditoriaService } from './sim.consultarauditoria.service';


describe('SimConsultarAuditoriaService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimConsultarAuditoriaService;

    let rowBase = {
        SimConsultarAuditoriaId: 1234,
        SimUsuarioId: 94,
        SimConsultarAuditoriaRol: `Armando escandalo de los rios`,
        SimConsultarAuditoriaFechaIngreso: new Date(2020, 12, 12, 10, 0, 0),
        SimConsultarAuditoriaAplicacion: `Asuntos internacionales`,
        SimConsultarAuditoriaModulo: `Repatriaciones`,
        SimConsultarAuditoriaFuncionalidad: `Crear solicitud`,
        SimConsultarAuditoriaAccion: `Ediar`,
        SimConsultarAuditoriaRegistroActual: `Ediar`,
        SimConsultarAuditoriaRegistroModificado: `Ediar............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................. `,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimConsultarAuditoriaService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimConsultarAuditoriaModel(rowBase);

        service.getById(row.SimConsultarAuditoriaId).subscribe((value) => {
			    expect(value.SimConsultarAuditoriaId).toBe(row.SimConsultarAuditoriaId);
			    expect(value.SimUsuarioId).toBe(row.SimUsuarioId);
			    expect(value.SimConsultarAuditoriaRol).toBe(row.SimConsultarAuditoriaRol);
			    expect(value.SimConsultarAuditoriaFechaIngreso).toBe(row.SimConsultarAuditoriaFechaIngreso);
			    expect(value.SimConsultarAuditoriaAplicacion).toBe(row.SimConsultarAuditoriaAplicacion);
			    expect(value.SimConsultarAuditoriaModulo).toBe(row.SimConsultarAuditoriaModulo);
			    expect(value.SimConsultarAuditoriaFuncionalidad).toBe(row.SimConsultarAuditoriaFuncionalidad);
			    expect(value.SimConsultarAuditoriaAccion).toBe(row.SimConsultarAuditoriaAccion);
			    expect(value.SimConsultarAuditoriaRegistroActual).toBe(row.SimConsultarAuditoriaRegistroActual);
			    expect(value.SimConsultarAuditoriaRegistroModificado).toBe(row.SimConsultarAuditoriaRegistroModificado);
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

        let row = new SimConsultarAuditoriaModel(rowBase);

        service.getById(row.SimConsultarAuditoriaId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimConsultarAuditoriaModel ${JSON.stringify(error)}`);
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

        let row = new SimConsultarAuditoriaModel(rowBase);
        row._estado = 'N';
        delete row.SimConsultarAuditoriaId;

        //Add - SimConsultarAuditoria
        service.save(row, row).subscribe(value => {
			    expect(value.SimUsuarioId).toBe(row.SimUsuarioId);
			    expect(value.SimConsultarAuditoriaRol).toBe(row.SimConsultarAuditoriaRol);
			    expect(value.SimConsultarAuditoriaFechaIngreso).toBe(row.SimConsultarAuditoriaFechaIngreso);
			    expect(value.SimConsultarAuditoriaAplicacion).toBe(row.SimConsultarAuditoriaAplicacion);
			    expect(value.SimConsultarAuditoriaModulo).toBe(row.SimConsultarAuditoriaModulo);
			    expect(value.SimConsultarAuditoriaFuncionalidad).toBe(row.SimConsultarAuditoriaFuncionalidad);
			    expect(value.SimConsultarAuditoriaAccion).toBe(row.SimConsultarAuditoriaAccion);
			    expect(value.SimConsultarAuditoriaRegistroActual).toBe(row.SimConsultarAuditoriaRegistroActual);
			    expect(value.SimConsultarAuditoriaRegistroModificado).toBe(row.SimConsultarAuditoriaRegistroModificado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimConsultarAuditoriaModel(rowBase);
        row._estado = 'O';
        delete row.SimConsultarAuditoriaId;

        //Update - SimConsultarAuditoria
        service.save(row, row).subscribe(value => {
			    expect(value.SimUsuarioId).toBe(row.SimUsuarioId);
			    expect(value.SimConsultarAuditoriaRol).toBe(row.SimConsultarAuditoriaRol);
			    expect(value.SimConsultarAuditoriaFechaIngreso).toBe(row.SimConsultarAuditoriaFechaIngreso);
			    expect(value.SimConsultarAuditoriaAplicacion).toBe(row.SimConsultarAuditoriaAplicacion);
			    expect(value.SimConsultarAuditoriaModulo).toBe(row.SimConsultarAuditoriaModulo);
			    expect(value.SimConsultarAuditoriaFuncionalidad).toBe(row.SimConsultarAuditoriaFuncionalidad);
			    expect(value.SimConsultarAuditoriaAccion).toBe(row.SimConsultarAuditoriaAccion);
			    expect(value.SimConsultarAuditoriaRegistroActual).toBe(row.SimConsultarAuditoriaRegistroActual);
			    expect(value.SimConsultarAuditoriaRegistroModificado).toBe(row.SimConsultarAuditoriaRegistroModificado);
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

        let row = new SimConsultarAuditoriaModel({});
        row.SimConsultarAuditoriaId = -1;

        row._estado = 'O';

        //Update - SimConsultarAuditoria
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimConsultarAuditoriaModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimConsultarAuditoriaModel(rowBase);
        row._estado = 'O';
        delete row.SimConsultarAuditoriaId;

        //Delete - SimConsultarAuditoria
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

        let row = new SimConsultarAuditoriaModel({});
        row._estado = 'O';
        row.SimConsultarAuditoriaId = -1;

        //Delete - SimConsultarAuditoria
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
