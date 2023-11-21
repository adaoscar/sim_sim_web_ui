import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimAplicacionService } from './sim.aplicacion.service';
import { SimAplicacionModel } from './sim.aplicacion.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.aplicacion.dialog.html',
  // styleUrls: ['./sim.aplicacion.dialog.css'],
  providers: [SimAplicacionService]
})
export class SimAplicacionDialog {
    selectedSimAplicacion: SimAplicacionModel;
    originalSimAplicacion: SimAplicacionModel;

    simAplicacionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simAplicacionService: SimAplicacionService,
                public dialogRef: MatDialogRef<SimAplicacionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimAplicacion = data.selected;
        this.originalSimAplicacion = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simAplicacionForm = this.builder.group({
            'SimAplicacionId': [ this.selectedSimAplicacion.SimAplicacionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimAplicacionCodigo': [ this.selectedSimAplicacion.SimAplicacionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimAplicacionNombre': [ this.selectedSimAplicacion.SimAplicacionNombre, [ Validators.required, Validators.maxLength(27), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimAplicacionEstado': [ this.selectedSimAplicacion.SimAplicacionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimAplicacion._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simAplicacionForm.valueChanges.subscribe((data) => {

            this.simAplicacionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimAplicacionModel) {
        this._proc = true;
        if (this.simAplicacionForm.valid) {
            formData = Object.assign(SimAplicacionModel.clone(this.originalSimAplicacion), formData);
            this.simAplicacionService.save(formData, this.originalSimAplicacion).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimAplicacion, formData);
                    if(formData._estado === 'N') {
                    }


                    this.dialogRef.close({
                        data: formData
                    });
                } else {
                   this.resultError = data.error.value;
                   this.openNotificationDanger(this.resultError)
                }
            });

        }
    }

    onDelete(formData: SimAplicacionModel) {
        if (this.simAplicacionForm.valid) {
            let sheetRef = this.bottomSheet.open(AlertasArkeosComponent, {
               data: {
                   mensajeTranslate: 'alertas._mensajeEliminar',
                   nombreBoton1: 'Main._aceptar',
                   nombreBoton3: 'Main._cancelar'
               }
            });

            sheetRef.afterDismissed().subscribe(sheetData => {
               if (sheetData.mensaje === "btn_1") {
                    this._proc = true;
                    this.simAplicacionService.delete(this.selectedSimAplicacion).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimAplicacion._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimAplicacion,
                                delete: true
                            });
                        } else {
                            this.resultError = data.error.value;
                            this.openNotificationDanger(this.resultError)
                        }
                    });
                }
            });
        }
    }

    openNotificationDanger(message: string, action?: string) {
       this.snackBar.open(message, action, {
           duration: 2000,
           panelClass: 'dangerSnackBar',
       });
    }


    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.simAplicacionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simAplicacionForm.errors[key]}\n`;
        });

        let controls = this.simAplicacionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
