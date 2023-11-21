import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { SimUsuarioService } from './sim.usuario.service';
import { SimUsuarioModel } from './sim.usuario.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './sim.usuario.dialog.html',
  styleUrls: ['./sim.usuario.table.css'],
  providers: [SimUsuarioService]
})
export class SimUsuarioDialog {
    selectedSimUsuario: any;
    originalSimUsuario: any;

    simUsuarioForm: FormGroup;

    filteredSimTipoDocumentoNombre: Array<any> = [];
    simTipoDocumentoNombreCtrl: FormControl = new FormControl(["", [
        (control: AbstractControl): {[key: string]: any} | null => {
            const selected = !!control["selected"];
            let result = null;
            if (control.value !== "" && !selected) {
                result = {"simTipoDocumentoNombreCtrl": true };
            }
            return result;
        }] ]);

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private simUsuarioService: SimUsuarioService,
                public dialogRef: MatDialogRef<SimUsuarioDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.dialogRef.disableClose = true;
        this.selectedSimUsuario = data.selected;
        this.originalSimUsuario = data.original;
        if (this.selectedSimUsuario._estado === 'N') { this.selectedSimUsuario.Estado = true };
    }

    ngOnInit() {
        let disabledPkey = this.selectedSimUsuario._estado === 'O';

        this.simUsuarioForm = this.builder.group({
            'SimUsuarioId': [ this.selectedSimUsuario.Id ],
            'SimTipoDocumentoId': [ this.selectedSimUsuario.SimTipoDocumentoId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimUsuarioDocumento': [ { value: this.selectedSimUsuario.Documento, disabled: disabledPkey }, [ Validators.required, Validators.maxLength(13), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimUsuarioNombres': [ this.selectedSimUsuario.Nombres, [ Validators.required, Validators.maxLength(100), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimUsuarioApellidos': [ this.selectedSimUsuario.Apellidos, [ Validators.required, Validators.maxLength(100), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimUsuarioTelefono': [ this.selectedSimUsuario.PhoneNumber, [ Validators.required, Validators.maxLength(100), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'SimUsuarioEmail': [ this.selectedSimUsuario.Email, [ Validators.required, Validators.email, Validators.maxLength(150), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'SimUsuarioEstado': [ this.selectedSimUsuario.Estado, [ Validators.required ] ],
            'SimUsuarioRoles': [ this.selectedSimUsuario.Roles ],
            '_estado': [ this.selectedSimUsuario._estado, Validators.required ]
        }, {
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                let validationErrors: any = null;
                return validationErrors;
            }
        });

        if (disabledPkey) { this.simTipoDocumentoNombreCtrl.disable() };
        this.simTipoDocumentoNombreCtrl.setValue(this.selectedSimUsuario.SimTipoDocumento?.SimTipoDocumentoNombre || '');
        this.simTipoDocumentoNombreCtrl["SimTipoDocumento"] = this.selectedSimUsuario.SimTipoDocumento;
        this.simTipoDocumentoNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.simUsuarioService.filterSimTipoDocumentoNombre(data))
            ).subscribe((data) => this.filteredSimTipoDocumentoNombre = data.value);

        this.simUsuarioForm.valueChanges.subscribe((data) => {
            this.simUsuarioForm.patchValue({
            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimUsuarioModel) {
        this._proc = true;
        if (this.simUsuarioForm.valid) {

            if (this.selectedSimUsuario._estado === 'O') {
                let idRoles: string[] = [];
                this.selectedSimUsuario.Roles.forEach(reg => {
                    idRoles.push(reg.Role.Id);
                })
                formData.SimUsuarioRoles = idRoles;
            };

            formData.SimUsuarioDocumento = this.simUsuarioForm.controls.SimUsuarioDocumento.value;
            formData = Object.assign(this.originalSimUsuario, formData);
            this.simUsuarioService.save(formData, this.originalSimUsuario, 2).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalSimUsuario, formData);
                    if (formData._estado === 'N') {
                        formData.SimUsuarioId = data.Id;
                        formData.SimTipoDocumento = data.SimTipoDocumento;
                    };

                    formData.SimTipoDocumento = this.simTipoDocumentoNombreCtrl["SimTipoDocumento"];

                    this.dialogRef.close({
                        data: formData
                    });

                } else {
                    this.resultError = data.error.Error || data.error.value;
                    this.openNotificationDanger('Error al salvar', this.resultError)
                };
            });
        }
    }

    onDelete(formData: SimUsuarioModel) {
        if (this.simUsuarioForm.valid) {
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
                    this.simUsuarioService.delete(this.selectedSimUsuario).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.Error;
                        this.resultError = null;

                        if (this._status) {
                            this.originalSimUsuario._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalSimUsuario,
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

    onKeydownSimTipoDocumentoNombre(e: Event) {
        this.simTipoDocumentoNombreCtrl["selected"] = false;

        this.simUsuarioForm.patchValue({
            SimTipoDocumentoId: null
        });
    }

    onSelectSimTipoDocumentoNombre(opt: any) {
        this.simTipoDocumentoNombreCtrl["selected"] = true;
        this.simTipoDocumentoNombreCtrl["SimTipoDocumento"] = opt;

        this.simUsuarioForm.patchValue({
            SimTipoDocumentoId: opt.SimTipoDocumentoId
        });
    }

    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.simUsuarioForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simUsuarioForm.errors[key]}\n`;
        });

        let controls = this.simUsuarioForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
