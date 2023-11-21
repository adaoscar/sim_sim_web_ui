import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimTipoDecisionService } from './sim.tipodecision.service';
import { SimTipoDecisionModel } from './sim.tipodecision.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.tipodecision.dialog.html',
  // styleUrls: ['./sim.tipodecision.dialog.css'],
  providers: [SimTipoDecisionService]
})
export class SimTipoDecisionDialog {
    selectedSimTipoDecision: SimTipoDecisionModel;
    originalSimTipoDecision: SimTipoDecisionModel;

    simTipoDecisionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simTipoDecisionService: SimTipoDecisionService,
                public dialogRef: MatDialogRef<SimTipoDecisionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimTipoDecision = data.selected;
        this.originalSimTipoDecision = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simTipoDecisionForm = this.builder.group({
            'SimTipoDecisionId': [ this.selectedSimTipoDecision.SimTipoDecisionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoDecisionCodigo': [ this.selectedSimTipoDecision.SimTipoDecisionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimTipoDecisionNombre': [ this.selectedSimTipoDecision.SimTipoDecisionNombre, [ Validators.required, Validators.maxLength(69), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimTipoDecisionEstado': [ this.selectedSimTipoDecision.SimTipoDecisionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimTipoDecision._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simTipoDecisionForm.valueChanges.subscribe((data) => {

            this.simTipoDecisionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimTipoDecisionModel) {
        this._proc = true;
        if (this.simTipoDecisionForm.valid) {
            formData = Object.assign(SimTipoDecisionModel.clone(this.originalSimTipoDecision), formData);
            this.simTipoDecisionService.save(formData, this.originalSimTipoDecision).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimTipoDecision, formData);
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

    onDelete(formData: SimTipoDecisionModel) {
        if (this.simTipoDecisionForm.valid) {
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
                    this.simTipoDecisionService.delete(this.selectedSimTipoDecision).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimTipoDecision._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimTipoDecision,
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
        Object.keys(this.simTipoDecisionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simTipoDecisionForm.errors[key]}\n`;
        });

        let controls = this.simTipoDecisionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
