// SimMunicipio - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { SimMunicipioModel } from './sim.municipio.model';
import { SimMunicipioService } from './sim.municipio.service';


describe('SimMunicipioService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: SimMunicipioService;

    let rowBase = {
        SimMunicipioId: 4483,
        SimDepartamentoId: 45,
        SimMunicipioCodigo: 980,
        SiceqAutoridadJudicialId: 135,
        SimMunicipioEstado: true,
        SimDepartamento: {
            SimDepartamentoId: 45,
            SimDepartamentoNombre: `Vichada`
        },
        SiceqAutoridadJudicial: {
            SiceqAutoridadJudicialId: 135,
            SimMunicipioNombre: `ZONA BANANERA`
        },
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new SimMunicipioService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new SimMunicipioModel(rowBase);

        service.getById(row.SimMunicipioId).subscribe((value) => {
			    expect(value.SimMunicipioId).toBe(row.SimMunicipioId);
			    expect(value.SimDepartamentoId).toBe(row.SimDepartamentoId);
			    expect(value.SimMunicipioCodigo).toBe(row.SimMunicipioCodigo);
			    expect(value.SiceqAutoridadJudicialId).toBe(row.SiceqAutoridadJudicialId);
			    expect(value.SimMunicipioEstado).toBe(row.SimMunicipioEstado);
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

        let row = new SimMunicipioModel(rowBase);

        service.getById(row.SimMunicipioId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SimMunicipioModel ${JSON.stringify(error)}`);
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

        let row = new SimMunicipioModel(rowBase);
        row._estado = 'N';
        delete row.SimMunicipioId;

        //Add - SimMunicipio
        service.save(row, row).subscribe(value => {
			    expect(value.SimDepartamentoId).toBe(row.SimDepartamentoId);
			    expect(value.SimMunicipioCodigo).toBe(row.SimMunicipioCodigo);
			    expect(value.SiceqAutoridadJudicialId).toBe(row.SiceqAutoridadJudicialId);
			    expect(value.SimMunicipioEstado).toBe(row.SimMunicipioEstado);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new SimMunicipioModel(rowBase);
        row._estado = 'O';
        delete row.SimMunicipioId;

        //Update - SimMunicipio
        service.save(row, row).subscribe(value => {
			    expect(value.SimDepartamentoId).toBe(row.SimDepartamentoId);
			    expect(value.SimMunicipioCodigo).toBe(row.SimMunicipioCodigo);
			    expect(value.SiceqAutoridadJudicialId).toBe(row.SiceqAutoridadJudicialId);
			    expect(value.SimMunicipioEstado).toBe(row.SimMunicipioEstado);
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

        let row = new SimMunicipioModel({});
        row.SimMunicipioId = -1;

        row._estado = 'O';

        //Update - SimMunicipio
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not SimMunicipioModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new SimMunicipioModel(rowBase);
        row._estado = 'O';
        delete row.SimMunicipioId;

        //Delete - SimMunicipio
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

        let row = new SimMunicipioModel({});
        row._estado = 'O';
        row.SimMunicipioId = -1;

        //Delete - SimMunicipio
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });

    it('#filterSimDepartamentoNombre should return value from observable', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({value : [rowBase.SimDepartamento]}));

        service.filterSimDepartamentoNombre(`Vichada`).subscribe(value => {
            expect(value?.value?.length).toBe(1);
            expect(value.value[0].SimDepartamentoNombre).toBe(`Vichada`);
            done();
        });
    });

    it('#getByIdSimDepartamentoNombre should return One Row', (done: DoneFn) => {
        let row = rowBase.SimDepartamento;

        httpClientSpy.get.and.returnValue(asyncData(row));

        service.getByIdSimDepartamentoNombre(row.SimDepartamentoId).subscribe((value) => {
		    expect(value.SimDepartamentoId).toBe(row.SimDepartamentoId);
			expect(value.SimDepartamentoNombre).toBe(row.SimDepartamentoNombre);
            done();
        });
    });

    it('#getByIdSimDepartamentoNombre should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = rowBase.SimDepartamento;

        service.getByIdSimDepartamentoNombre(row.SimDepartamentoId).subscribe(
            (value) => {
                console.log(`#getByIdSimDepartamentoNombre.Error: ${JSON.stringify(value)}`);
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


    it('#filterSimMunicipioNombre should return value from observable', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({value : [rowBase.SiceqAutoridadJudicial]}));

        service.filterSimMunicipioNombre(`ZONA BANANERA`).subscribe(value => {
            expect(value?.value?.length).toBe(1);
            expect(value.value[0].SimMunicipioNombre).toBe(`ZONA BANANERA`);
            done();
        });
    });

    it('#getByIdSimMunicipioNombre should return One Row', (done: DoneFn) => {
        let row = rowBase.SiceqAutoridadJudicial;

        httpClientSpy.get.and.returnValue(asyncData(row));

        service.getByIdSimMunicipioNombre(row.SiceqAutoridadJudicialId).subscribe((value) => {
		    expect(value.SiceqAutoridadJudicialId).toBe(row.SiceqAutoridadJudicialId);
			expect(value.SimMunicipioNombre).toBe(row.SimMunicipioNombre);
            done();
        });
    });

    it('#getByIdSimMunicipioNombre should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = rowBase.SiceqAutoridadJudicial;

        service.getByIdSimMunicipioNombre(row.SiceqAutoridadJudicialId).subscribe(
            (value) => {
                console.log(`#getByIdSimMunicipioNombre.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not SiceqAutoridadJudicialModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });

});
