import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaComponent } from 'arkeos-components';

import { LOGIN_RecuperarClave_Service } from './login.recuperarclave.service';
import { RecuperarClaveModel } from './login.recuperarclave.model';

@Component({
    templateUrl: './login.recuperarclave.dialog.html',
    styleUrls: ['./login.recuperarclave.css'],
    providers: [LOGIN_RecuperarClave_Service]
})
export class LOGIN_RecuperarClave_Dialog {
    
    recuperarClaveForm: FormGroup;
    _isLoadingResults: boolean = false;

    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private builder: FormBuilder,
                private recuperarClaveService: LOGIN_RecuperarClave_Service,
                private dialogRef: MatDialogRef<LOGIN_RecuperarClave_Dialog>,) {

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.recuperarClaveForm = this.builder.group({
            'token': ['', Validators.required ],
            'cedula': ['', Validators.required ],
            'newPassword': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(7)] ],
            'validPassword': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(7)]]
        }, {
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                const data = formGroup.getRawValue();
                let validationErrors = { };
                return validationErrors;
            }
        });
    
        this.route.queryParamMap.subscribe((params: any) => {
            if (params.params === undefined || params.params.id === undefined || params.params.cedula === undefined || params.params.id.length < 100) {
                if (sessionStorage.getItem('recuperar') === null) {
                    this.openNotificationDanger('error', 'Acceso no autorizado');
                } else {
                    sessionStorage.removeItem('recuperar');
                };
                this.onCancelar();
            } else {
                let token = params.params.id;
                let cedula = params.params.cedula;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('recuperar', 'true');
                this.recuperarClaveForm.controls.token.setValue(token);
                this.recuperarClaveForm.controls.cedula.setValue(cedula);                
            };
        });
    }

    onSubmit(formData: RecuperarClaveModel) {
        if (!this._isLoadingResults) {
            if (this.recuperarClaveForm.valid) {
                if (formData.newPassword == formData.validPassword) {
                    this._isLoadingResults = true;
                    this.recuperarClaveService.recuperarClave(formData).subscribe((resp) => {          
                        this._isLoadingResults = false;
                        
                        if (resp.Success) {
                            this.openNotificationDanger('Proceso exitoso', '', 'exito');
                            sessionStorage.removeItem('token');
                            this.dialogRef.close();
                        } else {
                            this.openNotificationDanger('error', resp.Error);
                        };

                    });

                } else {
                    this.openNotificationDanger('error', 'La contraseña nueva y la confirmación no coinciden.');
                };

            } else {
                this.openNotificationDanger('error', 'Datos inválidos');
            };
        };
    }

    onCancelar() {
        if (!this._isLoadingResults) {
            sessionStorage.removeItem('token');
            this.dialogRef.close();
        };
    }
    
    handleKeyPress(e, formData) {
        if (e.key === 'Enter') {
            this.onSubmit(formData);
        };
    }

    openNotificationDanger(titulo: string, mensaje: string, tipo = 'error') { 
        const dialogRef = this.dialog.open(AlertaComponent, { 
            data: {            
                tipo: tipo,
                titulo: titulo, 
                mensaje: mensaje
            }
        });

        dialogRef.afterClosed().subscribe(result => { 
            if (!result.data) {
                this.dialogRef.close();
            };
        });
    }
}