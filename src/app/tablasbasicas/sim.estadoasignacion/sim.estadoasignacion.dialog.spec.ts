// SimEstadoAsignacion - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimEstadoAsignacionModule } from './sim.estadoasignacion.module';
import { SimEstadoAsignacionModel } from './sim.estadoasignacion.model';
import { SimEstadoAsignacionService } from './sim.estadoasignacion.service';
import { SimEstadoAsignacionMockService } from './sim.estadoasignacion.mockservice.spec';
import { SimEstadoAsignacionDialog } from './sim.estadoasignacion.dialog';

describe('SimEstadoAsignacionDialog', () => {
    let component: SimEstadoAsignacionDialog;
    let fixture: ComponentFixture<SimEstadoAsignacionDialog>;
    let service: SimEstadoAsignacionService;
    let _service: SimEstadoAsignacionService;
    let mockService: SimEstadoAsignacionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimEstadoAsignacionId: 1234,
        SimEstadoAsignacionCodigo: 1234,
        SimEstadoAsignacionNombre: `Por Asignar`,
        SimEstadoAsignacionEstado: true,
        _estado: ''
    };

    let simEstadoAsignacionCodigoElement: DebugElement; 
    let simEstadoAsignacionNombreElement: DebugElement; 
    let simEstadoAsignacionEstadoElement: DebugElement; 

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
                SimEstadoAsignacionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimEstadoAsignacionModel(),
                        original: new SimEstadoAsignacionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimEstadoAsignacionMockService();
        TestBed.overrideProvider(SimEstadoAsignacionService, { useValue: mockService });
        service = TestBed.inject(SimEstadoAsignacionService);

        fixture = TestBed.createComponent(SimEstadoAsignacionDialog);
        _service = fixture.debugElement.injector.get(SimEstadoAsignacionService);
        component = fixture.componentInstance;
        
        simEstadoAsignacionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimEstadoAsignacionCodigo"]')); 
        simEstadoAsignacionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimEstadoAsignacionNombre"]')); 
        simEstadoAsignacionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimEstadoAsignacionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimEstadoAsignacionMockService")
        expect(_service.constructor.name).toBe("SimEstadoAsignacionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simEstadoAsignacionForm.controls.SimEstadoAsignacionCodigo.setValue(rowBase.SimEstadoAsignacionCodigo);
        component.simEstadoAsignacionForm.controls.SimEstadoAsignacionNombre.setValue(rowBase.SimEstadoAsignacionNombre);
        component.simEstadoAsignacionForm.controls.SimEstadoAsignacionEstado.setValue(rowBase.SimEstadoAsignacionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimEstadoAsignacionId).toBe(mockService.autoincrement);
        expect(row.SimEstadoAsignacionCodigo).toBe(rowBase.SimEstadoAsignacionCodigo);
        expect(row.SimEstadoAsignacionNombre).toBe(rowBase.SimEstadoAsignacionNombre);
        expect(row.SimEstadoAsignacionEstado).toBe(rowBase.SimEstadoAsignacionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimEstadoAsignacion = new SimEstadoAsignacionModel(rowBase);
        component.selectedSimEstadoAsignacion._estado = 'O';
        component.originalSimEstadoAsignacion = SimEstadoAsignacionModel.clone(component.selectedSimEstadoAsignacion);
        component.originalSimEstadoAsignacion._estado = 'O';

        mockService.rows.push(component.selectedSimEstadoAsignacion);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimEstadoAsignacionId).toBe(rowBase.SimEstadoAsignacionId);
        expect(row.SimEstadoAsignacionCodigo).toBe(rowBase.SimEstadoAsignacionCodigo);
        expect(row.SimEstadoAsignacionNombre).toBe(rowBase.SimEstadoAsignacionNombre);
        expect(row.SimEstadoAsignacionEstado).toBe(rowBase.SimEstadoAsignacionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimEstadoAsignacion = new SimEstadoAsignacionModel(rowBase);
        component.selectedSimEstadoAsignacion._estado = 'O';
        component.originalSimEstadoAsignacion = SimEstadoAsignacionModel.clone(component.selectedSimEstadoAsignacion);
        component.originalSimEstadoAsignacion._estado = 'O';

        mockService.rows.push(component.selectedSimEstadoAsignacion);
    
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
