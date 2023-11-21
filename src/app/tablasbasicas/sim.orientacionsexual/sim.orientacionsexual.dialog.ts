import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimOrientacionSexualService } from './sim.orientacionsexual.service';
import { SimOrientacionSexualModel } from './sim.orientacionsexual.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.orientacionsexual.dialog.html',
  // styleUrls: ['./sim.orientacionsexual.dialog.css'],
  providers: [SimOrientacionSexualService]
})
export class SimOrientacionSexualDialog {
    selectedSimOrientacionSexual: SimOrientacionSexualModel;
    originalSimOrientacionSexual: SimOrientacionSexualModel;

    simOrientacionSexualForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simOrientacionSexualService: SimOrientacionSexualService,
                public dialogRef: MatDialogRef<SimOrientacionSexualDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimOrientacionSexual = data.selected;
        this.originalSimOrientacionSexual = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simOrientacionSexualForm = this.builder.group({
            'SimOrientacionSexualId': [ this.selectedSimOrientacionSexual.SimOrientacionSexualId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimOrientacionSexualCodigo': [ this.selectedSimOrientacionSexual.SimOrientacionSexualCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimOrientacionSexualNombre': [ this.selectedSimOrientacionSexual.SimOrientacionSexualNombre, [ Validators.required, Validators.maxLength(34), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimOrientacionSexualEstado': [ this.selectedSimOrientacionSexual.SimOrientacionSexualEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimOrientacionSexual._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simOrientacionSexualForm.valueChanges.subscribe((data) => {

            this.simOrientacionSexualForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimOrientacionSexualModel) {
        this._proc = true;
        if (this.simOrientacionSexualForm.valid) {
            formData = Object.assign(SimOrientacionSexualModel.clone(this.originalSimOrientacionSexual), formData);
            this.simOrientacionSexualService.save(formData, this.originalSimOrientacionSexual).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimOrientacionSexual, formData);
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

    onDelete(formData: SimOrientacionSexualModel) {
        if (this.simOrientacionSexualForm.valid) {
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
                    this.simOrientacionSexualService.delete(this.selectedSimOrientacionSexual).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimOrientacionSexual._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimOrientacionSexual,
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
        Object.keys(this.simOrientacionSexualForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simOrientacionSexualForm.errors[key]}\n`;
        });

        let controls = this.simOrientacionSexualForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
