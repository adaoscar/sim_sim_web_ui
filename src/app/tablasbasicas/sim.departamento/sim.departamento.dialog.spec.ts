// SimDepartamento - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimDepartamentoModule } from './sim.departamento.module';
import { SimDepartamentoModel } from './sim.departamento.model';
import { SimDepartamentoService } from './sim.departamento.service';
import { SimDepartamentoMockService } from './sim.departamento.mockservice.spec';
import { SimDepartamentoDialog } from './sim.departamento.dialog';

describe('SimDepartamentoDialog', () => {
    let component: SimDepartamentoDialog;
    let fixture: ComponentFixture<SimDepartamentoDialog>;
    let service: SimDepartamentoService;
    let _service: SimDepartamentoService;
    let mockService: SimDepartamentoMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimDepartamentoId: 134,
        SimDepartamentoCodigo: 99,
        SimDepartamentoNombre: `VICHADA`,
        SimDepartamentoEstado: true,
        _estado: ''
    };

    let simDepartamentoCodigoElement: DebugElement; 
    let simDepartamentoNombreElement: DebugElement; 
    let simDepartamentoEstadoElement: DebugElement; 

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
                SimDepartamentoModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimDepartamentoModel(),
                        original: new SimDepartamentoModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimDepartamentoMockService();
        TestBed.overrideProvider(SimDepartamentoService, { useValue: mockService });
        service = TestBed.inject(SimDepartamentoService);

        fixture = TestBed.createComponent(SimDepartamentoDialog);
        _service = fixture.debugElement.injector.get(SimDepartamentoService);
        component = fixture.componentInstance;
        
        simDepartamentoCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimDepartamentoCodigo"]')); 
        simDepartamentoNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimDepartamentoNombre"]')); 
        simDepartamentoEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimDepartamentoEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimDepartamentoMockService")
        expect(_service.constructor.name).toBe("SimDepartamentoMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simDepartamentoForm.controls.SimDepartamentoCodigo.setValue(rowBase.SimDepartamentoCodigo);
        component.simDepartamentoForm.controls.SimDepartamentoNombre.setValue(rowBase.SimDepartamentoNombre);
        component.simDepartamentoForm.controls.SimDepartamentoEstado.setValue(rowBase.SimDepartamentoEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimDepartamentoId).toBe(mockService.autoincrement);
        expect(row.SimDepartamentoCodigo).toBe(rowBase.SimDepartamentoCodigo);
        expect(row.SimDepartamentoNombre).toBe(rowBase.SimDepartamentoNombre);
        expect(row.SimDepartamentoEstado).toBe(rowBase.SimDepartamentoEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimDepartamento = new SimDepartamentoModel(rowBase);
        component.selectedSimDepartamento._estado = 'O';
        component.originalSimDepartamento = SimDepartamentoModel.clone(component.selectedSimDepartamento);
        component.originalSimDepartamento._estado = 'O';

        mockService.rows.push(component.selectedSimDepartamento);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimDepartamentoId).toBe(rowBase.SimDepartamentoId);
        expect(row.SimDepartamentoCodigo).toBe(rowBase.SimDepartamentoCodigo);
        expect(row.SimDepartamentoNombre).toBe(rowBase.SimDepartamentoNombre);
        expect(row.SimDepartamentoEstado).toBe(rowBase.SimDepartamentoEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimDepartamento = new SimDepartamentoModel(rowBase);
        component.selectedSimDepartamento._estado = 'O';
        component.originalSimDepartamento = SimDepartamentoModel.clone(component.selectedSimDepartamento);
        component.originalSimDepartamento._estado = 'O';

        mockService.rows.push(component.selectedSimDepartamento);
    
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
