// SimTipoDocumento - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { SimTipoDocumentoModule } from './sim.tipodocumento.module';
import { SimTipoDocumentoModel } from './sim.tipodocumento.model';
import { SimTipoDocumentoService } from './sim.tipodocumento.service';
import { SimTipoDocumentoMockService } from './sim.tipodocumento.mockservice.spec';
import { SimTipoDocumentoTable } from './sim.tipodocumento.table';

describe('SimTipoDocumento_Table', () => {
    let component: SimTipoDocumentoTable;
    let fixture: ComponentFixture<SimTipoDocumentoTable>;
    let service: SimTipoDocumentoService;
    let _service: SimTipoDocumentoService;
    let mockService: SimTipoDocumentoMockService;

    let rowBase = {
        SimTipoDocumentoId: 1234,
        SimTipoDocumentoCodigo: `CC`,
        SimTipoDocumentoNombre: `Cedula de Ciudadania`,
        SimTipoDocumentoEstado: true,
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
                SimTipoDocumentoModule
            ]
        });

        mockService = new SimTipoDocumentoMockService();
        TestBed.overrideProvider(SimTipoDocumentoService, { useValue: mockService });
        service = TestBed.inject(SimTipoDocumentoService);

        fixture = TestBed.createComponent(SimTipoDocumentoTable);
        _service = fixture.debugElement.injector.get(SimTipoDocumentoService);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimTipoDocumentoMockService")
        expect(_service.constructor.name).toBe("SimTipoDocumentoMockService")
    });

    it('should display a rows', () => {
        fixture.detectChanges();
        expect(component.resultsLength).toBe(0);

        mockService.rows.push(new SimTipoDocumentoModel(rowBase));
        mockService.rows.push(new SimTipoDocumentoModel(rowBase));

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
                expect(addDialogElement.text).toBe('TipoDocumento.SIM>');
            });
        });
    });

});
