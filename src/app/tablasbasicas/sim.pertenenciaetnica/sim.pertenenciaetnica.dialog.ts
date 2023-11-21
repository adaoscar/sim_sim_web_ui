import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimPertenenciaEtnicaService } from './sim.pertenenciaetnica.service';
import { SimPertenenciaEtnicaModel } from './sim.pertenenciaetnica.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.pertenenciaetnica.dialog.html',
  // styleUrls: ['./sim.pertenenciaetnica.dialog.css'],
  providers: [SimPertenenciaEtnicaService]
})
export class SimPertenenciaEtnicaDialog {
    selectedSimPertenenciaEtnica: SimPertenenciaEtnicaModel;
    originalSimPertenenciaEtnica: SimPertenenciaEtnicaModel;

    simPertenenciaEtnicaForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simPertenenciaEtnicaService: SimPertenenciaEtnicaService,
                public dialogRef: MatDialogRef<SimPertenenciaEtnicaDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimPertenenciaEtnica = data.selected;
        this.originalSimPertenenciaEtnica = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simPertenenciaEtnicaForm = this.builder.group({
            'SimPertenenciaEtnicaId': [ this.selectedSimPertenenciaEtnica.SimPertenenciaEtnicaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimPertenenciaEtnicaCodigo': [ this.selectedSimPertenenciaEtnica.SimPertenenciaEtnicaCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimPertenenciaEtnicaNombre': [ this.selectedSimPertenenciaEtnica.SimPertenenciaEtnicaNombre, [ Validators.required, Validators.maxLength(87), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimPertenenciaEtnicaEstado': [ this.selectedSimPertenenciaEtnica.SimPertenenciaEtnicaEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimPertenenciaEtnica._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simPertenenciaEtnicaForm.valueChanges.subscribe((data) => {

            this.simPertenenciaEtnicaForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimPertenenciaEtnicaModel) {
        this._proc = true;
        if (this.simPertenenciaEtnicaForm.valid) {
            formData = Object.assign(SimPertenenciaEtnicaModel.clone(this.originalSimPertenenciaEtnica), formData);
            this.simPertenenciaEtnicaService.save(formData, this.originalSimPertenenciaEtnica).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimPertenenciaEtnica, formData);
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

    onDelete(formData: SimPertenenciaEtnicaModel) {
        if (this.simPertenenciaEtnicaForm.valid) {
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
                    this.simPertenenciaEtnicaService.delete(this.selectedSimPertenenciaEtnica).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimPertenenciaEtnica._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimPertenenciaEtnica,
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
        Object.keys(this.simPertenenciaEtnicaForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simPertenenciaEtnicaForm.errors[key]}\n`;
        });

        let controls = this.simPertenenciaEtnicaForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
