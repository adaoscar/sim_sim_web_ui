import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimVigenciaService } from './sim.vigencia.service';
import { SimVigenciaModel } from './sim.vigencia.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.vigencia.dialog.html',
  // styleUrls: ['./sim.vigencia.dialog.css'],
  providers: [SimVigenciaService]
})
export class SimVigenciaDialog {
    selectedSimVigencia: SimVigenciaModel;
    originalSimVigencia: SimVigenciaModel;

    simVigenciaForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simVigenciaService: SimVigenciaService,
                public dialogRef: MatDialogRef<SimVigenciaDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimVigencia = data.selected;
        this.originalSimVigencia = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simVigenciaForm = this.builder.group({
            'SimVigenciaId': [ this.selectedSimVigencia.SimVigenciaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimVigenciaCodigo': [ this.selectedSimVigencia.SimVigenciaCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimVigenciaNombre': [ this.selectedSimVigencia.SimVigenciaNombre, [ Validators.required, Validators.maxLength(60), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimVigenciaEstado': [ this.selectedSimVigencia.SimVigenciaEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimVigencia._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simVigenciaForm.valueChanges.subscribe((data) => {

            this.simVigenciaForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimVigenciaModel) {
        this._proc = true;
        if (this.simVigenciaForm.valid) {
            formData = Object.assign(SimVigenciaModel.clone(this.originalSimVigencia), formData);
            this.simVigenciaService.save(formData, this.originalSimVigencia).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimVigencia, formData);
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

    onDelete(formData: SimVigenciaModel) {
        if (this.simVigenciaForm.valid) {
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
                    this.simVigenciaService.delete(this.selectedSimVigencia).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimVigencia._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimVigencia,
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
        Object.keys(this.simVigenciaForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simVigenciaForm.errors[key]}\n`;
        });

        let controls = this.simVigenciaForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
