import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertasArkeosComponent } from 'arkeos-components';

import { SimMunicipioService } from './sim.municipio.service';
import { SimMunicipioModel } from './sim.municipio.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.municipio.dialog.html',
  // styleUrls: ['./sim.municipio.dialog.css'],
  providers: [SimMunicipioService]
})
export class SimMunicipioDialog {
    selectedSimMunicipio: SimMunicipioModel;
    originalSimMunicipio: SimMunicipioModel;

    simMunicipioForm: FormGroup;

    simDepartamentoNombreCtrl: FormControl = new FormControl(["", [
        (control: AbstractControl): {[key: string]: any} | null => {
            const selected = !!control["selected"];
            let result = null;
            if (control.value !== "" && !selected) {
                result = {"simDepartamentoNombreCtrl": true };
            }
            return result;
        }] ]);

    filteredSimDepartamentoNombre: Array<any> = [];
    simMunicipioNombreCtrl: FormControl = new FormControl(["", [
        (control: AbstractControl): {[key: string]: any} | null => {
            const selected = !!control["selected"];
            let result = null;
            if (control.value !== "" && !selected) {
                result = {"simMunicipioNombreCtrl": true };
            }
            return result;
        }] ]);

    filteredSimMunicipioNombre: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private simMunicipioService: SimMunicipioService,
                public dialogRef: MatDialogRef<SimMunicipioDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedSimMunicipio = data.selected;
        this.originalSimMunicipio = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.simMunicipioForm = this.builder.group({
            'SimMunicipioId': [ this.selectedSimMunicipio.SimMunicipioId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimDepartamentoId': [ this.selectedSimMunicipio.SimDepartamentoId, [ Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMunicipioCodigo': [ this.selectedSimMunicipio.SimMunicipioCodigo, [ Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SiceqAutoridadJudicialId': [ this.selectedSimMunicipio.SiceqAutoridadJudicialId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimMunicipioEstado': [ this.selectedSimMunicipio.SimMunicipioEstado, [ Validators.required ] ],
            '_estado': [ this.selectedSimMunicipio._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.simDepartamentoNombreCtrl.setValue(this.selectedSimMunicipio.SimDepartamento?.simDepartamentoNombre || '');
        this.simDepartamentoNombreCtrl["SimDepartamento"] = this.selectedSimMunicipio.SimDepartamento;
        this.simDepartamentoNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.simMunicipioService.filterSimDepartamentoNombre(data))
            ).subscribe((data) => this.filteredSimDepartamentoNombre = data.value);

        this.simMunicipioNombreCtrl.setValue(this.selectedSimMunicipio.SiceqAutoridadJudicial?.simMunicipioNombre || '');
        this.simMunicipioNombreCtrl["SiceqAutoridadJudicial"] = this.selectedSimMunicipio.SiceqAutoridadJudicial;
        this.simMunicipioNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.simMunicipioService.filterSimMunicipioNombre(data))
            ).subscribe((data) => this.filteredSimMunicipioNombre = data.value);

        this.simMunicipioForm.valueChanges.subscribe((data) => {

            this.simMunicipioForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimMunicipioModel) {
        this._proc = true;
        if (this.simMunicipioForm.valid) {
            formData = Object.assign(SimMunicipioModel.clone(this.originalSimMunicipio), formData);
            this.simMunicipioService.save(formData, this.originalSimMunicipio).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimMunicipio, formData);
                    if(formData._estado === 'N') {
                        formData.SimDepartamento = data.SimDepartamento;
                        formData.SiceqAutoridadJudicial = data.SiceqAutoridadJudicial;
                    }

                    formData.SimDepartamento = this.simDepartamentoNombreCtrl["SimDepartamento"];
                    formData.SiceqAutoridadJudicial = this.simMunicipioNombreCtrl["SiceqAutoridadJudicial"];

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

    onDelete(formData: SimMunicipioModel) {
        if (this.simMunicipioForm.valid) {
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
                    this.simMunicipioService.delete(this.selectedSimMunicipio).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimMunicipio._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimMunicipio,
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

    onKeydownSimDepartamentoNombre(e: Event) {
        this.simDepartamentoNombreCtrl["selected"] = false;

        this.simMunicipioForm.patchValue({
            SimDepartamentoId: null
        });
    }

    onSelectSimDepartamentoNombre(opt: any){
        this.simDepartamentoNombreCtrl["selected"] = true;
        this.simDepartamentoNombreCtrl["SimDepartamento"] = opt;

        this.simMunicipioForm.patchValue({
            SimDepartamentoId: opt.SimDepartamentoId
        });
    }

    onKeydownSimMunicipioNombre(e: Event) {
        this.simMunicipioNombreCtrl["selected"] = false;

        this.simMunicipioForm.patchValue({
            SiceqAutoridadJudicialId: null
        });
    }

    onSelectSimMunicipioNombre(opt: any){
        this.simMunicipioNombreCtrl["selected"] = true;
        this.simMunicipioNombreCtrl["SiceqAutoridadJudicial"] = opt;

        this.simMunicipioForm.patchValue({
            SiceqAutoridadJudicialId: opt.SiceqAutoridadJudicialId
        });
    }


    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.simMunicipioForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simMunicipioForm.errors[key]}\n`;
        });

        let controls = this.simMunicipioForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
