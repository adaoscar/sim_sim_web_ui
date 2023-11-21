// SimTipoDelito - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimTipoDelitoModule } from './sim.tipodelito.module';
import { SimTipoDelitoModel } from './sim.tipodelito.model';
import { SimTipoDelitoService } from './sim.tipodelito.service';
import { SimTipoDelitoMockService } from './sim.tipodelito.mockservice.spec';
import { SimTipoDelitoDialog } from './sim.tipodelito.dialog';

describe('SimTipoDelitoDialog', () => {
    let component: SimTipoDelitoDialog;
    let fixture: ComponentFixture<SimTipoDelitoDialog>;
    let service: SimTipoDelitoService;
    let _service: SimTipoDelitoService;
    let mockService: SimTipoDelitoMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimTipoDelitoId: 1234,
        SimTipoDelitoCodigo: 1234,
        SimTipoDelitoNombre: `Hurto`,
        SimTipoDelitoEstado: true,
        _estado: ''
    };

    let simTipoDelitoCodigoElement: DebugElement; 
    let simTipoDelitoNombreElement: DebugElement; 
    let simTipoDelitoEstadoElement: DebugElement; 

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
                SimTipoDelitoModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimTipoDelitoModel(),
                        original: new SimTipoDelitoModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimTipoDelitoMockService();
        TestBed.overrideProvider(SimTipoDelitoService, { useValue: mockService });
        service = TestBed.inject(SimTipoDelitoService);

        fixture = TestBed.createComponent(SimTipoDelitoDialog);
        _service = fixture.debugElement.injector.get(SimTipoDelitoService);
        component = fixture.componentInstance;
        
        simTipoDelitoCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoDelitoCodigo"]')); 
        simTipoDelitoNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimTipoDelitoNombre"]')); 
        simTipoDelitoEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimTipoDelitoEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimTipoDelitoMockService")
        expect(_service.constructor.name).toBe("SimTipoDelitoMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simTipoDelitoForm.controls.SimTipoDelitoCodigo.setValue(rowBase.SimTipoDelitoCodigo);
        component.simTipoDelitoForm.controls.SimTipoDelitoNombre.setValue(rowBase.SimTipoDelitoNombre);
        component.simTipoDelitoForm.controls.SimTipoDelitoEstado.setValue(rowBase.SimTipoDelitoEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoDelitoId).toBe(mockService.autoincrement);
        expect(row.SimTipoDelitoCodigo).toBe(rowBase.SimTipoDelitoCodigo);
        expect(row.SimTipoDelitoNombre).toBe(rowBase.SimTipoDelitoNombre);
        expect(row.SimTipoDelitoEstado).toBe(rowBase.SimTipoDelitoEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimTipoDelito = new SimTipoDelitoModel(rowBase);
        component.selectedSimTipoDelito._estado = 'O';
        component.originalSimTipoDelito = SimTipoDelitoModel.clone(component.selectedSimTipoDelito);
        component.originalSimTipoDelito._estado = 'O';

        mockService.rows.push(component.selectedSimTipoDelito);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimTipoDelitoId).toBe(rowBase.SimTipoDelitoId);
        expect(row.SimTipoDelitoCodigo).toBe(rowBase.SimTipoDelitoCodigo);
        expect(row.SimTipoDelitoNombre).toBe(rowBase.SimTipoDelitoNombre);
        expect(row.SimTipoDelitoEstado).toBe(rowBase.SimTipoDelitoEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimTipoDelito = new SimTipoDelitoModel(rowBase);
        component.selectedSimTipoDelito._estado = 'O';
        component.originalSimTipoDelito = SimTipoDelitoModel.clone(component.selectedSimTipoDelito);
        component.originalSimTipoDelito._estado = 'O';

        mockService.rows.push(component.selectedSimTipoDelito);
    
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
