// SimPeriodoDias - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimPeriodoDiasModule } from './sim.periododias.module';
import { SimPeriodoDiasModel } from './sim.periododias.model';
import { SimPeriodoDiasService } from './sim.periododias.service';
import { SimPeriodoDiasMockService } from './sim.periododias.mockservice.spec';
import { SimPeriodoDiasDialog } from './sim.periododias.dialog';

describe('SimPeriodoDiasDialog', () => {
    let component: SimPeriodoDiasDialog;
    let fixture: ComponentFixture<SimPeriodoDiasDialog>;
    let service: SimPeriodoDiasService;
    let _service: SimPeriodoDiasService;
    let mockService: SimPeriodoDiasMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimPeriodoDiasId: 1234,
        SimPeriodoDiasCodigo: 1234,
        SimPeriodoDiasNombre: `Por Asignar`,
        SimPeriodoDiasEstado: true,
        _estado: ''
    };

    let simPeriodoDiasCodigoElement: DebugElement; 
    let simPeriodoDiasNombreElement: DebugElement; 
    let simPeriodoDiasEstadoElement: DebugElement; 

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
                SimPeriodoDiasModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimPeriodoDiasModel(),
                        original: new SimPeriodoDiasModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimPeriodoDiasMockService();
        TestBed.overrideProvider(SimPeriodoDiasService, { useValue: mockService });
        service = TestBed.inject(SimPeriodoDiasService);

        fixture = TestBed.createComponent(SimPeriodoDiasDialog);
        _service = fixture.debugElement.injector.get(SimPeriodoDiasService);
        component = fixture.componentInstance;
        
        simPeriodoDiasCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimPeriodoDiasCodigo"]')); 
        simPeriodoDiasNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimPeriodoDiasNombre"]')); 
        simPeriodoDiasEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimPeriodoDiasEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimPeriodoDiasMockService")
        expect(_service.constructor.name).toBe("SimPeriodoDiasMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simPeriodoDiasForm.controls.SimPeriodoDiasCodigo.setValue(rowBase.SimPeriodoDiasCodigo);
        component.simPeriodoDiasForm.controls.SimPeriodoDiasNombre.setValue(rowBase.SimPeriodoDiasNombre);
        component.simPeriodoDiasForm.controls.SimPeriodoDiasEstado.setValue(rowBase.SimPeriodoDiasEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimPeriodoDiasId).toBe(mockService.autoincrement);
        expect(row.SimPeriodoDiasCodigo).toBe(rowBase.SimPeriodoDiasCodigo);
        expect(row.SimPeriodoDiasNombre).toBe(rowBase.SimPeriodoDiasNombre);
        expect(row.SimPeriodoDiasEstado).toBe(rowBase.SimPeriodoDiasEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimPeriodoDias = new SimPeriodoDiasModel(rowBase);
        component.selectedSimPeriodoDias._estado = 'O';
        component.originalSimPeriodoDias = SimPeriodoDiasModel.clone(component.selectedSimPeriodoDias);
        component.originalSimPeriodoDias._estado = 'O';

        mockService.rows.push(component.selectedSimPeriodoDias);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimPeriodoDiasId).toBe(rowBase.SimPeriodoDiasId);
        expect(row.SimPeriodoDiasCodigo).toBe(rowBase.SimPeriodoDiasCodigo);
        expect(row.SimPeriodoDiasNombre).toBe(rowBase.SimPeriodoDiasNombre);
        expect(row.SimPeriodoDiasEstado).toBe(rowBase.SimPeriodoDiasEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimPeriodoDias = new SimPeriodoDiasModel(rowBase);
        component.selectedSimPeriodoDias._estado = 'O';
        component.originalSimPeriodoDias = SimPeriodoDiasModel.clone(component.selectedSimPeriodoDias);
        component.originalSimPeriodoDias._estado = 'O';

        mockService.rows.push(component.selectedSimPeriodoDias);
    
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
