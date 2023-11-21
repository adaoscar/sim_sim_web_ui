import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimTipoDocumentoService } from './sim.tipodocumento.service';
import { SimTipoDocumentoModel } from './sim.tipodocumento.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.tipodocumento.dialog.html',
  // styleUrls: ['./sim.tipodocumento.dialog.css'],
  providers: [SimTipoDocumentoService]
})
export class SimTipoDocumentoDialog {
    selectedSimTipoDocumento: SimTipoDocumentoModel;
    originalSimTipoDocumento: SimTipoDocumentoModel;

    simTipoDocumentoForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simTipoDocumentoService: SimTipoDocumentoService,
                public dialogRef: MatDialogRef<SimTipoDocumentoDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimTipoDocumento = data.selected;
        this.originalSimTipoDocumento = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simTipoDocumentoForm = this.builder.group({
            'SimTipoDocumentoId': [ this.selectedSimTipoDocumento.SimTipoDocumentoId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoDocumentoCodigo': [ this.selectedSimTipoDocumento.SimTipoDocumentoCodigo, [ Validators.required, Validators.maxLength(2), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimTipoDocumentoNombre': [ this.selectedSimTipoDocumento.SimTipoDocumentoNombre, [ Validators.required, Validators.maxLength(63), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimTipoDocumentoEstado': [ this.selectedSimTipoDocumento.SimTipoDocumentoEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimTipoDocumento._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simTipoDocumentoForm.valueChanges.subscribe((data) => {

            this.simTipoDocumentoForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimTipoDocumentoModel) {
        this._proc = true;
        if (this.simTipoDocumentoForm.valid) {
            formData = Object.assign(SimTipoDocumentoModel.clone(this.originalSimTipoDocumento), formData);
            this.simTipoDocumentoService.save(formData, this.originalSimTipoDocumento).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimTipoDocumento, formData);
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

    onDelete(formData: SimTipoDocumentoModel) {
        if (this.simTipoDocumentoForm.valid) {
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
                    this.simTipoDocumentoService.delete(this.selectedSimTipoDocumento).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimTipoDocumento._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimTipoDocumento,
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
        Object.keys(this.simTipoDocumentoForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simTipoDocumentoForm.errors[key]}\n`;
        });

        let controls = this.simTipoDocumentoForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
