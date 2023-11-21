// SimMunicipio - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { SimMunicipioModule } from './sim.municipio.module';
import { SimMunicipioModel } from './sim.municipio.model';
import { SimMunicipioService } from './sim.municipio.service';
import { SimMunicipioMockService } from './sim.municipio.mockservice.spec';
import { SimMunicipioTable } from './sim.municipio.table';

describe('SimMunicipio_Table', () => {
    let component: SimMunicipioTable;
    let fixture: ComponentFixture<SimMunicipioTable>;
    let service: SimMunicipioService;
    let _service: SimMunicipioService;
    let mockService: SimMunicipioMockService;

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

    beforeAll(() => {
        sessionStorage.setItem("token", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODMyZTQ1MS1iNzljLTRlMGUtODFmNi1jMDg5MjkzYmM1ZDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImViNjZlNDUzLTZkZWQtNDVkMi1iNDIxLTE0ODk3M2IzN2FkMCIsImdpdmVuX25hbWUiOiJDcmlzdGlhbiBCcm9jaGVybyIsImlkIjoiZWI2NmU0NTMtNmRlZC00NWQyLWI0MjEtMTQ4OTczYjM3YWQwIiwibWFpbCI6ImNyaXN0aWFuYnJvY2hlcm9yQGdtYWlsLmNvbSIsImV4cCI6MTU5NjY1NTY1MywiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.5KKYGhDyRW6q0ucWG3WBcdag3RNRZEKeX7gT-MAWbAY`);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                SimMunicipioModule
            ]
        });

        mockService = new SimMunicipioMockService();
        TestBed.overrideProvider(SimMunicipioService, { useValue: mockService });
        service = TestBed.inject(SimMunicipioService);

        fixture = TestBed.createComponent(SimMunicipioTable);
        _service = fixture.debugElement.injector.get(SimMunicipioService);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimMunicipioMockService")
        expect(_service.constructor.name).toBe("SimMunicipioMockService")
    });

    it('should display a rows', () => {
        fixture.detectChanges();
        expect(component.resultsLength).toBe(0);

        mockService.rows.push(new SimMunicipioModel(rowBase));
        mockService.rows.push(new SimMunicipioModel(rowBase));

        component.paginator.page.emit();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.resultsLength).toBe(2);
            let matRows = fixture.debugElement.queryAll(By.css('mat-row.cdk-row'));
            expect(matRows.length).toBe(2);
        });
    });

    it('should display a Dialog for Add', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.resultsLength).toBe(0);
            let addIconDebug  = fixture.debugElement.queryAll(By.css('mat-toolbar-row mat-icon')).find((x) => x.nativeElement.innerText === "add");
            let addIconElement = addIconDebug.nativeElement;
            addIconDebug.triggerEventHandler('click', null);
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let addDialogDebug  = fixture.debugElement.query(By.css('mat-card-title'));
                let addDialogElement = addDialogDebug.nativeElement;
                expect(addDialogElement.text).toBe('Municipio.SIM>');
            });
        });
    });

});
