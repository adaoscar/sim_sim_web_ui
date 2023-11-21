// SimTipoDocumento - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimTipoDocumentoModule } from './sim.tipodocumento.module';
import { SimTipoDocumentoModel } from './sim.tipodocumento.model';
import { SimTipoDocumentoService } from './sim.tipodocumento.service';
import { SimTipoDocumentoMockService } from './sim.tipodocumento.mockservice.spec';
import { SimTipoDocumentoDialog } from './sim.tipodocumento.dialog';

describe('SimTipoDocumentoDialog', () => {
    let component: SimTipoDocumentoDialog;
    let fixture: ComponentFixture<SimTipoDocumentoDialog>;
    let service: SimTipoDocumentoService;
    let _service: SimTipoDocumentoService;
    let mockService: SimTipoDocumentoMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimTipoDocumentoId: 1234,
        SimTipoDocumentoCodigo: `CC`,
        SimTipoDocumentoNombre: `Cedula de Ciudadania`,
        SimTipoDocumentoEstado: true,
        _estado: ''
    };

    let simTipoDocumentoCodigoElement: DebugElement; 
    let simTipoDocumentoNombreElement: DebugElement; 
    let simTipoDocumentoEstadoElement: DebugElement; 

    let btnGuardarElement: DebugElement;
    let btnEliminarElement: DebugElement;
    let btnCancelarElement: DebugElement;
    
    beforeAll(() => {
        sessionStorage.setItem("token", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODMyZTQ1MS1iNzljLTRlMGUtODFmNi1jMDg5MjkzYmM1ZDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImViNjZlNDUzLTZkZWQtNDVkMi1iNDIxLTE0ODk3M2IzN2FkMCIsImdpdmVuX25hbWUiOiJDcmlzdGlhbiBCcm9jaGVybyIsImlkIjoiZWI2NmU0NTMtNmRlZC00NWQyLWI0MjEtMTQ4OTczYjM3YWQwIiwibWFpbCI6ImNyaXN0aWFuYnJvY2hlcm9yQGdtYWlsLmNvbSIsImV4cCI6MTU5NjY1NTY1MywiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.5KKYGhDyRW6q0ucWG3WBcdag3RNRZEKeX7gT-MAWbAY`);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                SimTipoDocumentoModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimTipoDocumentoModel(),
                        original: new SimTipoDocumentoModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimTipoDocumentoMockService();
        TestBed.overrideProvider(SimTipoDocumentoService, { useValue: mockService });
        service = TestBed.inject(SimTipoDocumentoService);

        fixture = TestBed.createComponent(SimTipoDocumentoDialog);
        _service = fixture.debugElement.injector.get(SimTipoDocumentoService);
        component = fixture.componentInstance;
        
        simTipoDocumentoCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoDocumentoCodigo"]')); 
        simTipoDocumentoNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoDocumentoNombre"]')); 
        simTipoDocumentoEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimTipoDocumentoEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimTipoDocumentoMockService")
        expect(_service.constructor.name).toBe("SimTipoDocumentoMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simTipoDocumentoForm.controls.SimTipoDocumentoCodigo.setValue(rowBase.SimTipoDocumentoCodigo);
        component.simTipoDocumentoForm.controls.SimTipoDocumentoNombre.setValue(rowBase.SimTipoDocumentoNombre);
        component.simTipoDocumentoForm.controls.SimTipoDocumentoEstado.setValue(rowBase.SimTipoDocumentoEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoDocumentoId).toBe(mockService.autoincrement);
        expect(row.SimTipoDocumentoCodigo).toBe(rowBase.SimTipoDocumentoCodigo);
        expect(row.SimTipoDocumentoNombre).toBe(rowBase.SimTipoDocumentoNombre);
        expect(row.SimTipoDocumentoEstado).toBe(rowBase.SimTipoDocumentoEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimTipoDocumento = new SimTipoDocumentoModel(rowBase);
        component.selectedSimTipoDocumento._estado = 'O';
        component.originalSimTipoDocumento = SimTipoDocumentoModel.clone(component.selectedSimTipoDocumento);
        component.originalSimTipoDocumento._estado = 'O';

        mockService.rows.push(component.selectedSimTipoDocumento);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoDocumentoId).toBe(rowBase.SimTipoDocumentoId);
        expect(row.SimTipoDocumentoCodigo).toBe(rowBase.SimTipoDocumentoCodigo);
        expect(row.SimTipoDocumentoNombre).toBe(rowBase.SimTipoDocumentoNombre);
        expect(row.SimTipoDocumentoEstado).toBe(rowBase.SimTipoDocumentoEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimTipoDocumento = new SimTipoDocumentoModel(rowBase);
        component.selectedSimTipoDocumento._estado = 'O';
        component.originalSimTipoDocumento = SimTipoDocumentoModel.clone(component.selectedSimTipoDocumento);
        component.originalSimTipoDocumento._estado = 'O';

        mockService.rows.push(component.selectedSimTipoDocumento);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnEliminarElement.triggerEventHandler('click', null);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dialogDiv = document.querySelector('alertas-component');
            const okButton = dialogDiv.querySelector('button.change') as HTMLElement;
       
            mockMatDialogRef.close = (data) => {
                expect(mockService.rows.length).toBe(0, 'No se elimino la fila');
                expect(data.delete).toBeTruthy('No se elimino la fila');
                return null;
            };

            okButton.click();
        });
        
    });

});
