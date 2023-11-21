// SimUsuario - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimUsuarioModule } from './sim.usuario.module';
import { SimUsuarioModel } from './sim.usuario.model';
import { SimUsuarioService } from './sim.usuario.service';
import { SimUsuarioMockService } from './sim.usuario.mockservice.spec';
import { SimUsuarioDialog } from './sim.usuario.dialog';

describe('SimUsuarioDialog', () => {
    let component: SimUsuarioDialog;
    let fixture: ComponentFixture<SimUsuarioDialog>;
    let service: SimUsuarioService;
    let _service: SimUsuarioService;
    let mockService: SimUsuarioMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        SimUsuarioId: 123456789,
        SimTipoDocumentoId: 47,
        SimUsuarioDocumento: `1020749786`,
        SimUsuarioNombres: `John Freddy`,
        SimUsuarioApellidos: `Buitrago Quevedo`,
        SimUsuarioTelefono: `3204754545`,
        SimUsuarioEmail: `prueba@solin.com`,
        SimUsuarioEstado: true,
        SimUsuarioRoles: `administrador`,
        SimTipoDocumento: {
            SimTipoDocumentoId: 47,
            SimTipoDocumentoNombre: `Cedula`
        },
        _estado: ''
    };

    let simUsuarioDocumentoElement: DebugElement; 
    let simUsuarioNombresElement: DebugElement; 
    let simUsuarioApellidosElement: DebugElement; 
    let simUsuarioTelefonoElement: DebugElement; 
    let simUsuarioEmailElement: DebugElement; 
    let simUsuarioEstadoElement: DebugElement; 
    let simUsuarioRolesElement: DebugElement; 
    let simTipoDocumentoCtrlElement: DebugElement; 

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
                SimUsuarioModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new SimUsuarioModel(),
                        original: new SimUsuarioModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new SimUsuarioMockService();
        TestBed.overrideProvider(SimUsuarioService, { useValue: mockService });
        service = TestBed.inject(SimUsuarioService);

        fixture = TestBed.createComponent(SimUsuarioDialog);
        _service = fixture.debugElement.injector.get(SimUsuarioService);
        component = fixture.componentInstance;
        
        simUsuarioDocumentoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimUsuarioDocumento"]')); 
        simUsuarioNombresElement = fixture.debugElement.query(By.css('input[formcontrolname="SimUsuarioNombres"]')); 
        simUsuarioApellidosElement = fixture.debugElement.query(By.css('input[formcontrolname="SimUsuarioApellidos"]')); 
        simUsuarioTelefonoElement = fixture.debugElement.query(By.css('input[formcontrolname="SimUsuarioTelefono"]')); 
        simUsuarioEmailElement = fixture.debugElement.query(By.css('input[formcontrolname="SimUsuarioEmail"]')); 
        simUsuarioEstadoElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="SimUsuarioEstado"]')); 
        simUsuarioRolesElement = fixture.debugElement.query(By.css('input[formcontrolname="SimUsuarioRoles"]')); 
        simTipoDocumentoCtrlElement = fixture.debugElement.query(By.css('input[formcontrolname="simTipoDocumentoNombreCtrl"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("SimUsuarioMockService")
        expect(_service.constructor.name).toBe("SimUsuarioMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.simUsuarioForm.controls.SimUsuarioDocumento.setValue(rowBase.SimUsuarioDocumento);
        component.simUsuarioForm.controls.SimUsuarioNombres.setValue(rowBase.SimUsuarioNombres);
        component.simUsuarioForm.controls.SimUsuarioApellidos.setValue(rowBase.SimUsuarioApellidos);
        component.simUsuarioForm.controls.SimUsuarioTelefono.setValue(rowBase.SimUsuarioTelefono);
        component.simUsuarioForm.controls.SimUsuarioEmail.setValue(rowBase.SimUsuarioEmail);
        component.simUsuarioForm.controls.SimUsuarioEstado.setValue(rowBase.SimUsuarioEstado);
        component.simUsuarioForm.controls.SimUsuarioRoles.setValue(rowBase.SimUsuarioRoles);
        component.onSelectSimTipoDocumentoNombre(rowBase.SimTipoDocumento);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimUsuarioId).toBe(mockService.autoincrement);
        expect(row.SimTipoDocumentoId).toBe(rowBase.SimTipoDocumentoId);
        expect(row.SimUsuarioDocumento).toBe(rowBase.SimUsuarioDocumento);
        expect(row.SimUsuarioNombres).toBe(rowBase.SimUsuarioNombres);
        expect(row.SimUsuarioApellidos).toBe(rowBase.SimUsuarioApellidos);
        expect(row.SimUsuarioTelefono).toBe(rowBase.SimUsuarioTelefono);
        expect(row.SimUsuarioEmail).toBe(rowBase.SimUsuarioEmail);
        expect(row.SimUsuarioEstado).toBe(rowBase.SimUsuarioEstado);
        expect(row.SimUsuarioRoles).toBe(rowBase.SimUsuarioRoles);

    });


    it('should display a Dialog for Update', () => {

        component.selectedSimUsuario = new SimUsuarioModel(rowBase);
        component.selectedSimUsuario._estado = 'O';
        component.originalSimUsuario = SimUsuarioModel.clone(component.selectedSimUsuario);
        component.originalSimUsuario._estado = 'O';

        mockService.rows.push(component.selectedSimUsuario);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.SimUsuarioId).toBe(rowBase.SimUsuarioId);
        expect(row.SimTipoDocumentoId).toBe(rowBase.SimTipoDocumentoId);
        expect(row.SimUsuarioDocumento).toBe(rowBase.SimUsuarioDocumento);
        expect(row.SimUsuarioNombres).toBe(rowBase.SimUsuarioNombres);
        expect(row.SimUsuarioApellidos).toBe(rowBase.SimUsuarioApellidos);
        expect(row.SimUsuarioTelefono).toBe(rowBase.SimUsuarioTelefono);
        expect(row.SimUsuarioEmail).toBe(rowBase.SimUsuarioEmail);
        expect(row.SimUsuarioEstado).toBe(rowBase.SimUsuarioEstado);
        expect(row.SimUsuarioRoles).toBe(rowBase.SimUsuarioRoles);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedSimUsuario = new SimUsuarioModel(rowBase);
        component.selectedSimUsuario._estado = 'O';
        component.originalSimUsuario = SimUsuarioModel.clone(component.selectedSimUsuario);
        component.originalSimUsuario._estado = 'O';

        mockService.rows.push(component.selectedSimUsuario);
    
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
