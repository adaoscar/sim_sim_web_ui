// SimMotivosFinalizacionTramite - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimMotivosFinalizacionTramiteModule } from './sim.motivosfinalizaciontramite.module';
import { SimMotivosFinalizacionTramiteModel } from './sim.motivosfinalizaciontramite.model';
import { SimMotivosFinalizacionTramiteService } from './sim.motivosfinalizaciontramite.service';
import { SimMotivosFinalizacionTramiteMockService } from './sim.motivosfinalizaciontramite.mockservice.spec';
import { SimMotivosFinalizacionTramiteDialog } from './sim.motivosfinalizaciontramite.dialog';

describe('SimMotivosFinalizacionTramiteDialog', () => {
    let component: SimMotivosFinalizacionTramiteDialog;
    let fixture: ComponentFixture<SimMotivosFinalizacionTramiteDialog>;
    let service: SimMotivosFinalizacionTramiteService;
    let _service: SimMotivosFinalizacionTramiteService;
    let mockService: SimMotivosFinalizacionTramiteMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimMotivosFinalizacionTramiteId: 1234,
        SimMotivosFinalizacionTramiteCodigo: 1234,
        SimMotivosFinalizacionTramiteNombre: `Por Asignar`,
        SimMotivosFinalizacionTramiteEstado: true,
        _estado: ''
    };

    let simMotivosFinalizacionTramiteCodigoElement: DebugElement; 
    let simMotivosFinalizacionTramiteNombreElement: DebugElement; 
    let simMotivosFinalizacionTramiteEstadoElement: DebugElement; 

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
                SimMotivosFinalizacionTramiteModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimMotivosFinalizacionTramiteModel(),
                        original: new SimMotivosFinalizacionTramiteModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimMotivosFinalizacionTramiteMockService();
        TestBed.overrideProvider(SimMotivosFinalizacionTramiteService, { useValue: mockService });
        service = TestBed.inject(SimMotivosFinalizacionTramiteService);

        fixture = TestBed.createComponent(SimMotivosFinalizacionTramiteDialog);
        _service = fixture.debugElement.injector.get(SimMotivosFinalizacionTramiteService);
        component = fixture.componentInstance;
        
        simMotivosFinalizacionTramiteCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMotivosFinalizacionTramiteCodigo"]')); 
        simMotivosFinalizacionTramiteNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMotivosFinalizacionTramiteNombre"]')); 
        simMotivosFinalizacionTramiteEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimMotivosFinalizacionTramiteEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimMotivosFinalizacionTramiteMockService")
        expect(_service.constructor.name).toBe("SimMotivosFinalizacionTramiteMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simMotivosFinalizacionTramiteForm.controls.SimMotivosFinalizacionTramiteCodigo.setValue(rowBase.SimMotivosFinalizacionTramiteCodigo);
        component.simMotivosFinalizacionTramiteForm.controls.SimMotivosFinalizacionTramiteNombre.setValue(rowBase.SimMotivosFinalizacionTramiteNombre);
        component.simMotivosFinalizacionTramiteForm.controls.SimMotivosFinalizacionTramiteEstado.setValue(rowBase.SimMotivosFinalizacionTramiteEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMotivosFinalizacionTramiteId).toBe(mockService.autoincrement);
        expect(row.SimMotivosFinalizacionTramiteCodigo).toBe(rowBase.SimMotivosFinalizacionTramiteCodigo);
        expect(row.SimMotivosFinalizacionTramiteNombre).toBe(rowBase.SimMotivosFinalizacionTramiteNombre);
        expect(row.SimMotivosFinalizacionTramiteEstado).toBe(rowBase.SimMotivosFinalizacionTramiteEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimMotivosFinalizacionTramite = new SimMotivosFinalizacionTramiteModel(rowBase);
        component.selectedSimMotivosFinalizacionTramite._estado = 'O';
        component.originalSimMotivosFinalizacionTramite = SimMotivosFinalizacionTramiteModel.clone(component.selectedSimMotivosFinalizacionTramite);
        component.originalSimMotivosFinalizacionTramite._estado = 'O';

        mockService.rows.push(component.selectedSimMotivosFinalizacionTramite);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMotivosFinalizacionTramiteId).toBe(rowBase.SimMotivosFinalizacionTramiteId);
        expect(row.SimMotivosFinalizacionTramiteCodigo).toBe(rowBase.SimMotivosFinalizacionTramiteCodigo);
        expect(row.SimMotivosFinalizacionTramiteNombre).toBe(rowBase.SimMotivosFinalizacionTramiteNombre);
        expect(row.SimMotivosFinalizacionTramiteEstado).toBe(rowBase.SimMotivosFinalizacionTramiteEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimMotivosFinalizacionTramite = new SimMotivosFinalizacionTramiteModel(rowBase);
        component.selectedSimMotivosFinalizacionTramite._estado = 'O';
        component.originalSimMotivosFinalizacionTramite = SimMotivosFinalizacionTramiteModel.clone(component.selectedSimMotivosFinalizacionTramite);
        component.originalSimMotivosFinalizacionTramite._estado = 'O';

        mockService.rows.push(component.selectedSimMotivosFinalizacionTramite);
    
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
