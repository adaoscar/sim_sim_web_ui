// SimUsuario - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimUsuarioModel } from './sim.usuario.model';
import { SimUsuarioService } from './sim.usuario.service';


describe('SimUsuarioService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimUsuarioService;

    let rowBase = {
        SimUsuarioId: 123456789,
        SimTipoDocumentoId: 47,
        SimUsuarioDocumento: `1020749786`,
        SimUsuarioNombres: `John Freddy`,
        SimUsuarioApellidos: `Buitrago Quevedo`,
        SimUsuarioTelefono: `3204754545`,
        SimUsuarioEmail: `prueba@solin.com`,
        SimUsuarioEstado: true,
        SimUsuarioRoles: `administrador`,
        SimTipoDocumento: {
            SimTipoDocumentoId: 47,
            SimTipoDocumentoNombre: `Cedula`
        },
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimUsuarioService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimUsuarioModel(rowBase);

        service.getById(row.SimUsuarioId).subscribe((value) => {
			    expect(value.SimUsuarioId).toBe(row.SimUsuarioId);
			    expect(value.SimTipoDocumentoId).toBe(row.SimTipoDocumentoId);
			    expect(value.SimUsuarioDocumento).toBe(row.SimUsuarioDocumento);
			    expect(value.SimUsuarioNombres).toBe(row.SimUsuarioNombres);
			    expect(value.SimUsuarioApellidos).toBe(row.SimUsuarioApellidos);
			    expect(value.SimUsuarioTelefono).toBe(row.SimUsuarioTelefono);
			    expect(value.SimUsuarioEmail).toBe(row.SimUsuarioEmail);
			    expect(value.SimUsuarioEstado).toBe(row.SimUsuarioEstado);
			    expect(value.SimUsuarioRoles).toBe(row.SimUsuarioRoles);
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

        let row = new SimUsuarioModel(rowBase);

        service.getById(row.SimUsuarioId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimUsuarioModel ${JSON.stringify(error)}`);
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

        let row = new SimUsuarioModel(rowBase);
        row._estado = 'N';
        delete row.SimUsuarioId;

        //Add - SimUsuario
        service.save(row, row).subscribe(value => {
			    expect(value.SimTipoDocumentoId).toBe(row.SimTipoDocumentoId);
			    expect(value.SimUsuarioDocumento).toBe(row.SimUsuarioDocumento);
			    expect(value.SimUsuarioNombres).toBe(row.SimUsuarioNombres);
			    expect(value.SimUsuarioApellidos).toBe(row.SimUsuarioApellidos);
			    expect(value.SimUsuarioTelefono).toBe(row.SimUsuarioTelefono);
			    expect(value.SimUsuarioEmail).toBe(row.SimUsuarioEmail);
			    expect(value.SimUsuarioEstado).toBe(row.SimUsuarioEstado);
			    expect(value.SimUsuarioRoles).toBe(row.SimUsuarioRoles);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimUsuarioModel(rowBase);
        row._estado = 'O';
        delete row.SimUsuarioId;

        //Update - SimUsuario
        service.save(row, row).subscribe(value => {
			    expect(value.SimTipoDocumentoId).toBe(row.SimTipoDocumentoId);
			    expect(value.SimUsuarioDocumento).toBe(row.SimUsuarioDocumento);
			    expect(value.SimUsuarioNombres).toBe(row.SimUsuarioNombres);
			    expect(value.SimUsuarioApellidos).toBe(row.SimUsuarioApellidos);
			    expect(value.SimUsuarioTelefono).toBe(row.SimUsuarioTelefono);
			    expect(value.SimUsuarioEmail).toBe(row.SimUsuarioEmail);
			    expect(value.SimUsuarioEstado).toBe(row.SimUsuarioEstado);
			    expect(value.SimUsuarioRoles).toBe(row.SimUsuarioRoles);
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

        let row = new SimUsuarioModel({});
        row.SimUsuarioId = -1;

        row._estado = 'O';

        //Update - SimUsuario
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimUsuarioModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimUsuarioModel(rowBase);
        row._estado = 'O';
        delete row.SimUsuarioId;

        //Delete - SimUsuario
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

        let row = new SimUsuarioModel({});
        row._estado = 'O';
        row.SimUsuarioId = -1;

        //Delete - SimUsuario
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });

    it('#filterSimTipoDocumentoNombre should return value from observable', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({value : [rowBase.SimTipoDocumento]}));

        service.filterSimTipoDocumentoNombre(`Cedula`).subscribe(value => {
            expect(value?.value?.length).toBe(1);
            expect(value.value[0].SimTipoDocumentoNombre).toBe(`Cedula`);
            done();
        });
    });

    it('#getByIdSimTipoDocumentoNombre should return One Row', (done: DoneFn) => {
        let row = rowBase.SimTipoDocumento;

        httpClientSpy.get.and.returnValue(asyncData(row));

        service.getByIdSimTipoDocumentoNombre(row.SimTipoDocumentoId).subscribe((value) => {
		    expect(value.SimTipoDocumentoId).toBe(row.SimTipoDocumentoId);
			expect(value.SimTipoDocumentoNombre).toBe(row.SimTipoDocumentoNombre);
            done();
        });
    });

    it('#getByIdSimTipoDocumentoNombre should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = rowBase.SimTipoDocumento;

        service.getByIdSimTipoDocumentoNombre(row.SimTipoDocumentoId).subscribe(
            (value) => {
                console.log(`#getByIdSimTipoDocumentoNombre.Error: ${JSON.stringify(value)}`);
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

});
