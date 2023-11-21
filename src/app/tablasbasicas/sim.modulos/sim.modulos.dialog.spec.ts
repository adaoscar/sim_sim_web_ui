// SimModulos - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimModulosModule } from '../sim.modulos.module';
import { SimModulosModel } from './sim.modulos.model';
import { SimModulosService } from './sim.modulos.service';
import { SimModulosMockService } from './sim.modulos.mockservice.spec';
import { SimModulosDialog } from './sim.modulos.dialog';

describe('SimModulosDialog', () => {
    let component: SimModulosDialog;
    let fixture: ComponentFixture<SimModulosDialog>;
    let service: SimModulosService;
    let _service: SimModulosService;
    let mockService: SimModulosMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimModulosId: 1234,
        SimModulosCodigo: 1234,
        SimModulosNombre: `Ámbito familiar conviviente`,
        SimModulosEstado: true,
        _estado: ''
    };

    let simModulosCodigoElement: DebugElement; 
    let simModulosNombreElement: DebugElement; 
    let simModulosEstadoElement: DebugElement; 

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
                SimModulosModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimModulosModel(),
                        original: new SimModulosModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimModulosMockService();
        TestBed.overrideProvider(SimModulosService, { useValue: mockService });
        service = TestBed.inject(SimModulosService);

        fixture = TestBed.createComponent(SimModulosDialog);
        _service = fixture.debugElement.injector.get(SimModulosService);
        component = fixture.componentInstance;
        
        simModulosCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimModulosCodigo"]')); 
        simModulosNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimModulosNombre"]')); 
        simModulosEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimModulosEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimModulosMockService")
        expect(_service.constructor.name).toBe("SimModulosMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simModulosForm.controls.SimModulosCodigo.setValue(rowBase.SimModulosCodigo);
        component.simModulosForm.controls.SimModulosNombre.setValue(rowBase.SimModulosNombre);
        component.simModulosForm.controls.SimModulosEstado.setValue(rowBase.SimModulosEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimModulosId).toBe(mockService.autoincrement);
        expect(row.SimModulosCodigo).toBe(rowBase.SimModulosCodigo);
        expect(row.SimModulosNombre).toBe(rowBase.SimModulosNombre);
        expect(row.SimModulosEstado).toBe(rowBase.SimModulosEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimModulos = new SimModulosModel(rowBase);
        component.selectedSimModulos._estado = 'O';
        component.originalSimModulos = SimModulosModel.clone(component.selectedSimModulos);
        component.originalSimModulos._estado = 'O';

        mockService.rows.push(component.selectedSimModulos);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimModulosId).toBe(rowBase.SimModulosId);
        expect(row.SimModulosCodigo).toBe(rowBase.SimModulosCodigo);
        expect(row.SimModulosNombre).toBe(rowBase.SimModulosNombre);
        expect(row.SimModulosEstado).toBe(rowBase.SimModulosEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimModulos = new SimModulosModel(rowBase);
        component.selectedSimModulos._estado = 'O';
        component.originalSimModulos = SimModulosModel.clone(component.selectedSimModulos);
        component.originalSimModulos._estado = 'O';

        mockService.rows.push(component.selectedSimModulos);
    
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
