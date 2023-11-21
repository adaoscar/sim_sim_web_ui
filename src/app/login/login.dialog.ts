import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaComponent } from 'arkeos-components';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login.dialog.html',
    styleUrls: ['./login.component.scss', './assets/css/font-awesome.min.css', './assets/css/bootstrap.min.css',
              './assets/css/supersized.css', './assets/css/mj-style.css', './assets/css/media-queries.css'],
})
export class LoginDialog {

    recuperarForm: FormGroup;
    _isLoadingResult: boolean = false;
    
    constructor(public dialog: MatDialog,
                private builder: FormBuilder,
                private loginService: LoginService,
                public dialogRef: MatDialogRef<LoginDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
                    
        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.recuperarForm = this.builder.group({
            'cedula': ['', [ Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ]]
        }, {
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                let validationErrors: any = null;
                return validationErrors;
            }
        });
    }

    onSubmit(formData: any) {
        if (!this._isLoadingResult) {
            this._isLoadingResult = true;
            this.loginService.recuperarClave(formData.cedula).subscribe(resp => {
                this._isLoadingResult = false;

                if (resp.Success) {
                    this.openNotificationDanger('Proceso exitoso', '', 'exito');
                    this.dialogRef.close();
                } else {
                    this.openNotificationDanger('error', resp.Error);
                };

            })
        };
    }

    onCancelar() {
        if (!this._isLoadingResult) {
            this.dialogRef.close();
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