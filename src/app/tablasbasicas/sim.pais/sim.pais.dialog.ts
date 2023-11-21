import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimPaisService } from './sim.pais.service';
import { SimPaisModel } from './sim.pais.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.pais.dialog.html',
  // styleUrls: ['./sim.pais.dialog.css'],
  providers: [SimPaisService]
})
export class SimPaisDialog {
    selectedSimPais: SimPaisModel;
    originalSimPais: SimPaisModel;

    simPaisForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simPaisService: SimPaisService,
                public dialogRef: MatDialogRef<SimPaisDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimPais = data.selected;
        this.originalSimPais = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simPaisForm = this.builder.group({
            'SimPaisId': [ this.selectedSimPais.SimPaisId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimPaisCodigo': [ this.selectedSimPais.SimPaisCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimPaisNombre': [ this.selectedSimPais.SimPaisNombre, [ Validators.required, Validators.maxLength(30), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimPaisEstado': [ this.selectedSimPais.SimPaisEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimPais._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simPaisForm.valueChanges.subscribe((data) => {

            this.simPaisForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimPaisModel) {
        this._proc = true;
        if (this.simPaisForm.valid) {
            formData = Object.assign(SimPaisModel.clone(this.originalSimPais), formData);
            this.simPaisService.save(formData, this.originalSimPais).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimPais, formData);
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

    onDelete(formData: SimPaisModel) {
        if (this.simPaisForm.valid) {
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
                    this.simPaisService.delete(this.selectedSimPais).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimPais._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimPais,
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
        Object.keys(this.simPaisForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simPaisForm.errors[key]}\n`;
        });

        let controls = this.simPaisForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
