import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimEstadoDocumentoService } from './sim.estadodocumento.service';
import { SimEstadoDocumentoModel } from './sim.estadodocumento.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.estadodocumento.dialog.html',
  // styleUrls: ['./sim.estadodocumento.dialog.css'],
  providers: [SimEstadoDocumentoService]
})
export class SimEstadoDocumentoDialog {
    selectedSimEstadoDocumento: SimEstadoDocumentoModel;
    originalSimEstadoDocumento: SimEstadoDocumentoModel;

    simEstadoDocumentoForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simEstadoDocumentoService: SimEstadoDocumentoService,
                public dialogRef: MatDialogRef<SimEstadoDocumentoDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimEstadoDocumento = data.selected;
        this.originalSimEstadoDocumento = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simEstadoDocumentoForm = this.builder.group({
            'SimEstadoDocumentoId': [ this.selectedSimEstadoDocumento.SimEstadoDocumentoId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimEstadoDocumentoCodigo': [ this.selectedSimEstadoDocumento.SimEstadoDocumentoCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimEstadoDocumentoNombre': [ this.selectedSimEstadoDocumento.SimEstadoDocumentoNombre, [ Validators.required, Validators.maxLength(87), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimEstadoDocumentoEstado': [ this.selectedSimEstadoDocumento.SimEstadoDocumentoEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimEstadoDocumento._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simEstadoDocumentoForm.valueChanges.subscribe((data) => {

            this.simEstadoDocumentoForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimEstadoDocumentoModel) {
        this._proc = true;
        if (this.simEstadoDocumentoForm.valid) {
            formData = Object.assign(SimEstadoDocumentoModel.clone(this.originalSimEstadoDocumento), formData);
            this.simEstadoDocumentoService.save(formData, this.originalSimEstadoDocumento).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimEstadoDocumento, formData);
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

    onDelete(formData: SimEstadoDocumentoModel) {
        if (this.simEstadoDocumentoForm.valid) {
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
                    this.simEstadoDocumentoService.delete(this.selectedSimEstadoDocumento).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimEstadoDocumento._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimEstadoDocumento,
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
        Object.keys(this.simEstadoDocumentoForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simEstadoDocumentoForm.errors[key]}\n`;
        });

        let controls = this.simEstadoDocumentoForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
