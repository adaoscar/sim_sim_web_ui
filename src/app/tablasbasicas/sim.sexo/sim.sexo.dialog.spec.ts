// SimSexo - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimSexoModule } from './sim.sexo.module';
import { SimSexoModel } from './sim.sexo.model';
import { SimSexoService } from './sim.sexo.service';
import { SimSexoMockService } from './sim.sexo.mockservice.spec';
import { SimSexoDialog } from './sim.sexo.dialog';

describe('SimSexoDialog', () => {
    let component: SimSexoDialog;
    let fixture: ComponentFixture<SimSexoDialog>;
    let service: SimSexoService;
    let _service: SimSexoService;
    let mockService: SimSexoMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimSexoId: 1234,
        SimSexoCodigo: 1234,
        SimSexoNombre: `Hombre`,
        SimSexoEstado: true,
        _estado: ''
    };

    let simSexoCodigoElement: DebugElement; 
    let simSexoNombreElement: DebugElement; 
    let simSexoEstadoElement: DebugElement; 

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
                SimSexoModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimSexoModel(),
                        original: new SimSexoModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimSexoMockService();
        TestBed.overrideProvider(SimSexoService, { useValue: mockService });
        service = TestBed.inject(SimSexoService);

        fixture = TestBed.createComponent(SimSexoDialog);
        _service = fixture.debugElement.injector.get(SimSexoService);
        component = fixture.componentInstance;
        
        simSexoCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimSexoCodigo"]')); 
        simSexoNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimSexoNombre"]')); 
        simSexoEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimSexoEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimSexoMockService")
        expect(_service.constructor.name).toBe("SimSexoMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simSexoForm.controls.SimSexoCodigo.setValue(rowBase.SimSexoCodigo);
        component.simSexoForm.controls.SimSexoNombre.setValue(rowBase.SimSexoNombre);
        component.simSexoForm.controls.SimSexoEstado.setValue(rowBase.SimSexoEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimSexoId).toBe(mockService.autoincrement);
        expect(row.SimSexoCodigo).toBe(rowBase.SimSexoCodigo);
        expect(row.SimSexoNombre).toBe(rowBase.SimSexoNombre);
        expect(row.SimSexoEstado).toBe(rowBase.SimSexoEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimSexo = new SimSexoModel(rowBase);
        component.selectedSimSexo._estado = 'O';
        component.originalSimSexo = SimSexoModel.clone(component.selectedSimSexo);
        component.originalSimSexo._estado = 'O';

        mockService.rows.push(component.selectedSimSexo);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimSexoId).toBe(rowBase.SimSexoId);
        expect(row.SimSexoCodigo).toBe(rowBase.SimSexoCodigo);
        expect(row.SimSexoNombre).toBe(rowBase.SimSexoNombre);
        expect(row.SimSexoEstado).toBe(rowBase.SimSexoEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimSexo = new SimSexoModel(rowBase);
        component.selectedSimSexo._estado = 'O';
        component.originalSimSexo = SimSexoModel.clone(component.selectedSimSexo);
        component.originalSimSexo._estado = 'O';

        mockService.rows.push(component.selectedSimSexo);
    
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
