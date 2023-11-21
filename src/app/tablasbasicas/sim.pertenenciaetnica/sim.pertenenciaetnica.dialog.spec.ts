// SimPertenenciaEtnica - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimPertenenciaEtnicaModule } from './sim.pertenenciaetnica.module';
import { SimPertenenciaEtnicaModel } from './sim.pertenenciaetnica.model';
import { SimPertenenciaEtnicaService } from './sim.pertenenciaetnica.service';
import { SimPertenenciaEtnicaMockService } from './sim.pertenenciaetnica.mockservice.spec';
import { SimPertenenciaEtnicaDialog } from './sim.pertenenciaetnica.dialog';

describe('SimPertenenciaEtnicaDialog', () => {
    let component: SimPertenenciaEtnicaDialog;
    let fixture: ComponentFixture<SimPertenenciaEtnicaDialog>;
    let service: SimPertenenciaEtnicaService;
    let _service: SimPertenenciaEtnicaService;
    let mockService: SimPertenenciaEtnicaMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimPertenenciaEtnicaId: 1234,
        SimPertenenciaEtnicaCodigo: 1234,
        SimPertenenciaEtnicaNombre: `Negra. Palenquera y Afrodescendiente`,
        SimPertenenciaEtnicaEstado: true,
        _estado: ''
    };

    let simPertenenciaEtnicaCodigoElement: DebugElement; 
    let simPertenenciaEtnicaNombreElement: DebugElement; 
    let simPertenenciaEtnicaEstadoElement: DebugElement; 

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
                SimPertenenciaEtnicaModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimPertenenciaEtnicaModel(),
                        original: new SimPertenenciaEtnicaModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimPertenenciaEtnicaMockService();
        TestBed.overrideProvider(SimPertenenciaEtnicaService, { useValue: mockService });
        service = TestBed.inject(SimPertenenciaEtnicaService);

        fixture = TestBed.createComponent(SimPertenenciaEtnicaDialog);
        _service = fixture.debugElement.injector.get(SimPertenenciaEtnicaService);
        component = fixture.componentInstance;
        
        simPertenenciaEtnicaCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimPertenenciaEtnicaCodigo"]')); 
        simPertenenciaEtnicaNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimPertenenciaEtnicaNombre"]')); 
        simPertenenciaEtnicaEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimPertenenciaEtnicaEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimPertenenciaEtnicaMockService")
        expect(_service.constructor.name).toBe("SimPertenenciaEtnicaMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simPertenenciaEtnicaForm.controls.SimPertenenciaEtnicaCodigo.setValue(rowBase.SimPertenenciaEtnicaCodigo);
        component.simPertenenciaEtnicaForm.controls.SimPertenenciaEtnicaNombre.setValue(rowBase.SimPertenenciaEtnicaNombre);
        component.simPertenenciaEtnicaForm.controls.SimPertenenciaEtnicaEstado.setValue(rowBase.SimPertenenciaEtnicaEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimPertenenciaEtnicaId).toBe(mockService.autoincrement);
        expect(row.SimPertenenciaEtnicaCodigo).toBe(rowBase.SimPertenenciaEtnicaCodigo);
        expect(row.SimPertenenciaEtnicaNombre).toBe(rowBase.SimPertenenciaEtnicaNombre);
        expect(row.SimPertenenciaEtnicaEstado).toBe(rowBase.SimPertenenciaEtnicaEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimPertenenciaEtnica = new SimPertenenciaEtnicaModel(rowBase);
        component.selectedSimPertenenciaEtnica._estado = 'O';
        component.originalSimPertenenciaEtnica = SimPertenenciaEtnicaModel.clone(component.selectedSimPertenenciaEtnica);
        component.originalSimPertenenciaEtnica._estado = 'O';

        mockService.rows.push(component.selectedSimPertenenciaEtnica);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimPertenenciaEtnicaId).toBe(rowBase.SimPertenenciaEtnicaId);
        expect(row.SimPertenenciaEtnicaCodigo).toBe(rowBase.SimPertenenciaEtnicaCodigo);
        expect(row.SimPertenenciaEtnicaNombre).toBe(rowBase.SimPertenenciaEtnicaNombre);
        expect(row.SimPertenenciaEtnicaEstado).toBe(rowBase.SimPertenenciaEtnicaEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimPertenenciaEtnica = new SimPertenenciaEtnicaModel(rowBase);
        component.selectedSimPertenenciaEtnica._estado = 'O';
        component.originalSimPertenenciaEtnica = SimPertenenciaEtnicaModel.clone(component.selectedSimPertenenciaEtnica);
        component.originalSimPertenenciaEtnica._estado = 'O';

        mockService.rows.push(component.selectedSimPertenenciaEtnica);
    
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
