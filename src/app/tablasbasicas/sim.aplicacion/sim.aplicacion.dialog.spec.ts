// SimAplicacion - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimAplicacionModule } from './sim.aplicacion.module';
import { SimAplicacionModel } from './sim.aplicacion.model';
import { SimAplicacionService } from './sim.aplicacion.service';
import { SimAplicacionMockService } from './sim.aplicacion.mockservice.spec';
import { SimAplicacionDialog } from './sim.aplicacion.dialog';

describe('SimAplicacionDialog', () => {
    let component: SimAplicacionDialog;
    let fixture: ComponentFixture<SimAplicacionDialog>;
    let service: SimAplicacionService;
    let _service: SimAplicacionService;
    let mockService: SimAplicacionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimAplicacionId: 1234,
        SimAplicacionCodigo: 1234,
        SimAplicacionNombre: `SICEQ`,
        SimAplicacionEstado: true,
        _estado: ''
    };

    let simAplicacionCodigoElement: DebugElement; 
    let simAplicacionNombreElement: DebugElement; 
    let simAplicacionEstadoElement: DebugElement; 

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
                SimAplicacionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimAplicacionModel(),
                        original: new SimAplicacionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimAplicacionMockService();
        TestBed.overrideProvider(SimAplicacionService, { useValue: mockService });
        service = TestBed.inject(SimAplicacionService);

        fixture = TestBed.createComponent(SimAplicacionDialog);
        _service = fixture.debugElement.injector.get(SimAplicacionService);
        component = fixture.componentInstance;
        
        simAplicacionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimAplicacionCodigo"]')); 
        simAplicacionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimAplicacionNombre"]')); 
        simAplicacionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimAplicacionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimAplicacionMockService")
        expect(_service.constructor.name).toBe("SimAplicacionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simAplicacionForm.controls.SimAplicacionCodigo.setValue(rowBase.SimAplicacionCodigo);
        component.simAplicacionForm.controls.SimAplicacionNombre.setValue(rowBase.SimAplicacionNombre);
        component.simAplicacionForm.controls.SimAplicacionEstado.setValue(rowBase.SimAplicacionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimAplicacionId).toBe(mockService.autoincrement);
        expect(row.SimAplicacionCodigo).toBe(rowBase.SimAplicacionCodigo);
        expect(row.SimAplicacionNombre).toBe(rowBase.SimAplicacionNombre);
        expect(row.SimAplicacionEstado).toBe(rowBase.SimAplicacionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimAplicacion = new SimAplicacionModel(rowBase);
        component.selectedSimAplicacion._estado = 'O';
        component.originalSimAplicacion = SimAplicacionModel.clone(component.selectedSimAplicacion);
        component.originalSimAplicacion._estado = 'O';

        mockService.rows.push(component.selectedSimAplicacion);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimAplicacionId).toBe(rowBase.SimAplicacionId);
        expect(row.SimAplicacionCodigo).toBe(rowBase.SimAplicacionCodigo);
        expect(row.SimAplicacionNombre).toBe(rowBase.SimAplicacionNombre);
        expect(row.SimAplicacionEstado).toBe(rowBase.SimAplicacionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimAplicacion = new SimAplicacionModel(rowBase);
        component.selectedSimAplicacion._estado = 'O';
        component.originalSimAplicacion = SimAplicacionModel.clone(component.selectedSimAplicacion);
        component.originalSimAplicacion._estado = 'O';

        mockService.rows.push(component.selectedSimAplicacion);
    
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
