import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimGeneroService } from './sim.genero.service';
import { SimGeneroModel } from './sim.genero.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.genero.dialog.html',
  // styleUrls: ['./sim.genero.dialog.css'],
  providers: [SimGeneroService]
})
export class SimGeneroDialog {
    selectedSimGenero: SimGeneroModel;
    originalSimGenero: SimGeneroModel;

    simGeneroForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simGeneroService: SimGeneroService,
                public dialogRef: MatDialogRef<SimGeneroDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimGenero = data.selected;
        this.originalSimGenero = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simGeneroForm = this.builder.group({
            'SimGeneroId': [ this.selectedSimGenero.SimGeneroId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimGeneroCodigo': [ this.selectedSimGenero.SimGeneroCodigo, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimGeneroNombre': [ this.selectedSimGenero.SimGeneroNombre, [ Validators.required, Validators.maxLength(31), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimGeneroEstado': [ this.selectedSimGenero.SimGeneroEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimGenero._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simGeneroForm.valueChanges.subscribe((data) => {

            this.simGeneroForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimGeneroModel) {
        this._proc = true;
        if (this.simGeneroForm.valid) {
            formData = Object.assign(SimGeneroModel.clone(this.originalSimGenero), formData);
            this.simGeneroService.save(formData, this.originalSimGenero).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimGenero, formData);
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

    onDelete(formData: SimGeneroModel) {
        if (this.simGeneroForm.valid) {
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
                    this.simGeneroService.delete(this.selectedSimGenero).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimGenero._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimGenero,
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
        Object.keys(this.simGeneroForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simGeneroForm.errors[key]}\n`;
        });

        let controls = this.simGeneroForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
