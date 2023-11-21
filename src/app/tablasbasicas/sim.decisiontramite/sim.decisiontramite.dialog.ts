import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimDecisionTramiteService } from './sim.decisiontramite.service';
import { SimDecisionTramiteModel } from './sim.decisiontramite.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.decisiontramite.dialog.html',
  // styleUrls: ['./sim.decisiontramite.dialog.css'],
  providers: [SimDecisionTramiteService]
})
export class SimDecisionTramiteDialog {
    selectedSimDecisionTramite: SimDecisionTramiteModel;
    originalSimDecisionTramite: SimDecisionTramiteModel;

    simDecisionTramiteForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simDecisionTramiteService: SimDecisionTramiteService,
                public dialogRef: MatDialogRef<SimDecisionTramiteDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimDecisionTramite = data.selected;
        this.originalSimDecisionTramite = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simDecisionTramiteForm = this.builder.group({
            'SimDecisionTramiteId': [ this.selectedSimDecisionTramite.SimDecisionTramiteId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimDecisionTramiteCodigo': [ this.selectedSimDecisionTramite.SimDecisionTramiteCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimDecisionTramiteNombre': [ this.selectedSimDecisionTramite.SimDecisionTramiteNombre, [ Validators.required, Validators.maxLength(74), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimDecisionTramiteEstado': [ this.selectedSimDecisionTramite.SimDecisionTramiteEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimDecisionTramite._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simDecisionTramiteForm.valueChanges.subscribe((data) => {

            this.simDecisionTramiteForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimDecisionTramiteModel) {
        this._proc = true;
        if (this.simDecisionTramiteForm.valid) {
            formData = Object.assign(SimDecisionTramiteModel.clone(this.originalSimDecisionTramite), formData);
            this.simDecisionTramiteService.save(formData, this.originalSimDecisionTramite).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimDecisionTramite, formData);
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

    onDelete(formData: SimDecisionTramiteModel) {
        if (this.simDecisionTramiteForm.valid) {
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
                    this.simDecisionTramiteService.delete(this.selectedSimDecisionTramite).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimDecisionTramite._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimDecisionTramite,
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
        Object.keys(this.simDecisionTramiteForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simDecisionTramiteForm.errors[key]}\n`;
        });

        let controls = this.simDecisionTramiteForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
