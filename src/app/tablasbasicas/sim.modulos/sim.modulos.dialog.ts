import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimModulosService } from './sim.modulos.service';
import { SimModulosModel } from './sim.modulos.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.modulos.dialog.html',
  // styleUrls: ['./sim.modulos.dialog.css'],
  providers: [SimModulosService]
})
export class SimModulosDialog {
    selectedSimModulos: SimModulosModel;
    originalSimModulos: SimModulosModel;

    simModulosForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simModulosService: SimModulosService,
                public dialogRef: MatDialogRef<SimModulosDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimModulos = data.selected;
        this.originalSimModulos = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simModulosForm = this.builder.group({
            'SimModulosId': [ this.selectedSimModulos.SimModulosId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimModulosCodigo': [ this.selectedSimModulos.SimModulosCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimModulosNombre': [ this.selectedSimModulos.SimModulosNombre, [ Validators.required, Validators.maxLength(74), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimModulosEstado': [ this.selectedSimModulos.SimModulosEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimModulos._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simModulosForm.valueChanges.subscribe((data) => {

            this.simModulosForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimModulosModel) {
        this._proc = true;
        if (this.simModulosForm.valid) {
            formData = Object.assign(SimModulosModel.clone(this.originalSimModulos), formData);
            this.simModulosService.save(formData, this.originalSimModulos).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimModulos, formData);
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

    onDelete(formData: SimModulosModel) {
        if (this.simModulosForm.valid) {
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
                    this.simModulosService.delete(this.selectedSimModulos).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimModulos._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimModulos,
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
        Object.keys(this.simModulosForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simModulosForm.errors[key]}\n`;
        });

        let controls = this.simModulosForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
