import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimMotivosFinalizacionTramiteService } from './sim.motivosfinalizaciontramite.service';
import { SimMotivosFinalizacionTramiteModel } from './sim.motivosfinalizaciontramite.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.motivosfinalizaciontramite.dialog.html',
  // styleUrls: ['./sim.motivosfinalizaciontramite.dialog.css'],
  providers: [SimMotivosFinalizacionTramiteService]
})
export class SimMotivosFinalizacionTramiteDialog {
    selectedSimMotivosFinalizacionTramite: SimMotivosFinalizacionTramiteModel;
    originalSimMotivosFinalizacionTramite: SimMotivosFinalizacionTramiteModel;

    simMotivosFinalizacionTramiteForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simMotivosFinalizacionTramiteService: SimMotivosFinalizacionTramiteService,
                public dialogRef: MatDialogRef<SimMotivosFinalizacionTramiteDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimMotivosFinalizacionTramite = data.selected;
        this.originalSimMotivosFinalizacionTramite = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simMotivosFinalizacionTramiteForm = this.builder.group({
            'SimMotivosFinalizacionTramiteId': [ this.selectedSimMotivosFinalizacionTramite.SimMotivosFinalizacionTramiteId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMotivosFinalizacionTramiteCodigo': [ this.selectedSimMotivosFinalizacionTramite.SimMotivosFinalizacionTramiteCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMotivosFinalizacionTramiteNombre': [ this.selectedSimMotivosFinalizacionTramite.SimMotivosFinalizacionTramiteNombre, [ Validators.required, Validators.maxLength(60), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimMotivosFinalizacionTramiteEstado': [ this.selectedSimMotivosFinalizacionTramite.SimMotivosFinalizacionTramiteEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimMotivosFinalizacionTramite._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simMotivosFinalizacionTramiteForm.valueChanges.subscribe((data) => {

            this.simMotivosFinalizacionTramiteForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimMotivosFinalizacionTramiteModel) {
        this._proc = true;
        if (this.simMotivosFinalizacionTramiteForm.valid) {
            formData = Object.assign(SimMotivosFinalizacionTramiteModel.clone(this.originalSimMotivosFinalizacionTramite), formData);
            this.simMotivosFinalizacionTramiteService.save(formData, this.originalSimMotivosFinalizacionTramite).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimMotivosFinalizacionTramite, formData);
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

    onDelete(formData: SimMotivosFinalizacionTramiteModel) {
        if (this.simMotivosFinalizacionTramiteForm.valid) {
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
                    this.simMotivosFinalizacionTramiteService.delete(this.selectedSimMotivosFinalizacionTramite).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimMotivosFinalizacionTramite._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimMotivosFinalizacionTramite,
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
        Object.keys(this.simMotivosFinalizacionTramiteForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simMotivosFinalizacionTramiteForm.errors[key]}\n`;
        });

        let controls = this.simMotivosFinalizacionTramiteForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
