import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimMotivoNoViabilidadService } from './sim.motivonoviabilidad.service';
import { SimMotivoNoViabilidadModel } from './sim.motivonoviabilidad.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.motivonoviabilidad.dialog.html',
  // styleUrls: ['./sim.motivonoviabilidad.dialog.css'],
  providers: [SimMotivoNoViabilidadService]
})
export class SimMotivoNoViabilidadDialog {
    selectedSimMotivoNoViabilidad: SimMotivoNoViabilidadModel;
    originalSimMotivoNoViabilidad: SimMotivoNoViabilidadModel;

    simMotivoNoViabilidadForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simMotivoNoViabilidadService: SimMotivoNoViabilidadService,
                public dialogRef: MatDialogRef<SimMotivoNoViabilidadDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimMotivoNoViabilidad = data.selected;
        this.originalSimMotivoNoViabilidad = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simMotivoNoViabilidadForm = this.builder.group({
            'SimMotivoNoViabilidadId': [ this.selectedSimMotivoNoViabilidad.SimMotivoNoViabilidadId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMotivoNoViabilidadCodigo': [ this.selectedSimMotivoNoViabilidad.SimMotivoNoViabilidadCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMotivoNoViabilidadNombre': [ this.selectedSimMotivoNoViabilidad.SimMotivoNoViabilidadNombre, [ Validators.required, Validators.maxLength(75), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimMotivoNoViabilidadEstado': [ this.selectedSimMotivoNoViabilidad.SimMotivoNoViabilidadEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimMotivoNoViabilidad._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simMotivoNoViabilidadForm.valueChanges.subscribe((data) => {

            this.simMotivoNoViabilidadForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimMotivoNoViabilidadModel) {
        this._proc = true;
        if (this.simMotivoNoViabilidadForm.valid) {
            formData = Object.assign(SimMotivoNoViabilidadModel.clone(this.originalSimMotivoNoViabilidad), formData);
            this.simMotivoNoViabilidadService.save(formData, this.originalSimMotivoNoViabilidad).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimMotivoNoViabilidad, formData);
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

    onDelete(formData: SimMotivoNoViabilidadModel) {
        if (this.simMotivoNoViabilidadForm.valid) {
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
                    this.simMotivoNoViabilidadService.delete(this.selectedSimMotivoNoViabilidad).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimMotivoNoViabilidad._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimMotivoNoViabilidad,
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
        Object.keys(this.simMotivoNoViabilidadForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simMotivoNoViabilidadForm.errors[key]}\n`;
        });

        let controls = this.simMotivoNoViabilidadForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
