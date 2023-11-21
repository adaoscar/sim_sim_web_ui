// SimOcupacion - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimOcupacionModule } from './sim.ocupacion.module';
import { SimOcupacionModel } from './sim.ocupacion.model';
import { SimOcupacionService } from './sim.ocupacion.service';
import { SimOcupacionMockService } from './sim.ocupacion.mockservice.spec';
import { SimOcupacionDialog } from './sim.ocupacion.dialog';

describe('SimOcupacionDialog', () => {
    let component: SimOcupacionDialog;
    let fixture: ComponentFixture<SimOcupacionDialog>;
    let service: SimOcupacionService;
    let _service: SimOcupacionService;
    let mockService: SimOcupacionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimOcupacionId: 1234,
        SimOcupacionCodigo: 1234,
        SimOcupacionNombre: `Heterosexual`,
        SimOcupacionEstado: true,
        _estado: ''
    };

    let simOcupacionCodigoElement: DebugElement; 
    let simOcupacionNombreElement: DebugElement; 
    let simOcupacionEstadoElement: DebugElement; 

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
                SimOcupacionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimOcupacionModel(),
                        original: new SimOcupacionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimOcupacionMockService();
        TestBed.overrideProvider(SimOcupacionService, { useValue: mockService });
        service = TestBed.inject(SimOcupacionService);

        fixture = TestBed.createComponent(SimOcupacionDialog);
        _service = fixture.debugElement.injector.get(SimOcupacionService);
        component = fixture.componentInstance;
        
        simOcupacionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimOcupacionCodigo"]')); 
        simOcupacionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimOcupacionNombre"]')); 
        simOcupacionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimOcupacionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimOcupacionMockService")
        expect(_service.constructor.name).toBe("SimOcupacionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simOcupacionForm.controls.SimOcupacionCodigo.setValue(rowBase.SimOcupacionCodigo);
        component.simOcupacionForm.controls.SimOcupacionNombre.setValue(rowBase.SimOcupacionNombre);
        component.simOcupacionForm.controls.SimOcupacionEstado.setValue(rowBase.SimOcupacionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimOcupacionId).toBe(mockService.autoincrement);
        expect(row.SimOcupacionCodigo).toBe(rowBase.SimOcupacionCodigo);
        expect(row.SimOcupacionNombre).toBe(rowBase.SimOcupacionNombre);
        expect(row.SimOcupacionEstado).toBe(rowBase.SimOcupacionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimOcupacion = new SimOcupacionModel(rowBase);
        component.selectedSimOcupacion._estado = 'O';
        component.originalSimOcupacion = SimOcupacionModel.clone(component.selectedSimOcupacion);
        component.originalSimOcupacion._estado = 'O';

        mockService.rows.push(component.selectedSimOcupacion);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimOcupacionId).toBe(rowBase.SimOcupacionId);
        expect(row.SimOcupacionCodigo).toBe(rowBase.SimOcupacionCodigo);
        expect(row.SimOcupacionNombre).toBe(rowBase.SimOcupacionNombre);
        expect(row.SimOcupacionEstado).toBe(rowBase.SimOcupacionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimOcupacion = new SimOcupacionModel(rowBase);
        component.selectedSimOcupacion._estado = 'O';
        component.originalSimOcupacion = SimOcupacionModel.clone(component.selectedSimOcupacion);
        component.originalSimOcupacion._estado = 'O';

        mockService.rows.push(component.selectedSimOcupacion);
    
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
