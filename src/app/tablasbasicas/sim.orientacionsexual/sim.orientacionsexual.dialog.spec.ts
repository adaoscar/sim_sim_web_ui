// SimOrientacionSexual - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimOrientacionSexualModule } from './sim.orientacionsexual.module';
import { SimOrientacionSexualModel } from './sim.orientacionsexual.model';
import { SimOrientacionSexualService } from './sim.orientacionsexual.service';
import { SimOrientacionSexualMockService } from './sim.orientacionsexual.mockservice.spec';
import { SimOrientacionSexualDialog } from './sim.orientacionsexual.dialog';

describe('SimOrientacionSexualDialog', () => {
    let component: SimOrientacionSexualDialog;
    let fixture: ComponentFixture<SimOrientacionSexualDialog>;
    let service: SimOrientacionSexualService;
    let _service: SimOrientacionSexualService;
    let mockService: SimOrientacionSexualMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimOrientacionSexualId: 1234,
        SimOrientacionSexualCodigo: 1234,
        SimOrientacionSexualNombre: `Heterosexual`,
        SimOrientacionSexualEstado: true,
        _estado: ''
    };

    let simOrientacionSexualCodigoElement: DebugElement; 
    let simOrientacionSexualNombreElement: DebugElement; 
    let simOrientacionSexualEstadoElement: DebugElement; 

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
                SimOrientacionSexualModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimOrientacionSexualModel(),
                        original: new SimOrientacionSexualModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimOrientacionSexualMockService();
        TestBed.overrideProvider(SimOrientacionSexualService, { useValue: mockService });
        service = TestBed.inject(SimOrientacionSexualService);

        fixture = TestBed.createComponent(SimOrientacionSexualDialog);
        _service = fixture.debugElement.injector.get(SimOrientacionSexualService);
        component = fixture.componentInstance;
        
        simOrientacionSexualCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimOrientacionSexualCodigo"]')); 
        simOrientacionSexualNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimOrientacionSexualNombre"]')); 
        simOrientacionSexualEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimOrientacionSexualEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimOrientacionSexualMockService")
        expect(_service.constructor.name).toBe("SimOrientacionSexualMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simOrientacionSexualForm.controls.SimOrientacionSexualCodigo.setValue(rowBase.SimOrientacionSexualCodigo);
        component.simOrientacionSexualForm.controls.SimOrientacionSexualNombre.setValue(rowBase.SimOrientacionSexualNombre);
        component.simOrientacionSexualForm.controls.SimOrientacionSexualEstado.setValue(rowBase.SimOrientacionSexualEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimOrientacionSexualId).toBe(mockService.autoincrement);
        expect(row.SimOrientacionSexualCodigo).toBe(rowBase.SimOrientacionSexualCodigo);
        expect(row.SimOrientacionSexualNombre).toBe(rowBase.SimOrientacionSexualNombre);
        expect(row.SimOrientacionSexualEstado).toBe(rowBase.SimOrientacionSexualEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimOrientacionSexual = new SimOrientacionSexualModel(rowBase);
        component.selectedSimOrientacionSexual._estado = 'O';
        component.originalSimOrientacionSexual = SimOrientacionSexualModel.clone(component.selectedSimOrientacionSexual);
        component.originalSimOrientacionSexual._estado = 'O';

        mockService.rows.push(component.selectedSimOrientacionSexual);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimOrientacionSexualId).toBe(rowBase.SimOrientacionSexualId);
        expect(row.SimOrientacionSexualCodigo).toBe(rowBase.SimOrientacionSexualCodigo);
        expect(row.SimOrientacionSexualNombre).toBe(rowBase.SimOrientacionSexualNombre);
        expect(row.SimOrientacionSexualEstado).toBe(rowBase.SimOrientacionSexualEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimOrientacionSexual = new SimOrientacionSexualModel(rowBase);
        component.selectedSimOrientacionSexual._estado = 'O';
        component.originalSimOrientacionSexual = SimOrientacionSexualModel.clone(component.selectedSimOrientacionSexual);
        component.originalSimOrientacionSexual._estado = 'O';

        mockService.rows.push(component.selectedSimOrientacionSexual);
    
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
