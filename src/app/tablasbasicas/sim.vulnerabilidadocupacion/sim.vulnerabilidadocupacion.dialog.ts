import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimVulnerabilidadOcupacionService } from './sim.vulnerabilidadocupacion.service';
import { SimVulnerabilidadOcupacionModel } from './sim.vulnerabilidadocupacion.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.vulnerabilidadocupacion.dialog.html',
  // styleUrls: ['./sim.vulnerabilidadocupacion.dialog.css'],
  providers: [SimVulnerabilidadOcupacionService]
})
export class SimVulnerabilidadOcupacionDialog {
    selectedSimVulnerabilidadOcupacion: SimVulnerabilidadOcupacionModel;
    originalSimVulnerabilidadOcupacion: SimVulnerabilidadOcupacionModel;

    simVulnerabilidadOcupacionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simVulnerabilidadOcupacionService: SimVulnerabilidadOcupacionService,
                public dialogRef: MatDialogRef<SimVulnerabilidadOcupacionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimVulnerabilidadOcupacion = data.selected;
        this.originalSimVulnerabilidadOcupacion = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simVulnerabilidadOcupacionForm = this.builder.group({
            'SimVulnerabilidadOcupacionId': [ this.selectedSimVulnerabilidadOcupacion.SimVulnerabilidadOcupacionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimVulnerabilidadOcupacionCodigo': [ this.selectedSimVulnerabilidadOcupacion.SimVulnerabilidadOcupacionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimVulnerabilidadOcupacionNombre': [ this.selectedSimVulnerabilidadOcupacion.SimVulnerabilidadOcupacionNombre, [ Validators.required, Validators.maxLength(60), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimVulnerabilidadOcupacionEstado': [ this.selectedSimVulnerabilidadOcupacion.SimVulnerabilidadOcupacionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimVulnerabilidadOcupacion._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simVulnerabilidadOcupacionForm.valueChanges.subscribe((data) => {

            this.simVulnerabilidadOcupacionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimVulnerabilidadOcupacionModel) {
        this._proc = true;
        if (this.simVulnerabilidadOcupacionForm.valid) {
            formData = Object.assign(SimVulnerabilidadOcupacionModel.clone(this.originalSimVulnerabilidadOcupacion), formData);
            this.simVulnerabilidadOcupacionService.save(formData, this.originalSimVulnerabilidadOcupacion).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimVulnerabilidadOcupacion, formData);
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

    onDelete(formData: SimVulnerabilidadOcupacionModel) {
        if (this.simVulnerabilidadOcupacionForm.valid) {
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
                    this.simVulnerabilidadOcupacionService.delete(this.selectedSimVulnerabilidadOcupacion).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimVulnerabilidadOcupacion._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimVulnerabilidadOcupacion,
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
        Object.keys(this.simVulnerabilidadOcupacionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simVulnerabilidadOcupacionForm.errors[key]}\n`;
        });

        let controls = this.simVulnerabilidadOcupacionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
