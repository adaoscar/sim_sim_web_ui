import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimDepartamentoService } from './sim.departamento.service';
import { SimDepartamentoModel } from './sim.departamento.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.departamento.dialog.html',
  // styleUrls: ['./sim.departamento.dialog.css'],
  providers: [SimDepartamentoService]
})
export class SimDepartamentoDialog {
    selectedSimDepartamento: SimDepartamentoModel;
    originalSimDepartamento: SimDepartamentoModel;

    simDepartamentoForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simDepartamentoService: SimDepartamentoService,
                public dialogRef: MatDialogRef<SimDepartamentoDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimDepartamento = data.selected;
        this.originalSimDepartamento = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simDepartamentoForm = this.builder.group({
            'SimDepartamentoId': [ this.selectedSimDepartamento.SimDepartamentoId, [ Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimDepartamentoCodigo': [ this.selectedSimDepartamento.SimDepartamentoCodigo, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimDepartamentoNombre': [ this.selectedSimDepartamento.SimDepartamentoNombre, [ Validators.required, Validators.maxLength(100), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimDepartamentoEstado': [ this.selectedSimDepartamento.SimDepartamentoEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimDepartamento._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simDepartamentoForm.valueChanges.subscribe((data) => {

            this.simDepartamentoForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimDepartamentoModel) {
        this._proc = true;
        if (this.simDepartamentoForm.valid) {
            formData = Object.assign(SimDepartamentoModel.clone(this.originalSimDepartamento), formData);
            this.simDepartamentoService.save(formData, this.originalSimDepartamento).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimDepartamento, formData);
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

    onDelete(formData: SimDepartamentoModel) {
        if (this.simDepartamentoForm.valid) {
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
                    this.simDepartamentoService.delete(this.selectedSimDepartamento).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimDepartamento._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimDepartamento,
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
        Object.keys(this.simDepartamentoForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simDepartamentoForm.errors[key]}\n`;
        });

        let controls = this.simDepartamentoForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
