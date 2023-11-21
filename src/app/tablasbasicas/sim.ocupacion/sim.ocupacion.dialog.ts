import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimOcupacionService } from './sim.ocupacion.service';
import { SimOcupacionModel } from './sim.ocupacion.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.ocupacion.dialog.html',
  // styleUrls: ['./sim.ocupacion.dialog.css'],
  providers: [SimOcupacionService]
})
export class SimOcupacionDialog {
    selectedSimOcupacion: SimOcupacionModel;
    originalSimOcupacion: SimOcupacionModel;

    simOcupacionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simOcupacionService: SimOcupacionService,
                public dialogRef: MatDialogRef<SimOcupacionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimOcupacion = data.selected;
        this.originalSimOcupacion = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simOcupacionForm = this.builder.group({
            'SimOcupacionId': [ this.selectedSimOcupacion.SimOcupacionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimOcupacionCodigo': [ this.selectedSimOcupacion.SimOcupacionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimOcupacionNombre': [ this.selectedSimOcupacion.SimOcupacionNombre, [ Validators.required, Validators.maxLength(34), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimOcupacionEstado': [ this.selectedSimOcupacion.SimOcupacionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimOcupacion._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simOcupacionForm.valueChanges.subscribe((data) => {

            this.simOcupacionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimOcupacionModel) {
        this._proc = true;
        if (this.simOcupacionForm.valid) {
            formData = Object.assign(SimOcupacionModel.clone(this.originalSimOcupacion), formData);
            this.simOcupacionService.save(formData, this.originalSimOcupacion).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimOcupacion, formData);
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

    onDelete(formData: SimOcupacionModel) {
        if (this.simOcupacionForm.valid) {
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
                    this.simOcupacionService.delete(this.selectedSimOcupacion).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimOcupacion._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimOcupacion,
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
        Object.keys(this.simOcupacionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simOcupacionForm.errors[key]}\n`;
        });

        let controls = this.simOcupacionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
