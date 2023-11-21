// SimRangoEdad - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimRangoEdadModule } from './sim.rangoedad.module';
import { SimRangoEdadModel } from './sim.rangoedad.model';
import { SimRangoEdadService } from './sim.rangoedad.service';
import { SimRangoEdadMockService } from './sim.rangoedad.mockservice.spec';
import { SimRangoEdadDialog } from './sim.rangoedad.dialog';

describe('SimRangoEdadDialog', () => {
    let component: SimRangoEdadDialog;
    let fixture: ComponentFixture<SimRangoEdadDialog>;
    let service: SimRangoEdadService;
    let _service: SimRangoEdadService;
    let mockService: SimRangoEdadMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimRangoEdadId: 1234,
        SimRangoEdadCodigo: 1234,
        SimRangoEdadNombre: `Masculina`,
        SimRangoEdadEstado: true,
        _estado: ''
    };

    let simRangoEdadCodigoElement: DebugElement; 
    let simRangoEdadNombreElement: DebugElement; 
    let simRangoEdadEstadoElement: DebugElement; 

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
                SimRangoEdadModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimRangoEdadModel(),
                        original: new SimRangoEdadModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimRangoEdadMockService();
        TestBed.overrideProvider(SimRangoEdadService, { useValue: mockService });
        service = TestBed.inject(SimRangoEdadService);

        fixture = TestBed.createComponent(SimRangoEdadDialog);
        _service = fixture.debugElement.injector.get(SimRangoEdadService);
        component = fixture.componentInstance;
        
        simRangoEdadCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimRangoEdadCodigo"]')); 
        simRangoEdadNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimRangoEdadNombre"]')); 
        simRangoEdadEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimRangoEdadEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimRangoEdadMockService")
        expect(_service.constructor.name).toBe("SimRangoEdadMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simRangoEdadForm.controls.SimRangoEdadCodigo.setValue(rowBase.SimRangoEdadCodigo);
        component.simRangoEdadForm.controls.SimRangoEdadNombre.setValue(rowBase.SimRangoEdadNombre);
        component.simRangoEdadForm.controls.SimRangoEdadEstado.setValue(rowBase.SimRangoEdadEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimRangoEdadId).toBe(mockService.autoincrement);
        expect(row.SimRangoEdadCodigo).toBe(rowBase.SimRangoEdadCodigo);
        expect(row.SimRangoEdadNombre).toBe(rowBase.SimRangoEdadNombre);
        expect(row.SimRangoEdadEstado).toBe(rowBase.SimRangoEdadEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimRangoEdad = new SimRangoEdadModel(rowBase);
        component.selectedSimRangoEdad._estado = 'O';
        component.originalSimRangoEdad = SimRangoEdadModel.clone(component.selectedSimRangoEdad);
        component.originalSimRangoEdad._estado = 'O';

        mockService.rows.push(component.selectedSimRangoEdad);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimRangoEdadId).toBe(rowBase.SimRangoEdadId);
        expect(row.SimRangoEdadCodigo).toBe(rowBase.SimRangoEdadCodigo);
        expect(row.SimRangoEdadNombre).toBe(rowBase.SimRangoEdadNombre);
        expect(row.SimRangoEdadEstado).toBe(rowBase.SimRangoEdadEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimRangoEdad = new SimRangoEdadModel(rowBase);
        component.selectedSimRangoEdad._estado = 'O';
        component.originalSimRangoEdad = SimRangoEdadModel.clone(component.selectedSimRangoEdad);
        component.originalSimRangoEdad._estado = 'O';

        mockService.rows.push(component.selectedSimRangoEdad);
    
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
