import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimMedioComunicacionService } from './sim.mediocomunicacion.service';
import { SimMedioComunicacionModel } from './sim.mediocomunicacion.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.mediocomunicacion.dialog.html',
  // styleUrls: ['./sim.mediocomunicacion.dialog.css'],
  providers: [SimMedioComunicacionService]
})
export class SimMedioComunicacionDialog {
    selectedSimMedioComunicacion: SimMedioComunicacionModel;
    originalSimMedioComunicacion: SimMedioComunicacionModel;

    simMedioComunicacionForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simMedioComunicacionService: SimMedioComunicacionService,
                public dialogRef: MatDialogRef<SimMedioComunicacionDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimMedioComunicacion = data.selected;
        this.originalSimMedioComunicacion = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simMedioComunicacionForm = this.builder.group({
            'SimMedioComunicacionId': [ this.selectedSimMedioComunicacion.SimMedioComunicacionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMedioComunicacionCodigo': [ this.selectedSimMedioComunicacion.SimMedioComunicacionCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMedioComunicacionNombre': [ this.selectedSimMedioComunicacion.SimMedioComunicacionNombre, [ Validators.required, Validators.maxLength(60), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimMedioComunicacionEstado': [ this.selectedSimMedioComunicacion.SimMedioComunicacionEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimMedioComunicacion._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simMedioComunicacionForm.valueChanges.subscribe((data) => {

            this.simMedioComunicacionForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimMedioComunicacionModel) {
        this._proc = true;
        if (this.simMedioComunicacionForm.valid) {
            formData = Object.assign(SimMedioComunicacionModel.clone(this.originalSimMedioComunicacion), formData);
            this.simMedioComunicacionService.save(formData, this.originalSimMedioComunicacion).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimMedioComunicacion, formData);
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

    onDelete(formData: SimMedioComunicacionModel) {
        if (this.simMedioComunicacionForm.valid) {
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
                    this.simMedioComunicacionService.delete(this.selectedSimMedioComunicacion).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimMedioComunicacion._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimMedioComunicacion,
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
        Object.keys(this.simMedioComunicacionForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simMedioComunicacionForm.errors[key]}\n`;
        });

        let controls = this.simMedioComunicacionForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
