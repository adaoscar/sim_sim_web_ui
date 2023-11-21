// SimVulnerabilidadOcupacion - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimVulnerabilidadOcupacionModule } from './sim.vulnerabilidadocupacion.module';
import { SimVulnerabilidadOcupacionModel } from './sim.vulnerabilidadocupacion.model';
import { SimVulnerabilidadOcupacionService } from './sim.vulnerabilidadocupacion.service';
import { SimVulnerabilidadOcupacionMockService } from './sim.vulnerabilidadocupacion.mockservice.spec';
import { SimVulnerabilidadOcupacionDialog } from './sim.vulnerabilidadocupacion.dialog';

describe('SimVulnerabilidadOcupacionDialog', () => {
    let component: SimVulnerabilidadOcupacionDialog;
    let fixture: ComponentFixture<SimVulnerabilidadOcupacionDialog>;
    let service: SimVulnerabilidadOcupacionService;
    let _service: SimVulnerabilidadOcupacionService;
    let mockService: SimVulnerabilidadOcupacionMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimVulnerabilidadOcupacionId: 1234,
        SimVulnerabilidadOcupacionCodigo: 1234,
        SimVulnerabilidadOcupacionNombre: `Por Asignar`,
        SimVulnerabilidadOcupacionEstado: true,
        _estado: ''
    };

    let simVulnerabilidadOcupacionCodigoElement: DebugElement; 
    let simVulnerabilidadOcupacionNombreElement: DebugElement; 
    let simVulnerabilidadOcupacionEstadoElement: DebugElement; 

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
                SimVulnerabilidadOcupacionModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimVulnerabilidadOcupacionModel(),
                        original: new SimVulnerabilidadOcupacionModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimVulnerabilidadOcupacionMockService();
        TestBed.overrideProvider(SimVulnerabilidadOcupacionService, { useValue: mockService });
        service = TestBed.inject(SimVulnerabilidadOcupacionService);

        fixture = TestBed.createComponent(SimVulnerabilidadOcupacionDialog);
        _service = fixture.debugElement.injector.get(SimVulnerabilidadOcupacionService);
        component = fixture.componentInstance;
        
        simVulnerabilidadOcupacionCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimVulnerabilidadOcupacionCodigo"]')); 
        simVulnerabilidadOcupacionNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimVulnerabilidadOcupacionNombre"]')); 
        simVulnerabilidadOcupacionEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimVulnerabilidadOcupacionEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimVulnerabilidadOcupacionMockService")
        expect(_service.constructor.name).toBe("SimVulnerabilidadOcupacionMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simVulnerabilidadOcupacionForm.controls.SimVulnerabilidadOcupacionCodigo.setValue(rowBase.SimVulnerabilidadOcupacionCodigo);
        component.simVulnerabilidadOcupacionForm.controls.SimVulnerabilidadOcupacionNombre.setValue(rowBase.SimVulnerabilidadOcupacionNombre);
        component.simVulnerabilidadOcupacionForm.controls.SimVulnerabilidadOcupacionEstado.setValue(rowBase.SimVulnerabilidadOcupacionEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimVulnerabilidadOcupacionId).toBe(mockService.autoincrement);
        expect(row.SimVulnerabilidadOcupacionCodigo).toBe(rowBase.SimVulnerabilidadOcupacionCodigo);
        expect(row.SimVulnerabilidadOcupacionNombre).toBe(rowBase.SimVulnerabilidadOcupacionNombre);
        expect(row.SimVulnerabilidadOcupacionEstado).toBe(rowBase.SimVulnerabilidadOcupacionEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimVulnerabilidadOcupacion = new SimVulnerabilidadOcupacionModel(rowBase);
        component.selectedSimVulnerabilidadOcupacion._estado = 'O';
        component.originalSimVulnerabilidadOcupacion = SimVulnerabilidadOcupacionModel.clone(component.selectedSimVulnerabilidadOcupacion);
        component.originalSimVulnerabilidadOcupacion._estado = 'O';

        mockService.rows.push(component.selectedSimVulnerabilidadOcupacion);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimVulnerabilidadOcupacionId).toBe(rowBase.SimVulnerabilidadOcupacionId);
        expect(row.SimVulnerabilidadOcupacionCodigo).toBe(rowBase.SimVulnerabilidadOcupacionCodigo);
        expect(row.SimVulnerabilidadOcupacionNombre).toBe(rowBase.SimVulnerabilidadOcupacionNombre);
        expect(row.SimVulnerabilidadOcupacionEstado).toBe(rowBase.SimVulnerabilidadOcupacionEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimVulnerabilidadOcupacion = new SimVulnerabilidadOcupacionModel(rowBase);
        component.selectedSimVulnerabilidadOcupacion._estado = 'O';
        component.originalSimVulnerabilidadOcupacion = SimVulnerabilidadOcupacionModel.clone(component.selectedSimVulnerabilidadOcupacion);
        component.originalSimVulnerabilidadOcupacion._estado = 'O';

        mockService.rows.push(component.selectedSimVulnerabilidadOcupacion);
    
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
