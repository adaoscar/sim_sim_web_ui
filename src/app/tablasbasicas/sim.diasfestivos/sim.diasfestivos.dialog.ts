import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { SimDiasFestivosService } from './sim.diasfestivos.service';
import { SimDiasFestivosModel } from './sim.diasfestivos.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.diasfestivos.dialog.html',
  // styleUrls: ['./sim.diasfestivos.dialog.css'],
  providers: [SimDiasFestivosService]
})
export class SimDiasFestivosDialog {
    selectedSimDiasFestivos: SimDiasFestivosModel;
    originalSimDiasFestivos: SimDiasFestivosModel;

    simDiasFestivosForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private simDiasFestivosService: SimDiasFestivosService,
                public dialogRef: MatDialogRef<SimDiasFestivosDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimDiasFestivos = data.selected;
        this.originalSimDiasFestivos = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simDiasFestivosForm = this.builder.group({
            'SimDiasFestivosId': [ this.selectedSimDiasFestivos.SimDiasFestivosId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimDiasFestivosFecha': [ this.selectedSimDiasFestivos.SimDiasFestivosFecha, [ Validators.required ] ],
            '_estado': [ this.selectedSimDiasFestivos._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simDiasFestivosForm.valueChanges.subscribe((data) => {

            this.simDiasFestivosForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimDiasFestivosModel) {
        this._proc = true;
        if (this.simDiasFestivosForm.valid) {
            formData = Object.assign(SimDiasFestivosModel.clone(this.originalSimDiasFestivos), formData);
            this.simDiasFestivosService.save(formData, this.originalSimDiasFestivos).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimDiasFestivos, formData);
                    if(formData._estado === 'N') {
                    }


                    this.dialogRef.close({
                        data: formData
                    });
                } else {
                   this.resultError = data.error.value;
                   this.openNotificationDanger('Error al salvar', this.resultError)
                }
            });
        }
    }

    onDelete(formData: SimDiasFestivosModel) {
        if (this.simDiasFestivosForm.valid) {
            const dialogRef = this.dialog.open(AlertaComponent, {
               data: {
                    tipo: 'error', 
                    titulo: 'Confirmar', 
                    mensaje: '¿Está seguro de eliminar el registro seleccionado?' 
               }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result.data) {
                    this._proc = true;
                    this.simDiasFestivosService.delete(this.selectedSimDiasFestivos).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimDiasFestivos._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimDiasFestivos,
                                delete: true
                            });
                        } else {
                            this.resultError = data.error.value;
                            this.openNotificationDanger('Error al eliminar', this.resultError)
                        }
                    });
                }
            });
        }
    }

    openNotificationDanger(titulo: string, mensaje: string) { 
        const dialogRef = this.dialog.open(AlertaComponent, { 
            data: {            
                tipo: 'error',
                titulo: titulo, 
                mensaje: mensaje
            }
        });

        dialogRef.afterClosed().subscribe(result => { 
            if (!result.data) {
                this.dialogRef.close(); 
            }
        });             
    }


    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.simDiasFestivosForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simDiasFestivosForm.errors[key]}\n`;
        });

        let controls = this.simDiasFestivosForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
