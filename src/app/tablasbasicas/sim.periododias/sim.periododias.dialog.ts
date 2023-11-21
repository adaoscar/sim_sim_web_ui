import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimPeriodoDiasService } from './sim.periododias.service';
import { SimPeriodoDiasModel } from './sim.periododias.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.periododias.dialog.html',
  // styleUrls: ['./sim.periododias.dialog.css'],
  providers: [SimPeriodoDiasService]
})
export class SimPeriodoDiasDialog {
    selectedSimPeriodoDias: SimPeriodoDiasModel;
    originalSimPeriodoDias: SimPeriodoDiasModel;

    simPeriodoDiasForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simPeriodoDiasService: SimPeriodoDiasService,
                public dialogRef: MatDialogRef<SimPeriodoDiasDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimPeriodoDias = data.selected;
        this.originalSimPeriodoDias = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simPeriodoDiasForm = this.builder.group({
            'SimPeriodoDiasId': [ this.selectedSimPeriodoDias.SimPeriodoDiasId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimPeriodoDiasCodigo': [ this.selectedSimPeriodoDias.SimPeriodoDiasCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimPeriodoDiasNombre': [ this.selectedSimPeriodoDias.SimPeriodoDiasNombre, [ Validators.required, Validators.maxLength(60), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimPeriodoDiasEstado': [ this.selectedSimPeriodoDias.SimPeriodoDiasEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimPeriodoDias._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simPeriodoDiasForm.valueChanges.subscribe((data) => {

            this.simPeriodoDiasForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimPeriodoDiasModel) {
        this._proc = true;
        if (this.simPeriodoDiasForm.valid) {
            formData = Object.assign(SimPeriodoDiasModel.clone(this.originalSimPeriodoDias), formData);
            this.simPeriodoDiasService.save(formData, this.originalSimPeriodoDias).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimPeriodoDias, formData);
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

    onDelete(formData: SimPeriodoDiasModel) {
        if (this.simPeriodoDiasForm.valid) {
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
                    this.simPeriodoDiasService.delete(this.selectedSimPeriodoDias).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimPeriodoDias._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimPeriodoDias,
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
        Object.keys(this.simPeriodoDiasForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simPeriodoDiasForm.errors[key]}\n`;
        });

        let controls = this.simPeriodoDiasForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
