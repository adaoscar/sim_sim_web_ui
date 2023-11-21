// SimVigencia - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimVigenciaModule } from './sim.vigencia.module';
import { SimVigenciaModel } from './sim.vigencia.model';
import { SimVigenciaService } from './sim.vigencia.service';
import { SimVigenciaMockService } from './sim.vigencia.mockservice.spec';
import { SimVigenciaDialog } from './sim.vigencia.dialog';

describe('SimVigenciaDialog', () => {
    let component: SimVigenciaDialog;
    let fixture: ComponentFixture<SimVigenciaDialog>;
    let service: SimVigenciaService;
    let _service: SimVigenciaService;
    let mockService: SimVigenciaMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimVigenciaId: 1234,
        SimVigenciaCodigo: 1234,
        SimVigenciaNombre: `Por Asignar`,
        SimVigenciaEstado: true,
        _estado: ''
    };

    let simVigenciaCodigoElement: DebugElement; 
    let simVigenciaNombreElement: DebugElement; 
    let simVigenciaEstadoElement: DebugElement; 

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
                SimVigenciaModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimVigenciaModel(),
                        original: new SimVigenciaModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimVigenciaMockService();
        TestBed.overrideProvider(SimVigenciaService, { useValue: mockService });
        service = TestBed.inject(SimVigenciaService);

        fixture = TestBed.createComponent(SimVigenciaDialog);
        _service = fixture.debugElement.injector.get(SimVigenciaService);
        component = fixture.componentInstance;
        
        simVigenciaCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimVigenciaCodigo"]')); 
        simVigenciaNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimVigenciaNombre"]')); 
        simVigenciaEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimVigenciaEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimVigenciaMockService")
        expect(_service.constructor.name).toBe("SimVigenciaMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simVigenciaForm.controls.SimVigenciaCodigo.setValue(rowBase.SimVigenciaCodigo);
        component.simVigenciaForm.controls.SimVigenciaNombre.setValue(rowBase.SimVigenciaNombre);
        component.simVigenciaForm.controls.SimVigenciaEstado.setValue(rowBase.SimVigenciaEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimVigenciaId).toBe(mockService.autoincrement);
        expect(row.SimVigenciaCodigo).toBe(rowBase.SimVigenciaCodigo);
        expect(row.SimVigenciaNombre).toBe(rowBase.SimVigenciaNombre);
        expect(row.SimVigenciaEstado).toBe(rowBase.SimVigenciaEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimVigencia = new SimVigenciaModel(rowBase);
        component.selectedSimVigencia._estado = 'O';
        component.originalSimVigencia = SimVigenciaModel.clone(component.selectedSimVigencia);
        component.originalSimVigencia._estado = 'O';

        mockService.rows.push(component.selectedSimVigencia);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimVigenciaId).toBe(rowBase.SimVigenciaId);
        expect(row.SimVigenciaCodigo).toBe(rowBase.SimVigenciaCodigo);
        expect(row.SimVigenciaNombre).toBe(rowBase.SimVigenciaNombre);
        expect(row.SimVigenciaEstado).toBe(rowBase.SimVigenciaEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimVigencia = new SimVigenciaModel(rowBase);
        component.selectedSimVigencia._estado = 'O';
        component.originalSimVigencia = SimVigenciaModel.clone(component.selectedSimVigencia);
        component.originalSimVigencia._estado = 'O';

        mockService.rows.push(component.selectedSimVigencia);
    
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
