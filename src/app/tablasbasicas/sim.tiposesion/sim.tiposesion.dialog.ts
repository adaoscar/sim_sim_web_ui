import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimTipoSesionService } from './sim.tiposesion.service';
import { SimTipoSesionModel } from './sim.tiposesion.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.tiposesion.dialog.html',
  // styleUrls: ['./sim.tiposesion.dialog.css'],
  providers: [SimTipoSesionService]
})
export class SimTipoSesionDialog {
    selectedSimTipoSesion: SimTipoSesionModel;
    originalSimTipoSesion: SimTipoSesionModel;

    simTipoSesionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simTipoSesionService: SimTipoSesionService,
                public dialogRef: MatDialogRef<SimTipoSesionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimTipoSesion = data.selected;
        this.originalSimTipoSesion = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simTipoSesionForm = this.builder.group({
            'SimTipoSesionId': [ this.selectedSimTipoSesion.SimTipoSesionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoSesionCodigo': [ this.selectedSimTipoSesion.SimTipoSesionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoSesionNombre': [ this.selectedSimTipoSesion.SimTipoSesionNombre, [ Validators.required, Validators.maxLength(60), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimTipoSesionEstado': [ this.selectedSimTipoSesion.SimTipoSesionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimTipoSesion._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simTipoSesionForm.valueChanges.subscribe((data) => {

            this.simTipoSesionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimTipoSesionModel) {
        this._proc = true;
        if (this.simTipoSesionForm.valid) {
            formData = Object.assign(SimTipoSesionModel.clone(this.originalSimTipoSesion), formData);
            this.simTipoSesionService.save(formData, this.originalSimTipoSesion).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimTipoSesion, formData);
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

    onDelete(formData: SimTipoSesionModel) {
        if (this.simTipoSesionForm.valid) {
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
                    this.simTipoSesionService.delete(this.selectedSimTipoSesion).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimTipoSesion._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimTipoSesion,
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
        Object.keys(this.simTipoSesionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simTipoSesionForm.errors[key]}\n`;
        });

        let controls = this.simTipoSesionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
