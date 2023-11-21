import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimAmbitoService } from './sim.ambito.service';
import { SimAmbitoModel } from './sim.ambito.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.ambito.dialog.html',
  // styleUrls: ['./sim.ambito.dialog.css'],
  providers: [SimAmbitoService]
})
export class SimAmbitoDialog {
    selectedSimAmbito: SimAmbitoModel;
    originalSimAmbito: SimAmbitoModel;

    simAmbitoForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simAmbitoService: SimAmbitoService,
                public dialogRef: MatDialogRef<SimAmbitoDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimAmbito = data.selected;
        this.originalSimAmbito = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simAmbitoForm = this.builder.group({
            'SimAmbitoId': [ this.selectedSimAmbito.SimAmbitoId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimAmbitoCodigo': [ this.selectedSimAmbito.SimAmbitoCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimAmbitoNombre': [ this.selectedSimAmbito.SimAmbitoNombre, [ Validators.required, Validators.maxLength(74), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimAmbitoEstado': [ this.selectedSimAmbito.SimAmbitoEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimAmbito._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simAmbitoForm.valueChanges.subscribe((data) => {

            this.simAmbitoForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimAmbitoModel) {
        this._proc = true;
        if (this.simAmbitoForm.valid) {
            formData = Object.assign(SimAmbitoModel.clone(this.originalSimAmbito), formData);
            this.simAmbitoService.save(formData, this.originalSimAmbito).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimAmbito, formData);
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

    onDelete(formData: SimAmbitoModel) {
        if (this.simAmbitoForm.valid) {
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
                    this.simAmbitoService.delete(this.selectedSimAmbito).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimAmbito._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimAmbito,
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
        Object.keys(this.simAmbitoForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simAmbitoForm.errors[key]}\n`;
        });

        let controls = this.simAmbitoForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
