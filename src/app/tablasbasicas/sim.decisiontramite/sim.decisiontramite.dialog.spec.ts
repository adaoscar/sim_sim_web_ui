// SimDecisionTramite - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimDecisionTramiteModule } from '../sim.decisiontramite.module';
import { SimDecisionTramiteModel } from './sim.decisiontramite.model';
import { SimDecisionTramiteService } from './sim.decisiontramite.service';
import { SimDecisionTramiteMockService } from './sim.decisiontramite.mockservice.spec';
import { SimDecisionTramiteDialog } from './sim.decisiontramite.dialog';

describe('SimDecisionTramiteDialog', () => {
    let component: SimDecisionTramiteDialog;
    let fixture: ComponentFixture<SimDecisionTramiteDialog>;
    let service: SimDecisionTramiteService;
    let _service: SimDecisionTramiteService;
    let mockService: SimDecisionTramiteMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimDecisionTramiteId: 1234,
        SimDecisionTramiteCodigo: 1234,
        SimDecisionTramiteNombre: `Ámbito familiar conviviente`,
        SimDecisionTramiteEstado: true,
        _estado: ''
    };

    let simDecisionTramiteCodigoElement: DebugElement; 
    let simDecisionTramiteNombreElement: DebugElement; 
    let simDecisionTramiteEstadoElement: DebugElement; 

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
                SimDecisionTramiteModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimDecisionTramiteModel(),
                        original: new SimDecisionTramiteModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimDecisionTramiteMockService();
        TestBed.overrideProvider(SimDecisionTramiteService, { useValue: mockService });
        service = TestBed.inject(SimDecisionTramiteService);

        fixture = TestBed.createComponent(SimDecisionTramiteDialog);
        _service = fixture.debugElement.injector.get(SimDecisionTramiteService);
        component = fixture.componentInstance;
        
        simDecisionTramiteCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimDecisionTramiteCodigo"]')); 
        simDecisionTramiteNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimDecisionTramiteNombre"]')); 
        simDecisionTramiteEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimDecisionTramiteEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimDecisionTramiteMockService")
        expect(_service.constructor.name).toBe("SimDecisionTramiteMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simDecisionTramiteForm.controls.SimDecisionTramiteCodigo.setValue(rowBase.SimDecisionTramiteCodigo);
        component.simDecisionTramiteForm.controls.SimDecisionTramiteNombre.setValue(rowBase.SimDecisionTramiteNombre);
        component.simDecisionTramiteForm.controls.SimDecisionTramiteEstado.setValue(rowBase.SimDecisionTramiteEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimDecisionTramiteId).toBe(mockService.autoincrement);
        expect(row.SimDecisionTramiteCodigo).toBe(rowBase.SimDecisionTramiteCodigo);
        expect(row.SimDecisionTramiteNombre).toBe(rowBase.SimDecisionTramiteNombre);
        expect(row.SimDecisionTramiteEstado).toBe(rowBase.SimDecisionTramiteEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimDecisionTramite = new SimDecisionTramiteModel(rowBase);
        component.selectedSimDecisionTramite._estado = 'O';
        component.originalSimDecisionTramite = SimDecisionTramiteModel.clone(component.selectedSimDecisionTramite);
        component.originalSimDecisionTramite._estado = 'O';

        mockService.rows.push(component.selectedSimDecisionTramite);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimDecisionTramiteId).toBe(rowBase.SimDecisionTramiteId);
        expect(row.SimDecisionTramiteCodigo).toBe(rowBase.SimDecisionTramiteCodigo);
        expect(row.SimDecisionTramiteNombre).toBe(rowBase.SimDecisionTramiteNombre);
        expect(row.SimDecisionTramiteEstado).toBe(rowBase.SimDecisionTramiteEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimDecisionTramite = new SimDecisionTramiteModel(rowBase);
        component.selectedSimDecisionTramite._estado = 'O';
        component.originalSimDecisionTramite = SimDecisionTramiteModel.clone(component.selectedSimDecisionTramite);
        component.originalSimDecisionTramite._estado = 'O';

        mockService.rows.push(component.selectedSimDecisionTramite);
    
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
