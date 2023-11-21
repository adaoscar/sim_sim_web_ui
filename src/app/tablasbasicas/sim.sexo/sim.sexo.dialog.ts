import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimSexoService } from './sim.sexo.service';
import { SimSexoModel } from './sim.sexo.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.sexo.dialog.html',
  // styleUrls: ['./sim.sexo.dialog.css'],
  providers: [SimSexoService]
})
export class SimSexoDialog {
    selectedSimSexo: SimSexoModel;
    originalSimSexo: SimSexoModel;

    simSexoForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simSexoService: SimSexoService,
                public dialogRef: MatDialogRef<SimSexoDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimSexo = data.selected;
        this.originalSimSexo = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simSexoForm = this.builder.group({
            'SimSexoId': [ this.selectedSimSexo.SimSexoId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimSexoCodigo': [ this.selectedSimSexo.SimSexoCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimSexoNombre': [ this.selectedSimSexo.SimSexoNombre, [ Validators.required, Validators.maxLength(30), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimSexoEstado': [ this.selectedSimSexo.SimSexoEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimSexo._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simSexoForm.valueChanges.subscribe((data) => {

            this.simSexoForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimSexoModel) {
        this._proc = true;
        if (this.simSexoForm.valid) {
            formData = Object.assign(SimSexoModel.clone(this.originalSimSexo), formData);
            this.simSexoService.save(formData, this.originalSimSexo).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimSexo, formData);
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

    onDelete(formData: SimSexoModel) {
        if (this.simSexoForm.valid) {
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
                    this.simSexoService.delete(this.selectedSimSexo).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimSexo._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimSexo,
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
        Object.keys(this.simSexoForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simSexoForm.errors[key]}\n`;
        });

        let controls = this.simSexoForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
