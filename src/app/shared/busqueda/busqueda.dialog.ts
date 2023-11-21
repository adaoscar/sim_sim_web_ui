import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './busqueda.dialog.html'
})
export class BusquedaComponent {
    
    busquedaForm: FormGroup;
    selFuncionalidad: any;

    originalfuncionalidadNombre: Array<any> = [];
    filteredfuncionalidadNombre: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    _errorFuncionalidad: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private _snackBar: MatSnackBar,
                private jwtDecodeTokenService: JwtDecodeTokenService,
                public dialogRef: MatDialogRef<BusquedaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.dialogRef.disableClose = true;
        jwtDecodeTokenService.getPermisos().subscribe(data => {
            let roles: any[] = data[0].roles;
            let filteredFuncionalidades: any[] = [];

            let registro = roles[0].modulos[0].funcionalidades[0];
            let _mod = roles[0].modulos[0];
            registro.grupo = { nombre: _mod.nombre, descripcion: _mod.descripcion, id: _mod.id };
            filteredFuncionalidades.push(registro);

            roles.forEach(rol => {
                rol.modulos.forEach(mod => {
                    mod.funcionalidades.forEach(func => {
                        let encontrar = filteredFuncionalidades.find(reg => reg.nombre === func.nombre);
                        if (!encontrar) {
                            let registro = func;
                            registro.grupo = { nombre: mod.nombre, descripcion: mod.descripcion, id: mod.id };
                            filteredFuncionalidades.push(registro);
                        };
                    });
                });
            });

            filteredFuncionalidades.forEach(reg => reg.descripcion = this.onEliminarTildes(reg.descripcion));
            this.originalfuncionalidadNombre = filteredFuncionalidades;
            this.filteredfuncionalidadNombre = filteredFuncionalidades;
        })
    }

    ngOnInit() {
        this.busquedaForm = this.builder.group({
            'funcionalidadNombre': ['', Validators.required],
            'grupoNombre': [ { value: '', disabled: true } ]
        }, { 
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                let validationErrors: any = null;
                return validationErrors;
            } 
        });

        this.busquedaForm.valueChanges.subscribe((data) => {
            this.busquedaForm.patchValue({
            }, {emitEvent: false, onlySelf: true});
        });

        this.busquedaForm.controls.funcionalidadNombre.valueChanges.subscribe(data => {
            if (data === '') {
                this.filteredfuncionalidadNombre = this.originalfuncionalidadNombre;
            } else {
                let valor = this.onEliminarTildes(data).toLocaleLowerCase();
                this.filteredfuncionalidadNombre = this.originalfuncionalidadNombre.filter(func => {
                    let desc = func.descripcion.toLocaleLowerCase();
                    return desc.includes(valor);
                });
            };
        })
    }

    onSubmit(formData: any) {
        this._proc = true;
        this.dialogRef.close({
            data: this.selFuncionalidad
        });
    }

    onEliminarTildes(dato: string) {
        let palabra = dato.replace('á', 'a');
        palabra = palabra.replace('é', 'e');
        palabra = palabra.replace('í', 'i');
        palabra = palabra.replace('ó', 'o');
        palabra = palabra.replace('ú', 'u');
        palabra = palabra.replace('Á', 'A');
        palabra = palabra.replace('É', 'E');
        palabra = palabra.replace('Í', 'I');
        palabra = palabra.replace('Ó', 'O');
        palabra = palabra.replace('Ú', 'U');
        return palabra;
    }

    openNotificationDanger(message: string, action?: string) {
       this._snackBar.open(message, action, {
           duration: 10000,
           panelClass: 'dangerSnackBar',
       });
    }    

    onKeydown_funcionalidadNombre(e: Event) {
        this.selFuncionalidad = null;
        this._errorFuncionalidad = true;
        
        this.busquedaForm.patchValue({
            grupoNombre: null
        });
    }
    
    onSelect_funcionalidadNombre(opt: any){
        this.selFuncionalidad = opt;
        this._errorFuncionalidad = false;

        this.busquedaForm.patchValue({
            funcionalidadNombre: opt.descripcion,
            grupoNombre: opt.grupo.descripcion
        });
    }    

    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.busquedaForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.busquedaForm.errors[key]}\n`; 
        });
        
        let controls = this.busquedaForm.controls;
        
        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}`; 
            });
        });        
        
        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
