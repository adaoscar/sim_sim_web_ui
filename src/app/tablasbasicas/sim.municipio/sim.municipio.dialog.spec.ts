// SimMunicipio - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimMunicipioModule } from './sim.municipio.module';
import { SimMunicipioModel } from './sim.municipio.model';
import { SimMunicipioService } from './sim.municipio.service';
import { SimMunicipioMockService } from './sim.municipio.mockservice.spec';
import { SimMunicipioDialog } from './sim.municipio.dialog';

describe('SimMunicipioDialog', () => {
    let component: SimMunicipioDialog;
    let fixture: ComponentFixture<SimMunicipioDialog>;
    let service: SimMunicipioService;
    let _service: SimMunicipioService;
    let mockService: SimMunicipioMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimMunicipioId: 4483,
        SimDepartamentoId: 45,
        SimMunicipioCodigo: 980,
        SiceqAutoridadJudicialId: 135,
        SimMunicipioEstado: true,
        SimDepartamento: {
            SimDepartamentoId: 45,
            SimDepartamentoNombre: `Vichada`
        },
        SiceqAutoridadJudicial: {
            SiceqAutoridadJudicialId: 135,
            SimMunicipioNombre: `ZONA BANANERA`
        },
        _estado: ''
    };

    let simMunicipioCodigoElement: DebugElement; 
    let simMunicipioEstadoElement: DebugElement; 
    let simDepartamentoCtrlElement: DebugElement; 
    let siceqAutoridadJudicialCtrlElement: DebugElement; 

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
                SimMunicipioModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimMunicipioModel(),
                        original: new SimMunicipioModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimMunicipioMockService();
        TestBed.overrideProvider(SimMunicipioService, { useValue: mockService });
        service = TestBed.inject(SimMunicipioService);

        fixture = TestBed.createComponent(SimMunicipioDialog);
        _service = fixture.debugElement.injector.get(SimMunicipioService);
        component = fixture.componentInstance;
        
        simMunicipioCodigoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimMunicipioCodigo"]')); 
        simMunicipioEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimMunicipioEstado"]')); 
        simDepartamentoCtrlElement = fixture.debugElement.query(By.css('input[formcontrolname="simDepartamentoNombreCtrl"]')); 
        siceqAutoridadJudicialCtrlElement = fixture.debugElement.query(By.css('input[formcontrolname="simMunicipioNombreCtrl"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimMunicipioMockService")
        expect(_service.constructor.name).toBe("SimMunicipioMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simMunicipioForm.controls.SimMunicipioCodigo.setValue(rowBase.SimMunicipioCodigo);
        component.simMunicipioForm.controls.SimMunicipioEstado.setValue(rowBase.SimMunicipioEstado);
        component.onSelectSimDepartamentoNombre(rowBase.SimDepartamento);
        component.onSelectSimMunicipioNombre(rowBase.SiceqAutoridadJudicial);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMunicipioId).toBe(mockService.autoincrement);
        expect(row.SimDepartamentoId).toBe(rowBase.SimDepartamentoId);
        expect(row.SimMunicipioCodigo).toBe(rowBase.SimMunicipioCodigo);
        expect(row.SiceqAutoridadJudicialId).toBe(rowBase.SiceqAutoridadJudicialId);
        expect(row.SimMunicipioEstado).toBe(rowBase.SimMunicipioEstado);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimMunicipio = new SimMunicipioModel(rowBase);
        component.selectedSimMunicipio._estado = 'O';
        component.originalSimMunicipio = SimMunicipioModel.clone(component.selectedSimMunicipio);
        component.originalSimMunicipio._estado = 'O';

        mockService.rows.push(component.selectedSimMunicipio);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimMunicipioId).toBe(rowBase.SimMunicipioId);
        expect(row.SimDepartamentoId).toBe(rowBase.SimDepartamentoId);
        expect(row.SimMunicipioCodigo).toBe(rowBase.SimMunicipioCodigo);
        expect(row.SiceqAutoridadJudicialId).toBe(rowBase.SiceqAutoridadJudicialId);
        expect(row.SimMunicipioEstado).toBe(rowBase.SimMunicipioEstado);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimMunicipio = new SimMunicipioModel(rowBase);
        component.selectedSimMunicipio._estado = 'O';
        component.originalSimMunicipio = SimMunicipioModel.clone(component.selectedSimMunicipio);
        component.originalSimMunicipio._estado = 'O';

        mockService.rows.push(component.selectedSimMunicipio);
    
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
