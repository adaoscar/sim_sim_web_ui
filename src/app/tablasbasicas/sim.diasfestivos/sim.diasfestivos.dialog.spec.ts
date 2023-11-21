// SimDiasFestivos - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimDiasFestivosModule } from './sim.diasfestivos.module';
import { SimDiasFestivosModel } from './sim.diasfestivos.model';
import { SimDiasFestivosService } from './sim.diasfestivos.service';
import { SimDiasFestivosMockService } from './sim.diasfestivos.mockservice.spec';
import { SimDiasFestivosDialog } from './sim.diasfestivos.dialog';

describe('SimDiasFestivosDialog', () => {
    let component: SimDiasFestivosDialog;
    let fixture: ComponentFixture<SimDiasFestivosDialog>;
    let service: SimDiasFestivosService;
    let _service: SimDiasFestivosService;
    let mockService: SimDiasFestivosMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimDiasFestivosId: 1234,
        SimDiasFestivosFecha: new Date(2020, 9, 26, 12, 0, 0),
        _estado: ''
    };

    let simDiasFestivosFechaElement: DebugElement; 

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
                SimDiasFestivosModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimDiasFestivosModel(),
                        original: new SimDiasFestivosModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimDiasFestivosMockService();
        TestBed.overrideProvider(SimDiasFestivosService, { useValue: mockService });
        service = TestBed.inject(SimDiasFestivosService);

        fixture = TestBed.createComponent(SimDiasFestivosDialog);
        _service = fixture.debugElement.injector.get(SimDiasFestivosService);
        component = fixture.componentInstance;
        
        simDiasFestivosFechaElement = fixture.debugElement.query(By.css('input[formcontrolname="SimDiasFestivosFecha"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimDiasFestivosMockService")
        expect(_service.constructor.name).toBe("SimDiasFestivosMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simDiasFestivosForm.controls.SimDiasFestivosFecha.setValue(rowBase.SimDiasFestivosFecha);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimDiasFestivosId).toBe(mockService.autoincrement);
        expect(row.SimDiasFestivosFecha).toBe(rowBase.SimDiasFestivosFecha);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimDiasFestivos = new SimDiasFestivosModel(rowBase);
        component.selectedSimDiasFestivos._estado = 'O';
        component.originalSimDiasFestivos = SimDiasFestivosModel.clone(component.selectedSimDiasFestivos);
        component.originalSimDiasFestivos._estado = 'O';

        mockService.rows.push(component.selectedSimDiasFestivos);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimDiasFestivosId).toBe(rowBase.SimDiasFestivosId);
        expect(row.SimDiasFestivosFecha).toBe(rowBase.SimDiasFestivosFecha);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimDiasFestivos = new SimDiasFestivosModel(rowBase);
        component.selectedSimDiasFestivos._estado = 'O';
        component.originalSimDiasFestivos = SimDiasFestivosModel.clone(component.selectedSimDiasFestivos);
        component.originalSimDiasFestivos._estado = 'O';

        mockService.rows.push(component.selectedSimDiasFestivos);
    
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
