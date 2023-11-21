// SimEstadoDocumento - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimEstadoDocumentoModule } from '../sim.estadodocumento.module';
import { SimEstadoDocumentoModel } from './sim.estadodocumento.model';
import { SimEstadoDocumentoService } from './sim.estadodocumento.service';
import { SimEstadoDocumentoMockService } from './sim.estadodocumento.mockservice.spec';
import { SimEstadoDocumentoDialog } from './sim.estadodocumento.dialog';

describe('SimEstadoDocumentoDialog', () => {
    let component: SimEstadoDocumentoDialog;
    let fixture: ComponentFixture<SimEstadoDocumentoDialog>;
    let service: SimEstadoDocumentoService;
    let _service: SimEstadoDocumentoService;
    let mockService: SimEstadoDocumentoMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimEstadoDocumentoId: 1234,
        SimEstadoDocumentoCodigo: 1234,
        SimEstadoDocumentoNombre: `Negra. Palenquera y Afrodescendiente`,
        SimEstadoDocumentoEstado: true,
        _estado: ''
    };

    let simEstadoDocumentoCodigoElement: DebugElement; 
    let simEstadoDocumentoNombreElement: DebugElement; 
    let simEstadoDocumentoEstadoElement: DebugElement; 

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
                SimEstadoDocumentoModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimEstadoDocumentoModel(),
                        original: new SimEstadoDocumentoModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimEstadoDocumentoMockService();
        TestBed.overrideProvider(SimEstadoDocumentoService, { useValue: mockService });
        service = TestBed.inject(SimEstadoDocumentoService);

        fixture = TestBed.createComponent(SimEstadoDocumentoDialog);
        _service = fixture.debugElement.injector.get(SimEstadoDocumentoService);
        component = fixture.componentInstance;
        
        simEstadoDocumentoCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimEstadoDocumentoCodigo"]')); 
        simEstadoDocumentoNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimEstadoDocumentoNombre"]')); 
        simEstadoDocumentoEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimEstadoDocumentoEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimEstadoDocumentoMockService")
        expect(_service.constructor.name).toBe("SimEstadoDocumentoMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simEstadoDocumentoForm.controls.SimEstadoDocumentoCodigo.setValue(rowBase.SimEstadoDocumentoCodigo);
        component.simEstadoDocumentoForm.controls.SimEstadoDocumentoNombre.setValue(rowBase.SimEstadoDocumentoNombre);
        component.simEstadoDocumentoForm.controls.SimEstadoDocumentoEstado.setValue(rowBase.SimEstadoDocumentoEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimEstadoDocumentoId).toBe(mockService.autoincrement);
        expect(row.SimEstadoDocumentoCodigo).toBe(rowBase.SimEstadoDocumentoCodigo);
        expect(row.SimEstadoDocumentoNombre).toBe(rowBase.SimEstadoDocumentoNombre);
        expect(row.SimEstadoDocumentoEstado).toBe(rowBase.SimEstadoDocumentoEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimEstadoDocumento = new SimEstadoDocumentoModel(rowBase);
        component.selectedSimEstadoDocumento._estado = 'O';
        component.originalSimEstadoDocumento = SimEstadoDocumentoModel.clone(component.selectedSimEstadoDocumento);
        component.originalSimEstadoDocumento._estado = 'O';

        mockService.rows.push(component.selectedSimEstadoDocumento);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimEstadoDocumentoId).toBe(rowBase.SimEstadoDocumentoId);
        expect(row.SimEstadoDocumentoCodigo).toBe(rowBase.SimEstadoDocumentoCodigo);
        expect(row.SimEstadoDocumentoNombre).toBe(rowBase.SimEstadoDocumentoNombre);
        expect(row.SimEstadoDocumentoEstado).toBe(rowBase.SimEstadoDocumentoEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimEstadoDocumento = new SimEstadoDocumentoModel(rowBase);
        component.selectedSimEstadoDocumento._estado = 'O';
        component.originalSimEstadoDocumento = SimEstadoDocumentoModel.clone(component.selectedSimEstadoDocumento);
        component.originalSimEstadoDocumento._estado = 'O';

        mockService.rows.push(component.selectedSimEstadoDocumento);
    
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
