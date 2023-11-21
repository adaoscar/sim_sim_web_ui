import { Component, Inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaComponent } from 'arkeos-components';
import { SimRolModel } from './sim.rol.model';

import { SimRolService } from "./sim.rol.service";

@Component({
    templateUrl: './sim.rol.dialog.html',
    providers: [SimRolService]
})
export class SimRolDialog {
    selectedRol: SimRolModel;
    simRolForm: FormGroup;

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    filteredSimAplicacionNombre: Array<any> = [];
    simAplicacionNombreCtrl: FormControl = new FormControl(["", [
        (control: AbstractControl): {[key: string]: any} | null => {
            const selected = !!control["selected"];
            let result = null;
            if (control.value !== "" && !selected) {
                result = {"simAplicacionNombreCtrl": true };
            }
            return result;
        }] ]);

    constructor(public dialog: MatDialog,
                private builder: FormBuilder,
                private simRolService: SimRolService,
                public dialogRef: MatDialogRef<SimRolDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.dialogRef.disableClose = true;
        this.selectedRol = data.selected;
    }

    ngOnInit() {
        this.simRolForm = this.builder.group({
            'Id': [ this.selectedRol.Id ],
            'Name': [ this.selectedRol.Name, Validators.required ],
            'SimAplicacionId': [ this.selectedRol.SimAplicacionId, Validators.required ],
            'Funcionalidades': [ this.selectedRol.Funcionalidades ],
            '_estado': [ this.selectedRol._estado, Validators.required ]
        }, {
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                let validationErrors: any = null;
                return validationErrors;
            }
        });

        this.simAplicacionNombreCtrl.setValue(this.selectedRol.SimAplicacion?.SimAplicacionNombre || '');
        this.simAplicacionNombreCtrl["simAplicacion"] = this.selectedRol.SimAplicacion;
        this.simAplicacionNombreCtrl.setValidators(Validators.required);

        this.simRolService.getAplicaciones().subscribe(data => {
            this.filteredSimAplicacionNombre = data.value;
        });

        this.simRolForm.valueChanges.subscribe((data) => {
            this.simRolForm.patchValue({
            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: SimRolModel) {
        this._proc = true;
        if (this.simRolForm.valid) {
            formData = Object.assign(this.selectedRol, formData);
            this.simRolService.saveRol(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    this.dialogRef.close({
                        data: formData
                    });

                } else {
                   this.resultError = data.error.value;
                   this.openNotificationDanger('error', this.resultError);
                };
            });
        }
    }

    openNotificationDanger(titulo: string, mensaje: string) { 
        this.dialog.open(AlertaComponent, { 
            data: {            
                tipo: 'error',
                titulo: titulo, 
                mensaje: mensaje
            }
        });
    }

    onKeydownSimAplicacionNombre(e: Event) {
        this.simAplicacionNombreCtrl["selected"] = false;

        this.simRolForm.patchValue({
            SimAplicacionId: null
        });
    }

    onSelectSimAplicacionNombre(opt: any){
        this.simAplicacionNombreCtrl["selected"] = true;
        this.simAplicacionNombreCtrl["simAplicacion"] = opt;

        this.simRolForm.patchValue({
            SimAplicacionId: opt.SimAplicacionId
        });
    }

    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.simRolForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.simRolForm.errors[key]}\n`;
        });

        let controls = this.simRolForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}