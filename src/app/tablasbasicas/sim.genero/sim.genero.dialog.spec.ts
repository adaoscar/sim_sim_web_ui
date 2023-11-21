// SimGenero - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimGeneroModule } from './sim.genero.module';
import { SimGeneroModel } from './sim.genero.model';
import { SimGeneroService } from './sim.genero.service';
import { SimGeneroMockService } from './sim.genero.mockservice.spec';
import { SimGeneroDialog } from './sim.genero.dialog';

describe('SimGeneroDialog', () => {
    let component: SimGeneroDialog;
    let fixture: ComponentFixture<SimGeneroDialog>;
    let service: SimGeneroService;
    let _service: SimGeneroService;
    let mockService: SimGeneroMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimGeneroId: 1234,
        SimGeneroCodigo: 1234,
        SimGeneroNombre: `Masculina`,
        SimGeneroEstado: true,
        _estado: ''
    };

    let simGeneroCodigoElement: DebugElement; 
    let simGeneroNombreElement: DebugElement; 
    let simGeneroEstadoElement: DebugElement; 

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
                SimGeneroModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimGeneroModel(),
                        original: new SimGeneroModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimGeneroMockService();
        TestBed.overrideProvider(SimGeneroService, { useValue: mockService });
        service = TestBed.inject(SimGeneroService);

        fixture = TestBed.createComponent(SimGeneroDialog);
        _service = fixture.debugElement.injector.get(SimGeneroService);
        component = fixture.componentInstance;
        
        simGeneroCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimGeneroCodigo"]')); 
        simGeneroNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="SimGeneroNombre"]')); 
        simGeneroEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimGeneroEstado"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimGeneroMockService")
        expect(_service.constructor.name).toBe("SimGeneroMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simGeneroForm.controls.SimGeneroCodigo.setValue(rowBase.SimGeneroCodigo);
        component.simGeneroForm.controls.SimGeneroNombre.setValue(rowBase.SimGeneroNombre);
        component.simGeneroForm.controls.SimGeneroEstado.setValue(rowBase.SimGeneroEstado);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimGeneroId).toBe(mockService.autoincrement);
        expect(row.SimGeneroCodigo).toBe(rowBase.SimGeneroCodigo);
        expect(row.SimGeneroNombre).toBe(rowBase.SimGeneroNombre);
        expect(row.SimGeneroEstado).toBe(rowBase.SimGeneroEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimGenero = new SimGeneroModel(rowBase);
        component.selectedSimGenero._estado = 'O';
        component.originalSimGenero = SimGeneroModel.clone(component.selectedSimGenero);
        component.originalSimGenero._estado = 'O';

        mockService.rows.push(component.selectedSimGenero);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimGeneroId).toBe(rowBase.SimGeneroId);
        expect(row.SimGeneroCodigo).toBe(rowBase.SimGeneroCodigo);
        expect(row.SimGeneroNombre).toBe(rowBase.SimGeneroNombre);
        expect(row.SimGeneroEstado).toBe(rowBase.SimGeneroEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimGenero = new SimGeneroModel(rowBase);
        component.selectedSimGenero._estado = 'O';
        component.originalSimGenero = SimGeneroModel.clone(component.selectedSimGenero);
        component.originalSimGenero._estado = 'O';

        mockService.rows.push(component.selectedSimGenero);
    
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
