import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimEscolaridadService } from './sim.escolaridad.service';
import { SimEscolaridadModel } from './sim.escolaridad.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.escolaridad.dialog.html',
  // styleUrls: ['./sim.escolaridad.dialog.css'],
  providers: [SimEscolaridadService]
})
export class SimEscolaridadDialog {
    selectedSimEscolaridad: SimEscolaridadModel;
    originalSimEscolaridad: SimEscolaridadModel;

    simEscolaridadForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simEscolaridadService: SimEscolaridadService,
                public dialogRef: MatDialogRef<SimEscolaridadDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimEscolaridad = data.selected;
        this.originalSimEscolaridad = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simEscolaridadForm = this.builder.group({
            'SimEscolaridadId': [ this.selectedSimEscolaridad.SimEscolaridadId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimEscolaridadCodigo': [ this.selectedSimEscolaridad.SimEscolaridadCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimEscolaridadNombre': [ this.selectedSimEscolaridad.SimEscolaridadNombre, [ Validators.required, Validators.maxLength(74), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimEscolaridadEstado': [ this.selectedSimEscolaridad.SimEscolaridadEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimEscolaridad._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simEscolaridadForm.valueChanges.subscribe((data) => {

            this.simEscolaridadForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimEscolaridadModel) {
        this._proc = true;
        if (this.simEscolaridadForm.valid) {
            formData = Object.assign(SimEscolaridadModel.clone(this.originalSimEscolaridad), formData);
            this.simEscolaridadService.save(formData, this.originalSimEscolaridad).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimEscolaridad, formData);
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

    onDelete(formData: SimEscolaridadModel) {
        if (this.simEscolaridadForm.valid) {
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
                    this.simEscolaridadService.delete(this.selectedSimEscolaridad).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimEscolaridad._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimEscolaridad,
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
        Object.keys(this.simEscolaridadForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simEscolaridadForm.errors[key]}\n`;
        });

        let controls = this.simEscolaridadForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
