// SimMedioComunicacion - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimMedioComunicacionModule } from './sim.mediocomunicacion.module';
import { SimMedioComunicacionModel } from './sim.mediocomunicacion.model';
import { SimMedioComunicacionService } from './sim.mediocomunicacion.service';
import { SimMedioComunicacionMockService } from './sim.mediocomunicacion.mockservice.spec';
import { SimMedioComunicacionDialog } from './sim.mediocomunicacion.dialog';

describe('SimMedioComunicacionDialog', () => {
    let component: SimMedioComunicacionDialog;
    let fixture: ComponentFixture<SimMedioComunicacionDialog>;
    let service: SimMedioComunicacionService;
    let _service: SimMedioComunicacionService;
    let mockService: SimMedioComunicacionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimMedioComunicacionId: 1234,
        SimMedioComunicacionCodigo: 1234,
        SimMedioComunicacionNombre: `Por Asignar`,
        SimMedioComunicacionEstado: true,
        _estado: ''
    };

    let simMedioComunicacionCodigoElement: DebugElement; 
    let simMedioComunicacionNombreElement: DebugElement; 
    let simMedioComunicacionEstadoElement: DebugElement; 

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
                SimMedioComunicacionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimMedioComunicacionModel(),
                        original: new SimMedioComunicacionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimMedioComunicacionMockService();
        TestBed.overrideProvider(SimMedioComunicacionService, { useValue: mockService });
        service = TestBed.inject(SimMedioComunicacionService);

        fixture = TestBed.createComponent(SimMedioComunicacionDialog);
        _service = fixture.debugElement.injector.get(SimMedioComunicacionService);
        component = fixture.componentInstance;
        
        simMedioComunicacionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMedioComunicacionCodigo"]')); 
        simMedioComunicacionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMedioComunicacionNombre"]')); 
        simMedioComunicacionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimMedioComunicacionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimMedioComunicacionMockService")
        expect(_service.constructor.name).toBe("SimMedioComunicacionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simMedioComunicacionForm.controls.SimMedioComunicacionCodigo.setValue(rowBase.SimMedioComunicacionCodigo);
        component.simMedioComunicacionForm.controls.SimMedioComunicacionNombre.setValue(rowBase.SimMedioComunicacionNombre);
        component.simMedioComunicacionForm.controls.SimMedioComunicacionEstado.setValue(rowBase.SimMedioComunicacionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMedioComunicacionId).toBe(mockService.autoincrement);
        expect(row.SimMedioComunicacionCodigo).toBe(rowBase.SimMedioComunicacionCodigo);
        expect(row.SimMedioComunicacionNombre).toBe(rowBase.SimMedioComunicacionNombre);
        expect(row.SimMedioComunicacionEstado).toBe(rowBase.SimMedioComunicacionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimMedioComunicacion = new SimMedioComunicacionModel(rowBase);
        component.selectedSimMedioComunicacion._estado = 'O';
        component.originalSimMedioComunicacion = SimMedioComunicacionModel.clone(component.selectedSimMedioComunicacion);
        component.originalSimMedioComunicacion._estado = 'O';

        mockService.rows.push(component.selectedSimMedioComunicacion);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMedioComunicacionId).toBe(rowBase.SimMedioComunicacionId);
        expect(row.SimMedioComunicacionCodigo).toBe(rowBase.SimMedioComunicacionCodigo);
        expect(row.SimMedioComunicacionNombre).toBe(rowBase.SimMedioComunicacionNombre);
        expect(row.SimMedioComunicacionEstado).toBe(rowBase.SimMedioComunicacionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimMedioComunicacion = new SimMedioComunicacionModel(rowBase);
        component.selectedSimMedioComunicacion._estado = 'O';
        component.originalSimMedioComunicacion = SimMedioComunicacionModel.clone(component.selectedSimMedioComunicacion);
        component.originalSimMedioComunicacion._estado = 'O';

        mockService.rows.push(component.selectedSimMedioComunicacion);
    
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
