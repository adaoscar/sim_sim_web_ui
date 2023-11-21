import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { JwtDecodeTokenService } from '../../modulos/jwtdecodetoken.service';
import { LOGIN_CambioClave_Service } from './login.cambioclave.service';
import { LOGIN_CambioClaveModel } from './login.cambioclave.model';
import { AlertaComponent } from 'arkeos-components';

@Component({
  templateUrl: './login.cambioclave.dialog.html',
  providers: [LOGIN_CambioClave_Service]
})
export class LOGIN_CambioClave_Dialog {
    selectedLOGIN_CambioClave: LOGIN_CambioClaveModel;
    
    LOGIN_CambioClaveForm: FormGroup; 
    userTokenData: any;   

    tipoActual: string = 'password';
    tipoNueva: string = 'password';
    tipoConfirmacion: string = 'password';

    iconoActual: string = 'visibility';
    iconoNueva: string = 'visibility';
    iconoConfirmacion: string = 'visibility';

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog,
                private builder: FormBuilder,
                private _snackBar: MatSnackBar,
                private jwtDecodeTokenService: JwtDecodeTokenService,
                private LOGIN_CambioClave_Service: LOGIN_CambioClave_Service,
                private dialogRef: MatDialogRef<LOGIN_CambioClave_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedLOGIN_CambioClave = new LOGIN_CambioClaveModel();
        this.dialogRef.disableClose = true;

        let token = JSON.parse(localStorage.getItem('currentUser')).token;
        jwtDecodeTokenService.getUsuario().subscribe(data => {
            this.userTokenData = data;
        })
    }

    ngOnInit() {
        this.LOGIN_CambioClaveForm = this.builder.group({
            'id': [ this.userTokenData.id ],
            'mail': [ this.userTokenData.mail ],
            'password': [ '', [ Validators.required, Validators.maxLength(15), Validators.minLength(7) ] ],
            'newPassword': [ '', [ Validators.required, Validators.maxLength(15), Validators.minLength(7) ] ],
            'validPassword': [ '', [ Validators.required, Validators.maxLength(15) ] ],
            '_estado': [ this.selectedLOGIN_CambioClave._estado, Validators.required ]
        }, { 
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = { };
                    return validationErrors;
                } 
        });
        
        this.LOGIN_CambioClaveForm.valueChanges.subscribe((data) => {
            this.LOGIN_CambioClaveForm.patchValue({
            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: LOGIN_CambioClaveModel) {
        this._proc = true;
        if (this.LOGIN_CambioClaveForm.valid) {
            if (formData.newPassword == formData.validPassword) {
                formData = Object.assign(this.selectedLOGIN_CambioClave, formData);
                this.LOGIN_CambioClave_Service.update(formData).subscribe((data: any) => {
                    this._proc = false;
                    this._status = data.value;
                    this.resultError = null;

                    if (this._status) {
                        this.openNotificationDanger('Proceso exitoso', '', 'exito');
                        this.dialogRef.close({ 
                            data: data          
                        });
                    } else {
                        this.resultError = data.error[0]?.description;
                        this.openNotificationDanger('Error', this.resultError);
                    };
                });

            } else {
                this._proc = false;
                this.openNotificationDanger('Error', 'La contraseña nueva y la confirmación no coinciden.');
            };
        }
    }

    mostrarContrasena(tipo: string) {
        switch (tipo) {
            case 'actual':
                this.tipoActual = this.tipoActual === 'password' ? 'text' : 'password';
                this.iconoActual = this.iconoActual === 'visibility' ? 'visibility_off' : 'visibility';
                break;
            case 'nueva':
                this.tipoNueva = this.tipoNueva === 'password' ? 'text' : 'password';
                this.iconoNueva = this.iconoNueva === 'visibility' ? 'visibility_off' : 'visibility';
                break;
            case 'confirmacion':
                this.tipoConfirmacion = this.tipoConfirmacion === 'password' ? 'text' : 'password';
                this.iconoConfirmacion = this.iconoConfirmacion === 'visibility' ? 'visibility_off' : 'visibility';
                break;
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
