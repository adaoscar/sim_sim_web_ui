import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/alerta/alerta.component';
import { SimRolDialog } from './sim.rol.dialog';

import { SimFuncionalidadModel, SimModuloModel, SimRolModel } from "./sim.rol.model";
import { SimRolPermisoPestana } from "./sim.rol.permisopestana";
import { SimRolService } from "./sim.rol.service";

@Component({
    selector: 'sim-rol-component',
    templateUrl: './sim.rol.component.html',
    providers: [SimRolService]
})
export class SimRolComponent {
    roles: SimRolModel[] = [];
    selectedRol: SimRolModel = new SimRolModel();
    selectedRolIndex: number = 0;

    filteredModulos: SimModuloModel[] = [];

    _status: boolean = false;
    _editPermiso: boolean = false;
    resultError: string = null;
    isLoading: boolean = false;
    isLoadingResults: boolean = false;

    constructor(public dialog: MatDialog,
                private simRolService: SimRolService) {}

    ngOnInit() {
        this.isLoading = true;
        this.simRolService.getAllRoles().subscribe(data => {
            this.isLoading = false;
            this._status = !data?.error;
            this.resultError = null;

            if (this._status) {
                data.value.forEach((reg: SimRolModel) => reg.crud = this.onValidarActivacionCRUD(reg.SimAplicacionId));
                this.roles = data.value;

            } else {
               this.resultError = data.error.value;
               this.openNotificationDanger('error', this.resultError);
            };
        })
    }

    onAdd() {
        let selected = new SimRolModel();
        const dialogRef = this.dialog.open(SimRolDialog, {
            data: {
                selected: selected
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            };
        });
    }

    onCheck(checked: boolean, tipo: string = 'checkr', func: string = 'r') {
        this._editPermiso = true;
        switch (true) {
            case checked && func !== 'r':
                this.filteredModulos.forEach(mod => {
                    mod[tipo] = checked;
                    mod.checkr = checked;
                    mod[`funcActivas${func}`] = mod.funcTotal;
                    mod.funcActivasr = mod.funcTotal;
                    mod.Funcionalidades.forEach(func => {
                        func[tipo] = checked;
                        func.checkr = checked;
                    });
                });
                break;
            case checked:
                this.filteredModulos.forEach(mod => {
                    mod[tipo] = checked;
                    mod[`funcActivas${func}`] = mod.funcTotal;
                    mod.Funcionalidades.forEach(func => {
                        func[tipo] = checked;
                    });
                });
                break;        
            default:
                this.filteredModulos.forEach(mod => {
                    mod.funcActivasc = 0;
                    mod.funcActivasr = 0;
                    mod.funcActivasu = 0;
                    mod.funcActivasd = 0;
                    
                    mod.checkc = checked;
                    mod.checkr = checked;
                    mod.checku = checked;
                    mod.checkd = checked;
                    
                    mod.Funcionalidades.forEach(func => {
                        func.checkr = checked;
                        func.checkc = checked;
                        func.checku = checked;
                        func.checkd = checked;
                    });
                });
                break;
        };
    }

    onCheckModulo(checked: boolean, modulo: SimModuloModel, tipo: string = 's', func: string = 'r') {
        this._editPermiso = true;
        switch (true) {
            case tipo === 'm' && !checked && func === 'r':
                modulo.funcActivasc = 0;
                modulo.funcActivasr = 0;
                modulo.funcActivasu = 0;
                modulo.funcActivasd = 0;

                modulo.checkc = checked;
                modulo.checkr = checked;
                modulo.checku = checked;
                modulo.checkd = checked;

                modulo.Funcionalidades.forEach(reg => {
                    reg.checkc = checked;
                    reg.checkr = checked;
                    reg.checku = checked;
                    reg.checkd = checked;
                });
                break;
            case tipo === 'm' && checked && func !== 'r':
                modulo[`funcActivas${func}`] = modulo.funcTotal;
                modulo.funcActivasr = modulo.funcTotal;
                modulo.checkr = true;
                modulo.Funcionalidades.forEach(reg => {
                    reg[`check${func}`] = checked;
                    reg.checkr = checked;
                });
                break;
            default:
                modulo[`funcActivas${func}`] = checked ? modulo.funcTotal : 0;
                modulo.Funcionalidades.forEach(reg => {
                    reg[`check${func}`] = checked;
                });
                break;
        };
    }

    onCheckFuncionalidad(checked: boolean, modulo: SimModuloModel, funcionalidad: SimFuncionalidadModel, tipo: string = 's', func: string = 'r') {
        this._editPermiso = true;
        if (tipo === 'm') {
            switch (`check${func}`) {
                case 'checkr':
                    if (!checked) {
                        if (funcionalidad.checkc) { funcionalidad.checkc = false; this.validarModulo(false, modulo, 'c') };
                        if (funcionalidad.checku) { funcionalidad.checku = false; this.validarModulo(false, modulo, 'u') };
                        if (funcionalidad.checkd) { funcionalidad.checkd = false; this.validarModulo(false, modulo, 'd') };
                    };
                    break;
                case 'checkc':
                case 'checku':
                case 'checkd':
                    if (checked && !funcionalidad.checkr) { funcionalidad.checkr = true; this.validarModulo(true, modulo, 'r') };
                    break;
            };
        };
        this.validarModulo(checked, modulo, func);
    }

    validarModulo(checked: boolean, modulo: SimModuloModel, func: string) {
        checked ? modulo[`funcActivas${func}`]++ : modulo[`funcActivas${func}`]--;
        modulo[`check${func}`] = modulo.funcTotal === modulo[`funcActivas${func}`];
    }

    onSelectRol(rol: SimRolModel, index: number) {
        if (this._editPermiso) {
            this._editPermiso = false;
            const dialogRef = this.dialog.open(AlertaComponent, {
                data: {
                    tipo: 'error', 
                    titulo: 'Guardar', 
                    mensaje: '¿Desea guardar cambios?' 
                }
                });     
                dialogRef.afterClosed().subscribe(result => {

                if (result.data) {
                    this.onActualizarRol(true, rol, index);
                } else {
                    this.onCargarFuncionalidades(rol, index);
                };

            });
        } else {
            this.onCargarFuncionalidades(rol, index);
        };
    }

    onCargarFuncionalidades(rol: SimRolModel, index: number) {
        if (rol.SimAplicacionId !== this.selectedRol.SimAplicacionId) {
            this.isLoadingResults = true;
            this.filteredModulos = [];
            this.simRolService.getFuncionalidadesByAplicacion(rol.SimAplicacionId).subscribe((data: any) => {
                this.isLoadingResults = false;
                this._status = !data?.error;
                this.resultError = null;
    
                if (this._status) {
                    this.selectedRol = rol;
                    this.selectedRolIndex = index;
                    this.filteredModulos = data.value;
                    this.onActivarFuncionalidades();
    
                } else {
                   this.resultError = data.error.value;
                   this.openNotificationDanger('error', this.resultError);
                };
    
            });
        
        } else {
            this.selectedRol = rol;
            this.selectedRolIndex = index;
            this.onActivarFuncionalidades();
        };
    }

    onActualizarRol(tipo: boolean, rol?: SimRolModel, index?: number) {
        if (!this.isLoadingResults) {
            this.isLoadingResults = true;
            this.selectedRol._estado = 'O';
            
            let funcionalidades = [];
            let original = this.selectedRol.Funcionalidades;
            this.selectedRol.Funcionalidades = [];
            
            if (this.selectedRol.crud) {
                this.filteredModulos.forEach(mod => {
                    mod.Funcionalidades.forEach(func => {
                        if (func.checkr) {
                            let permisos = '';
                            if (func.checkc) { permisos += 'c/' };
                            if (func.checku) { permisos += 'u/' };
                            if (func.checkd) { permisos += 'd/' };

                            let registro = [{ nombre: 'principal', permisos: permisos }];

                            if (func.ClaimPestanas !== null && func.permisosPestanas !== null) {
                                let _jsonPestanas = JSON.parse(func.permisosPestanas);
                                for (let cont = 1; cont < _jsonPestanas.length; cont++) {
                                    registro.push(_jsonPestanas[cont]);
                                };
                            };
                            
                            let registrog = { FuncionalidadId: func.IdClaim, Permisos: JSON.stringify(registro) };
                            this.selectedRol.Funcionalidades.push(registrog);

                            let registrop = { ClaimId: func.IdClaim, ClaimPermission: JSON.stringify(registro) };
                            funcionalidades.push(registrop);
                        };
                    });
                });

            } else {
                this.filteredModulos.forEach(mod => {
                    mod.Funcionalidades.forEach(func => {
                        if (func.checkr) {
                            this.selectedRol.Funcionalidades.push({ FuncionalidadId: func.IdClaim, Permisos: null });
                            let registro = { ClaimId: func.IdClaim, ClaimPermission: null };
                            funcionalidades.push(registro);
                        };
                    });
                });
            };
            
            this.simRolService.saveRol(this.selectedRol).subscribe((data: any) => {
                this.isLoadingResults = false;
                this._status = !data?.error;
                this.resultError = null;

                if (this._status) {
                    this._editPermiso = false;
                    this.selectedRol.Funcionalidades = funcionalidades;
                    if (tipo) { this.onCargarFuncionalidades(rol, index) };

                } else {
                    this.selectedRol.Funcionalidades = original;
                    this.resultError = data.error.value;
                    this.openNotificationDanger('error', this.resultError);
                };
            });
        };
    }

    onActivarFuncionalidades() {
        if (this.selectedRol.crud) {
            this.filteredModulos.forEach(modulo => {

                let conteoc = 0;
                let conteor = 0;
                let conteou = 0;
                let conteod = 0;
                
                modulo.Funcionalidades.forEach(func => {
                    let funcionalidad = this.selectedRol.Funcionalidades.find(f => f.ClaimId === func.IdClaim);
                    func.checkadc = func.ClaimPestanas !== null;

                    if (funcionalidad && funcionalidad.ClaimPermission !== null) {
                        conteor++;
                        let permisos = JSON.parse(funcionalidad.ClaimPermission);
                        let crud = permisos[0].permisos.split('/');
                        func.checkr = true;
                        func.checkc = crud.find(reg => reg === 'c') !== undefined;
                        func.checku = crud.find(reg => reg === 'u') !== undefined;
                        func.checkd = crud.find(reg => reg === 'd') !== undefined;
                        func.permisosPestanas = permisos.length > 1 ? funcionalidad.ClaimPermission : null;

                        if (func.checkc) { conteoc++ };
                        if (func.checku) { conteou++ };
                        if (func.checkd) { conteod++ };

                    } else {
                        func.checkc = false;
                        func.checkr = false;
                        func.checku = false;
                        func.checkd = false;
                        func.permisosPestanas = null;
                    };
                });
                modulo.funcTotal = modulo.Funcionalidades.length;
                modulo.funcActivasc = conteoc;
                modulo.checkc = conteoc === modulo.funcTotal;
                modulo.funcActivasr = conteor;
                modulo.checkr = conteor === modulo.funcTotal;
                modulo.funcActivasu = conteou;
                modulo.checku = conteou === modulo.funcTotal;
                modulo.funcActivasd = conteod;
                modulo.checkd = conteod === modulo.funcTotal;
            });

        } else {
            this.filteredModulos.forEach(modulo => {
                let conteo = 0;
                modulo.Funcionalidades.forEach(func => {
                    let encontrar = this.selectedRol.Funcionalidades.find(f => f.ClaimId === func.IdClaim);
                    func.checkr = encontrar ? true : false;
                    if (encontrar) { conteo++ };
                });
                modulo.funcTotal = modulo.Funcionalidades.length;
                modulo.funcActivasr = conteo;
                modulo.checkr = conteo === modulo.funcTotal;
            });
        };
    }

    onDelete() {
        const dialogRef = this.dialog.open(AlertaComponent, {
            data: {
                 tipo: 'error', 
                 titulo: 'Confirmar', 
                 mensaje: '¿Está seguro de eliminar el registro seleccionado?' 
            }
         });

         dialogRef.afterClosed().subscribe(result => {
            if (result.data) {
                this.isLoadingResults = true;
                this.simRolService.deleteRol(this.selectedRol).subscribe((data: any) => {
                    this.isLoadingResults = false;
                    this._status = data?.value === 'ok';
                    this.resultError = null;
                    
                    if (this._status) {
                        this.ngOnInit();
                        
                    } else {
                        this.resultError = data.error.value;
                        this.openNotificationDanger('Error al eliminar', this.resultError)
                    };
                });
            };
        });
    }

    openDialogPermisoPestana(modulo: SimModuloModel, funcionalidad: SimFuncionalidadModel) {
        const dialogRef = this.dialog.open(SimRolPermisoPestana, {
            data: {
                selected: funcionalidad
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            this._editPermiso = result.guardar;
            funcionalidad = result.funcionalidad;
            if (funcionalidad.permisosPestanas !== null) {
                funcionalidad.checkr = true;
                if (result.guardar) {
                    this.onCheckFuncionalidad(true, modulo, funcionalidad);
                };
            };
        })
    }

    onRefresh() {
        if (!this.isLoading) {
            this.ngOnInit();
        };
    }

    onValidarActivacionCRUD(aplicativoId: number) {
        switch (aplicativoId) {
            case 1: return false; //Asuntos Internacionales
            case 2: return false; //Control Disciplinario
            case 3: return false; //SICEQ
            case 4: return true;  //Política Criminal
            case 5: return false; //Casas de Justicia
            case 6: return false; //SIM
            case 7: return false; //SICAAC
        };
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
    
}