import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimEstadoAsignacionService } from './sim.estadoasignacion.service';
import { SimEstadoAsignacionModel } from './sim.estadoasignacion.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.estadoasignacion.dialog.html',
  // styleUrls: ['./sim.estadoasignacion.dialog.css'],
  providers: [SimEstadoAsignacionService]
})
export class SimEstadoAsignacionDialog {
    selectedSimEstadoAsignacion: SimEstadoAsignacionModel;
    originalSimEstadoAsignacion: SimEstadoAsignacionModel;

    simEstadoAsignacionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simEstadoAsignacionService: SimEstadoAsignacionService,
                public dialogRef: MatDialogRef<SimEstadoAsignacionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimEstadoAsignacion = data.selected;
        this.originalSimEstadoAsignacion = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simEstadoAsignacionForm = this.builder.group({
            'SimEstadoAsignacionId': [ this.selectedSimEstadoAsignacion.SimEstadoAsignacionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimEstadoAsignacionCodigo': [ this.selectedSimEstadoAsignacion.SimEstadoAsignacionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimEstadoAsignacionNombre': [ this.selectedSimEstadoAsignacion.SimEstadoAsignacionNombre, [ Validators.required, Validators.maxLength(40), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimEstadoAsignacionEstado': [ this.selectedSimEstadoAsignacion.SimEstadoAsignacionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimEstadoAsignacion._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simEstadoAsignacionForm.valueChanges.subscribe((data) => {

            this.simEstadoAsignacionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimEstadoAsignacionModel) {
        this._proc = true;
        if (this.simEstadoAsignacionForm.valid) {
            formData = Object.assign(SimEstadoAsignacionModel.clone(this.originalSimEstadoAsignacion), formData);
            this.simEstadoAsignacionService.save(formData, this.originalSimEstadoAsignacion).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimEstadoAsignacion, formData);
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

    onDelete(formData: SimEstadoAsignacionModel) {
        if (this.simEstadoAsignacionForm.valid) {
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
                    this.simEstadoAsignacionService.delete(this.selectedSimEstadoAsignacion).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimEstadoAsignacion._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimEstadoAsignacion,
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
        Object.keys(this.simEstadoAsignacionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simEstadoAsignacionForm.errors[key]}\n`;
        });

        let controls = this.simEstadoAsignacionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
