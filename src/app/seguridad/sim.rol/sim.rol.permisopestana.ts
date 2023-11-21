import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimFuncionalidadModel } from './sim.rol.model';

@Component({
    templateUrl: './sim.rol.permisopestana.html'
})
export class SimRolPermisoPestana {
    selectedFuncionalidad: SimFuncionalidadModel;
    listaFuncionalidades: SimFuncionalidadAdicionalModel[] = [];
    
    guardar: boolean = false;

    constructor(public dialogRef: MatDialogRef<SimRolPermisoPestana>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.dialogRef.disableClose = true;
        this.selectedFuncionalidad = data.selected;
        this.onActivarFuncionalidades();
    }

    onActivarFuncionalidades() {
        let pestanasFuncionalidad = [];
        if (this.selectedFuncionalidad.ClaimPestanas.includes('/'))
            pestanasFuncionalidad = this.selectedFuncionalidad.ClaimPestanas.split('/');
        else
            pestanasFuncionalidad.push(this.selectedFuncionalidad.ClaimPestanas);

        if (this.selectedFuncionalidad.permisosPestanas === null) {
            pestanasFuncionalidad.forEach(pestana => {
                let registro = new SimFuncionalidadAdicionalModel(pestana);
                this.listaFuncionalidades.push(registro);
            });

        } else {
            let permisos = JSON.parse(this.selectedFuncionalidad.permisosPestanas);
            pestanasFuncionalidad.forEach(pestana => {
                let encontrar = permisos.find(p => p.nombre === pestana);
                if (encontrar) {
                    let crud = encontrar.permisos.split('/');
                    let registro = {
                        ClaimDescription: pestana,
                        checkc: crud.find(reg => reg === 'c') !== undefined,
                        checkr: crud.find(reg => reg === 'r') !== undefined,
                        checku: crud.find(reg => reg === 'u') !== undefined,
                        checkd: crud.find(reg => reg === 'd') !== undefined
                    };
                    this.listaFuncionalidades.push(registro);

                } else {
                    let registro = new SimFuncionalidadAdicionalModel(pestana);
                    this.listaFuncionalidades.push(registro);
                };
            });
        };
    }

    onCheckFuncionalidad(checked: boolean, funcionalidad: SimFuncionalidadAdicionalModel, tipo: string = 'checkr') {
        this.guardar = true;
        switch (tipo) {
            case 'checkr':
                funcionalidad.checkc = false;
                funcionalidad.checku = false;
                funcionalidad.checkd = false;
                break;
            case 'checkc':
            case 'checku':
            case 'checkd':
                if (checked) { funcionalidad.checkr = true };
                break;
        };
    }

    onSubmit() {
        let validar = false;
        let _permisosJson = [{ nombre: '', permisos: '' }];
        this.listaFuncionalidades.forEach(func => {
            if (func.checkr) {
                let permisos = '';
                if (func.checkc) { permisos += 'c/' };
                if (func.checkr) { permisos += 'r/' };
                if (func.checku) { permisos += 'u/' };
                if (func.checkd) { permisos += 'd/' };

                let registro = { nombre: func.ClaimDescription, permisos: permisos };
                _permisosJson.push(registro);
                validar = true;
            };
        });

        if (validar)
            this.selectedFuncionalidad.permisosPestanas = JSON.stringify(_permisosJson);
        else
            this.selectedFuncionalidad.permisosPestanas = null;

        this.dialogRef.close({
            guardar: this.guardar,
            funcionalidad: this.selectedFuncionalidad
        });
    }
}

export class SimFuncionalidadAdicionalModel {
    public ClaimDescription: string;
    public checkc: boolean;
    public checkr: boolean;
    public checku: boolean;
    public checkd: boolean;

    constructor(claimDescription: string) {
        this.ClaimDescription = claimDescription;
        this.checkc = false;
        this.checkr = false;
        this.checku = false;
        this.checkd = false;
    }
}