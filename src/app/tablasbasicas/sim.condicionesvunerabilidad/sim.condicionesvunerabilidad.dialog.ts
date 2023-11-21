import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimCondicionesVunerabilidadService } from './sim.condicionesvunerabilidad.service';
import { SimCondicionesVunerabilidadModel } from './sim.condicionesvunerabilidad.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.condicionesvunerabilidad.dialog.html',
  // styleUrls: ['./sim.condicionesvunerabilidad.dialog.css'],
  providers: [SimCondicionesVunerabilidadService]
})
export class SimCondicionesVunerabilidadDialog {
    selectedSimCondicionesVunerabilidad: SimCondicionesVunerabilidadModel;
    originalSimCondicionesVunerabilidad: SimCondicionesVunerabilidadModel;

    simCondicionesVunerabilidadForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simCondicionesVunerabilidadService: SimCondicionesVunerabilidadService,
                public dialogRef: MatDialogRef<SimCondicionesVunerabilidadDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimCondicionesVunerabilidad = data.selected;
        this.originalSimCondicionesVunerabilidad = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simCondicionesVunerabilidadForm = this.builder.group({
            'SimCondicionesVunerabilidadId': [ this.selectedSimCondicionesVunerabilidad.SimCondicionesVunerabilidadId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimCondicionesVunerabilidadCodigo': [ this.selectedSimCondicionesVunerabilidad.SimCondicionesVunerabilidadCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimCondicionesVunerabilidadNombre': [ this.selectedSimCondicionesVunerabilidad.SimCondicionesVunerabilidadNombre, [ Validators.required, Validators.maxLength(74), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimCondicionesVunerabilidadEstado': [ this.selectedSimCondicionesVunerabilidad.SimCondicionesVunerabilidadEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimCondicionesVunerabilidad._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simCondicionesVunerabilidadForm.valueChanges.subscribe((data) => {

            this.simCondicionesVunerabilidadForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimCondicionesVunerabilidadModel) {
        this._proc = true;
        if (this.simCondicionesVunerabilidadForm.valid) {
            formData = Object.assign(SimCondicionesVunerabilidadModel.clone(this.originalSimCondicionesVunerabilidad), formData);
            this.simCondicionesVunerabilidadService.save(formData, this.originalSimCondicionesVunerabilidad).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimCondicionesVunerabilidad, formData);
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

    onDelete(formData: SimCondicionesVunerabilidadModel) {
        if (this.simCondicionesVunerabilidadForm.valid) {
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
                    this.simCondicionesVunerabilidadService.delete(this.selectedSimCondicionesVunerabilidad).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimCondicionesVunerabilidad._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimCondicionesVunerabilidad,
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
        Object.keys(this.simCondicionesVunerabilidadForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simCondicionesVunerabilidadForm.errors[key]}\n`;
        });

        let controls = this.simCondicionesVunerabilidadForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
