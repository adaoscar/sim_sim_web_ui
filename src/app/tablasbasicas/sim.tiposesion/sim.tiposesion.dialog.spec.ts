// SimTipoSesion - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimTipoSesionModule } from '../sim.tiposesion.module';
import { SimTipoSesionModel } from './sim.tiposesion.model';
import { SimTipoSesionService } from './sim.tiposesion.service';
import { SimTipoSesionMockService } from './sim.tiposesion.mockservice.spec';
import { SimTipoSesionDialog } from './sim.tiposesion.dialog';

describe('SimTipoSesionDialog', () => {
    let component: SimTipoSesionDialog;
    let fixture: ComponentFixture<SimTipoSesionDialog>;
    let service: SimTipoSesionService;
    let _service: SimTipoSesionService;
    let mockService: SimTipoSesionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimTipoSesionId: 1234,
        SimTipoSesionCodigo: 1234,
        SimTipoSesionNombre: `Ordinaria presencial`,
        SimTipoSesionEstado: true,
        _estado: ''
    };

    let simTipoSesionCodigoElement: DebugElement; 
    let simTipoSesionNombreElement: DebugElement; 
    let simTipoSesionEstadoElement: DebugElement; 

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
                SimTipoSesionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimTipoSesionModel(),
                        original: new SimTipoSesionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimTipoSesionMockService();
        TestBed.overrideProvider(SimTipoSesionService, { useValue: mockService });
        service = TestBed.inject(SimTipoSesionService);

        fixture = TestBed.createComponent(SimTipoSesionDialog);
        _service = fixture.debugElement.injector.get(SimTipoSesionService);
        component = fixture.componentInstance;
        
        simTipoSesionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoSesionCodigo"]')); 
        simTipoSesionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoSesionNombre"]')); 
        simTipoSesionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimTipoSesionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimTipoSesionMockService")
        expect(_service.constructor.name).toBe("SimTipoSesionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simTipoSesionForm.controls.SimTipoSesionCodigo.setValue(rowBase.SimTipoSesionCodigo);
        component.simTipoSesionForm.controls.SimTipoSesionNombre.setValue(rowBase.SimTipoSesionNombre);
        component.simTipoSesionForm.controls.SimTipoSesionEstado.setValue(rowBase.SimTipoSesionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoSesionId).toBe(mockService.autoincrement);
        expect(row.SimTipoSesionCodigo).toBe(rowBase.SimTipoSesionCodigo);
        expect(row.SimTipoSesionNombre).toBe(rowBase.SimTipoSesionNombre);
        expect(row.SimTipoSesionEstado).toBe(rowBase.SimTipoSesionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimTipoSesion = new SimTipoSesionModel(rowBase);
        component.selectedSimTipoSesion._estado = 'O';
        component.originalSimTipoSesion = SimTipoSesionModel.clone(component.selectedSimTipoSesion);
        component.originalSimTipoSesion._estado = 'O';

        mockService.rows.push(component.selectedSimTipoSesion);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoSesionId).toBe(rowBase.SimTipoSesionId);
        expect(row.SimTipoSesionCodigo).toBe(rowBase.SimTipoSesionCodigo);
        expect(row.SimTipoSesionNombre).toBe(rowBase.SimTipoSesionNombre);
        expect(row.SimTipoSesionEstado).toBe(rowBase.SimTipoSesionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimTipoSesion = new SimTipoSesionModel(rowBase);
        component.selectedSimTipoSesion._estado = 'O';
        component.originalSimTipoSesion = SimTipoSesionModel.clone(component.selectedSimTipoSesion);
        component.originalSimTipoSesion._estado = 'O';

        mockService.rows.push(component.selectedSimTipoSesion);
    
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
