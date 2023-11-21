// SimCondicionesVunerabilidad - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimCondicionesVunerabilidadModule } from '../sim.condicionesvunerabilidad.module';
import { SimCondicionesVunerabilidadModel } from './sim.condicionesvunerabilidad.model';
import { SimCondicionesVunerabilidadService } from './sim.condicionesvunerabilidad.service';
import { SimCondicionesVunerabilidadMockService } from './sim.condicionesvunerabilidad.mockservice.spec';
import { SimCondicionesVunerabilidadDialog } from './sim.condicionesvunerabilidad.dialog';

describe('SimCondicionesVunerabilidadDialog', () => {
    let component: SimCondicionesVunerabilidadDialog;
    let fixture: ComponentFixture<SimCondicionesVunerabilidadDialog>;
    let service: SimCondicionesVunerabilidadService;
    let _service: SimCondicionesVunerabilidadService;
    let mockService: SimCondicionesVunerabilidadMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimCondicionesVunerabilidadId: 1234,
        SimCondicionesVunerabilidadCodigo: 1234,
        SimCondicionesVunerabilidadNombre: `Ámbito familiar conviviente`,
        SimCondicionesVunerabilidadEstado: true,
        _estado: ''
    };

    let simCondicionesVunerabilidadCodigoElement: DebugElement; 
    let simCondicionesVunerabilidadNombreElement: DebugElement; 
    let simCondicionesVunerabilidadEstadoElement: DebugElement; 

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
                SimCondicionesVunerabilidadModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimCondicionesVunerabilidadModel(),
                        original: new SimCondicionesVunerabilidadModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimCondicionesVunerabilidadMockService();
        TestBed.overrideProvider(SimCondicionesVunerabilidadService, { useValue: mockService });
        service = TestBed.inject(SimCondicionesVunerabilidadService);

        fixture = TestBed.createComponent(SimCondicionesVunerabilidadDialog);
        _service = fixture.debugElement.injector.get(SimCondicionesVunerabilidadService);
        component = fixture.componentInstance;
        
        simCondicionesVunerabilidadCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimCondicionesVunerabilidadCodigo"]')); 
        simCondicionesVunerabilidadNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimCondicionesVunerabilidadNombre"]')); 
        simCondicionesVunerabilidadEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimCondicionesVunerabilidadEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimCondicionesVunerabilidadMockService")
        expect(_service.constructor.name).toBe("SimCondicionesVunerabilidadMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simCondicionesVunerabilidadForm.controls.SimCondicionesVunerabilidadCodigo.setValue(rowBase.SimCondicionesVunerabilidadCodigo);
        component.simCondicionesVunerabilidadForm.controls.SimCondicionesVunerabilidadNombre.setValue(rowBase.SimCondicionesVunerabilidadNombre);
        component.simCondicionesVunerabilidadForm.controls.SimCondicionesVunerabilidadEstado.setValue(rowBase.SimCondicionesVunerabilidadEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimCondicionesVunerabilidadId).toBe(mockService.autoincrement);
        expect(row.SimCondicionesVunerabilidadCodigo).toBe(rowBase.SimCondicionesVunerabilidadCodigo);
        expect(row.SimCondicionesVunerabilidadNombre).toBe(rowBase.SimCondicionesVunerabilidadNombre);
        expect(row.SimCondicionesVunerabilidadEstado).toBe(rowBase.SimCondicionesVunerabilidadEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimCondicionesVunerabilidad = new SimCondicionesVunerabilidadModel(rowBase);
        component.selectedSimCondicionesVunerabilidad._estado = 'O';
        component.originalSimCondicionesVunerabilidad = SimCondicionesVunerabilidadModel.clone(component.selectedSimCondicionesVunerabilidad);
        component.originalSimCondicionesVunerabilidad._estado = 'O';

        mockService.rows.push(component.selectedSimCondicionesVunerabilidad);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimCondicionesVunerabilidadId).toBe(rowBase.SimCondicionesVunerabilidadId);
        expect(row.SimCondicionesVunerabilidadCodigo).toBe(rowBase.SimCondicionesVunerabilidadCodigo);
        expect(row.SimCondicionesVunerabilidadNombre).toBe(rowBase.SimCondicionesVunerabilidadNombre);
        expect(row.SimCondicionesVunerabilidadEstado).toBe(rowBase.SimCondicionesVunerabilidadEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimCondicionesVunerabilidad = new SimCondicionesVunerabilidadModel(rowBase);
        component.selectedSimCondicionesVunerabilidad._estado = 'O';
        component.originalSimCondicionesVunerabilidad = SimCondicionesVunerabilidadModel.clone(component.selectedSimCondicionesVunerabilidad);
        component.originalSimCondicionesVunerabilidad._estado = 'O';

        mockService.rows.push(component.selectedSimCondicionesVunerabilidad);
    
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
