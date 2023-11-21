// SimAmbito - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimAmbitoModule } from './sim.ambito.module';
import { SimAmbitoModel } from './sim.ambito.model';
import { SimAmbitoService } from './sim.ambito.service';
import { SimAmbitoMockService } from './sim.ambito.mockservice.spec';
import { SimAmbitoDialog } from './sim.ambito.dialog';

describe('SimAmbitoDialog', () => {
    let component: SimAmbitoDialog;
    let fixture: ComponentFixture<SimAmbitoDialog>;
    let service: SimAmbitoService;
    let _service: SimAmbitoService;
    let mockService: SimAmbitoMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimAmbitoId: 1234,
        SimAmbitoCodigo: 1234,
        SimAmbitoNombre: `Ámbito familiar conviviente`,
        SimAmbitoEstado: true,
        _estado: ''
    };

    let simAmbitoCodigoElement: DebugElement; 
    let simAmbitoNombreElement: DebugElement; 
    let simAmbitoEstadoElement: DebugElement; 

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
                SimAmbitoModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimAmbitoModel(),
                        original: new SimAmbitoModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimAmbitoMockService();
        TestBed.overrideProvider(SimAmbitoService, { useValue: mockService });
        service = TestBed.inject(SimAmbitoService);

        fixture = TestBed.createComponent(SimAmbitoDialog);
        _service = fixture.debugElement.injector.get(SimAmbitoService);
        component = fixture.componentInstance;
        
        simAmbitoCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimAmbitoCodigo"]')); 
        simAmbitoNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimAmbitoNombre"]')); 
        simAmbitoEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimAmbitoEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimAmbitoMockService")
        expect(_service.constructor.name).toBe("SimAmbitoMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simAmbitoForm.controls.SimAmbitoCodigo.setValue(rowBase.SimAmbitoCodigo);
        component.simAmbitoForm.controls.SimAmbitoNombre.setValue(rowBase.SimAmbitoNombre);
        component.simAmbitoForm.controls.SimAmbitoEstado.setValue(rowBase.SimAmbitoEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimAmbitoId).toBe(mockService.autoincrement);
        expect(row.SimAmbitoCodigo).toBe(rowBase.SimAmbitoCodigo);
        expect(row.SimAmbitoNombre).toBe(rowBase.SimAmbitoNombre);
        expect(row.SimAmbitoEstado).toBe(rowBase.SimAmbitoEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimAmbito = new SimAmbitoModel(rowBase);
        component.selectedSimAmbito._estado = 'O';
        component.originalSimAmbito = SimAmbitoModel.clone(component.selectedSimAmbito);
        component.originalSimAmbito._estado = 'O';

        mockService.rows.push(component.selectedSimAmbito);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimAmbitoId).toBe(rowBase.SimAmbitoId);
        expect(row.SimAmbitoCodigo).toBe(rowBase.SimAmbitoCodigo);
        expect(row.SimAmbitoNombre).toBe(rowBase.SimAmbitoNombre);
        expect(row.SimAmbitoEstado).toBe(rowBase.SimAmbitoEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimAmbito = new SimAmbitoModel(rowBase);
        component.selectedSimAmbito._estado = 'O';
        component.originalSimAmbito = SimAmbitoModel.clone(component.selectedSimAmbito);
        component.originalSimAmbito._estado = 'O';

        mockService.rows.push(component.selectedSimAmbito);
    
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
