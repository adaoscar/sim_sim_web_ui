// SimTipoDecision - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimTipoDecisionModule } from './sim.tipodecision.module';
import { SimTipoDecisionModel } from './sim.tipodecision.model';
import { SimTipoDecisionService } from './sim.tipodecision.service';
import { SimTipoDecisionMockService } from './sim.tipodecision.mockservice.spec';
import { SimTipoDecisionDialog } from './sim.tipodecision.dialog';

describe('SimTipoDecisionDialog', () => {
    let component: SimTipoDecisionDialog;
    let fixture: ComponentFixture<SimTipoDecisionDialog>;
    let service: SimTipoDecisionService;
    let _service: SimTipoDecisionService;
    let mockService: SimTipoDecisionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimTipoDecisionId: 1234,
        SimTipoDecisionCodigo: 1234,
        SimTipoDecisionNombre: `Confirma negación`,
        SimTipoDecisionEstado: true,
        _estado: ''
    };

    let simTipoDecisionCodigoElement: DebugElement; 
    let simTipoDecisionNombreElement: DebugElement; 
    let simTipoDecisionEstadoElement: DebugElement; 

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
                SimTipoDecisionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimTipoDecisionModel(),
                        original: new SimTipoDecisionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimTipoDecisionMockService();
        TestBed.overrideProvider(SimTipoDecisionService, { useValue: mockService });
        service = TestBed.inject(SimTipoDecisionService);

        fixture = TestBed.createComponent(SimTipoDecisionDialog);
        _service = fixture.debugElement.injector.get(SimTipoDecisionService);
        component = fixture.componentInstance;
        
        simTipoDecisionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoDecisionCodigo"]')); 
        simTipoDecisionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoDecisionNombre"]')); 
        simTipoDecisionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimTipoDecisionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimTipoDecisionMockService")
        expect(_service.constructor.name).toBe("SimTipoDecisionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simTipoDecisionForm.controls.SimTipoDecisionCodigo.setValue(rowBase.SimTipoDecisionCodigo);
        component.simTipoDecisionForm.controls.SimTipoDecisionNombre.setValue(rowBase.SimTipoDecisionNombre);
        component.simTipoDecisionForm.controls.SimTipoDecisionEstado.setValue(rowBase.SimTipoDecisionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoDecisionId).toBe(mockService.autoincrement);
        expect(row.SimTipoDecisionCodigo).toBe(rowBase.SimTipoDecisionCodigo);
        expect(row.SimTipoDecisionNombre).toBe(rowBase.SimTipoDecisionNombre);
        expect(row.SimTipoDecisionEstado).toBe(rowBase.SimTipoDecisionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimTipoDecision = new SimTipoDecisionModel(rowBase);
        component.selectedSimTipoDecision._estado = 'O';
        component.originalSimTipoDecision = SimTipoDecisionModel.clone(component.selectedSimTipoDecision);
        component.originalSimTipoDecision._estado = 'O';

        mockService.rows.push(component.selectedSimTipoDecision);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoDecisionId).toBe(rowBase.SimTipoDecisionId);
        expect(row.SimTipoDecisionCodigo).toBe(rowBase.SimTipoDecisionCodigo);
        expect(row.SimTipoDecisionNombre).toBe(rowBase.SimTipoDecisionNombre);
        expect(row.SimTipoDecisionEstado).toBe(rowBase.SimTipoDecisionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimTipoDecision = new SimTipoDecisionModel(rowBase);
        component.selectedSimTipoDecision._estado = 'O';
        component.originalSimTipoDecision = SimTipoDecisionModel.clone(component.selectedSimTipoDecision);
        component.originalSimTipoDecision._estado = 'O';

        mockService.rows.push(component.selectedSimTipoDecision);
    
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
