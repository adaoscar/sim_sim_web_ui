import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimTipoDelitoService } from './sim.tipodelito.service';
import { SimTipoDelitoModel } from './sim.tipodelito.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.tipodelito.dialog.html',
  // styleUrls: ['./sim.tipodelito.dialog.css'],
  providers: [SimTipoDelitoService]
})
export class SimTipoDelitoDialog {
    selectedSimTipoDelito: SimTipoDelitoModel;
    originalSimTipoDelito: SimTipoDelitoModel;

    simTipoDelitoForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simTipoDelitoService: SimTipoDelitoService,
                public dialogRef: MatDialogRef<SimTipoDelitoDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimTipoDelito = data.selected;
        this.originalSimTipoDelito = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simTipoDelitoForm = this.builder.group({
            'SimTipoDelitoId': [ this.selectedSimTipoDelito.SimTipoDelitoId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoDelitoCodigo': [ this.selectedSimTipoDelito.SimTipoDelitoCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoDelitoNombre': [ this.selectedSimTipoDelito.SimTipoDelitoNombre, [ Validators.required, Validators.maxLength(120), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimTipoDelitoEstado': [ this.selectedSimTipoDelito.SimTipoDelitoEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimTipoDelito._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simTipoDelitoForm.valueChanges.subscribe((data) => {

            this.simTipoDelitoForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimTipoDelitoModel) {
        this._proc = true;
        if (this.simTipoDelitoForm.valid) {
            formData = Object.assign(SimTipoDelitoModel.clone(this.originalSimTipoDelito), formData);
            this.simTipoDelitoService.save(formData, this.originalSimTipoDelito).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimTipoDelito, formData);
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

    onDelete(formData: SimTipoDelitoModel) {
        if (this.simTipoDelitoForm.valid) {
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
                    this.simTipoDelitoService.delete(this.selectedSimTipoDelito).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimTipoDelito._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimTipoDelito,
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
        Object.keys(this.simTipoDelitoForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simTipoDelitoForm.errors[key]}\n`;
        });

        let controls = this.simTipoDelitoForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
