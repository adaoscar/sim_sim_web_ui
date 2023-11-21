import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimRangoEdadService } from './sim.rangoedad.service';
import { SimRangoEdadModel } from './sim.rangoedad.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.rangoedad.dialog.html',
  // styleUrls: ['./sim.rangoedad.dialog.css'],
  providers: [SimRangoEdadService]
})
export class SimRangoEdadDialog {
    selectedSimRangoEdad: SimRangoEdadModel;
    originalSimRangoEdad: SimRangoEdadModel;

    simRangoEdadForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simRangoEdadService: SimRangoEdadService,
                public dialogRef: MatDialogRef<SimRangoEdadDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimRangoEdad = data.selected;
        this.originalSimRangoEdad = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simRangoEdadForm = this.builder.group({
            'SimRangoEdadId': [ this.selectedSimRangoEdad.SimRangoEdadId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimRangoEdadCodigo': [ this.selectedSimRangoEdad.SimRangoEdadCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimRangoEdadNombre': [ this.selectedSimRangoEdad.SimRangoEdadNombre, [ Validators.required, Validators.maxLength(31), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimRangoEdadEstado': [ this.selectedSimRangoEdad.SimRangoEdadEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimRangoEdad._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simRangoEdadForm.valueChanges.subscribe((data) => {

            this.simRangoEdadForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimRangoEdadModel) {
        this._proc = true;
        if (this.simRangoEdadForm.valid) {
            formData = Object.assign(SimRangoEdadModel.clone(this.originalSimRangoEdad), formData);
            this.simRangoEdadService.save(formData, this.originalSimRangoEdad).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimRangoEdad, formData);
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

    onDelete(formData: SimRangoEdadModel) {
        if (this.simRangoEdadForm.valid) {
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
                    this.simRangoEdadService.delete(this.selectedSimRangoEdad).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimRangoEdad._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimRangoEdad,
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
        Object.keys(this.simRangoEdadForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simRangoEdadForm.errors[key]}\n`;
        });

        let controls = this.simRangoEdadForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
