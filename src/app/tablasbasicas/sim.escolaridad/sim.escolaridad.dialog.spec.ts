// SimEscolaridad - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimEscolaridadModule } from '../sim.escolaridad.module';
import { SimEscolaridadModel } from './sim.escolaridad.model';
import { SimEscolaridadService } from './sim.escolaridad.service';
import { SimEscolaridadMockService } from './sim.escolaridad.mockservice.spec';
import { SimEscolaridadDialog } from './sim.escolaridad.dialog';

describe('SimEscolaridadDialog', () => {
    let component: SimEscolaridadDialog;
    let fixture: ComponentFixture<SimEscolaridadDialog>;
    let service: SimEscolaridadService;
    let _service: SimEscolaridadService;
    let mockService: SimEscolaridadMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimEscolaridadId: 1234,
        SimEscolaridadCodigo: 1234,
        SimEscolaridadNombre: `Ámbito familiar conviviente`,
        SimEscolaridadEstado: true,
        _estado: ''
    };

    let simEscolaridadCodigoElement: DebugElement; 
    let simEscolaridadNombreElement: DebugElement; 
    let simEscolaridadEstadoElement: DebugElement; 

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
                SimEscolaridadModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimEscolaridadModel(),
                        original: new SimEscolaridadModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimEscolaridadMockService();
        TestBed.overrideProvider(SimEscolaridadService, { useValue: mockService });
        service = TestBed.inject(SimEscolaridadService);

        fixture = TestBed.createComponent(SimEscolaridadDialog);
        _service = fixture.debugElement.injector.get(SimEscolaridadService);
        component = fixture.componentInstance;
        
        simEscolaridadCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimEscolaridadCodigo"]')); 
        simEscolaridadNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimEscolaridadNombre"]')); 
        simEscolaridadEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimEscolaridadEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimEscolaridadMockService")
        expect(_service.constructor.name).toBe("SimEscolaridadMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simEscolaridadForm.controls.SimEscolaridadCodigo.setValue(rowBase.SimEscolaridadCodigo);
        component.simEscolaridadForm.controls.SimEscolaridadNombre.setValue(rowBase.SimEscolaridadNombre);
        component.simEscolaridadForm.controls.SimEscolaridadEstado.setValue(rowBase.SimEscolaridadEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimEscolaridadId).toBe(mockService.autoincrement);
        expect(row.SimEscolaridadCodigo).toBe(rowBase.SimEscolaridadCodigo);
        expect(row.SimEscolaridadNombre).toBe(rowBase.SimEscolaridadNombre);
        expect(row.SimEscolaridadEstado).toBe(rowBase.SimEscolaridadEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimEscolaridad = new SimEscolaridadModel(rowBase);
        component.selectedSimEscolaridad._estado = 'O';
        component.originalSimEscolaridad = SimEscolaridadModel.clone(component.selectedSimEscolaridad);
        component.originalSimEscolaridad._estado = 'O';

        mockService.rows.push(component.selectedSimEscolaridad);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimEscolaridadId).toBe(rowBase.SimEscolaridadId);
        expect(row.SimEscolaridadCodigo).toBe(rowBase.SimEscolaridadCodigo);
        expect(row.SimEscolaridadNombre).toBe(rowBase.SimEscolaridadNombre);
        expect(row.SimEscolaridadEstado).toBe(rowBase.SimEscolaridadEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimEscolaridad = new SimEscolaridadModel(rowBase);
        component.selectedSimEscolaridad._estado = 'O';
        component.originalSimEscolaridad = SimEscolaridadModel.clone(component.selectedSimEscolaridad);
        component.originalSimEscolaridad._estado = 'O';

        mockService.rows.push(component.selectedSimEscolaridad);
    
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
