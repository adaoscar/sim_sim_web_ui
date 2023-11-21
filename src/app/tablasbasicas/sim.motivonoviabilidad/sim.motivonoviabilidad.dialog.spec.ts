// SimMotivoNoViabilidad - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimMotivoNoViabilidadModule } from './sim.motivonoviabilidad.module';
import { SimMotivoNoViabilidadModel } from './sim.motivonoviabilidad.model';
import { SimMotivoNoViabilidadService } from './sim.motivonoviabilidad.service';
import { SimMotivoNoViabilidadMockService } from './sim.motivonoviabilidad.mockservice.spec';
import { SimMotivoNoViabilidadDialog } from './sim.motivonoviabilidad.dialog';

describe('SimMotivoNoViabilidadDialog', () => {
    let component: SimMotivoNoViabilidadDialog;
    let fixture: ComponentFixture<SimMotivoNoViabilidadDialog>;
    let service: SimMotivoNoViabilidadService;
    let _service: SimMotivoNoViabilidadService;
    let mockService: SimMotivoNoViabilidadMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimMotivoNoViabilidadId: 1234,
        SimMotivoNoViabilidadCodigo: 1234,
        SimMotivoNoViabilidadNombre: `Condena a prisión perpetua`,
        SimMotivoNoViabilidadEstado: true,
        _estado: ''
    };

    let simMotivoNoViabilidadCodigoElement: DebugElement; 
    let simMotivoNoViabilidadNombreElement: DebugElement; 
    let simMotivoNoViabilidadEstadoElement: DebugElement; 

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
                SimMotivoNoViabilidadModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimMotivoNoViabilidadModel(),
                        original: new SimMotivoNoViabilidadModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimMotivoNoViabilidadMockService();
        TestBed.overrideProvider(SimMotivoNoViabilidadService, { useValue: mockService });
        service = TestBed.inject(SimMotivoNoViabilidadService);

        fixture = TestBed.createComponent(SimMotivoNoViabilidadDialog);
        _service = fixture.debugElement.injector.get(SimMotivoNoViabilidadService);
        component = fixture.componentInstance;
        
        simMotivoNoViabilidadCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMotivoNoViabilidadCodigo"]')); 
        simMotivoNoViabilidadNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMotivoNoViabilidadNombre"]')); 
        simMotivoNoViabilidadEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimMotivoNoViabilidadEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimMotivoNoViabilidadMockService")
        expect(_service.constructor.name).toBe("SimMotivoNoViabilidadMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simMotivoNoViabilidadForm.controls.SimMotivoNoViabilidadCodigo.setValue(rowBase.SimMotivoNoViabilidadCodigo);
        component.simMotivoNoViabilidadForm.controls.SimMotivoNoViabilidadNombre.setValue(rowBase.SimMotivoNoViabilidadNombre);
        component.simMotivoNoViabilidadForm.controls.SimMotivoNoViabilidadEstado.setValue(rowBase.SimMotivoNoViabilidadEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMotivoNoViabilidadId).toBe(mockService.autoincrement);
        expect(row.SimMotivoNoViabilidadCodigo).toBe(rowBase.SimMotivoNoViabilidadCodigo);
        expect(row.SimMotivoNoViabilidadNombre).toBe(rowBase.SimMotivoNoViabilidadNombre);
        expect(row.SimMotivoNoViabilidadEstado).toBe(rowBase.SimMotivoNoViabilidadEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimMotivoNoViabilidad = new SimMotivoNoViabilidadModel(rowBase);
        component.selectedSimMotivoNoViabilidad._estado = 'O';
        component.originalSimMotivoNoViabilidad = SimMotivoNoViabilidadModel.clone(component.selectedSimMotivoNoViabilidad);
        component.originalSimMotivoNoViabilidad._estado = 'O';

        mockService.rows.push(component.selectedSimMotivoNoViabilidad);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMotivoNoViabilidadId).toBe(rowBase.SimMotivoNoViabilidadId);
        expect(row.SimMotivoNoViabilidadCodigo).toBe(rowBase.SimMotivoNoViabilidadCodigo);
        expect(row.SimMotivoNoViabilidadNombre).toBe(rowBase.SimMotivoNoViabilidadNombre);
        expect(row.SimMotivoNoViabilidadEstado).toBe(rowBase.SimMotivoNoViabilidadEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimMotivoNoViabilidad = new SimMotivoNoViabilidadModel(rowBase);
        component.selectedSimMotivoNoViabilidad._estado = 'O';
        component.originalSimMotivoNoViabilidad = SimMotivoNoViabilidadModel.clone(component.selectedSimMotivoNoViabilidad);
        component.originalSimMotivoNoViabilidad._estado = 'O';

        mockService.rows.push(component.selectedSimMotivoNoViabilidad);
    
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
