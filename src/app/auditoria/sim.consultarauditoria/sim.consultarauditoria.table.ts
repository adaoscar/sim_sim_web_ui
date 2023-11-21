import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SimConsultarAuditoriaService } from './sim.consultarauditoria.service';
import { SimConsultarAuditoriaModel } from './sim.consultarauditoria.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlertaComponent } from 'src/app/shared/alerta/alerta.component';
import { Router } from '@angular/router';

declare var conditionsLists: any;

@Component({
  selector: 'sim-consultarauditoria-table',
  templateUrl: './sim.consultarauditoria.table.html',
  // styleUrls: ['./sim.consultarauditoria.table.css'],
  providers: [SimConsultarAuditoriaService]
})
export class SimConsultarAuditoriaTable {
    rows: SimConsultarAuditoriaModel[] = [];
    originals: SimConsultarAuditoriaModel[] = [];
    selectedRow: SimConsultarAuditoriaModel;
    selectedIndex: number = 0;
    originalRow: SimConsultarAuditoriaModel;

    public displayedColumns: string[] = ['Usuario/Apellidos', 'simConsultarAuditoriaRol', 'simConsultarAuditoriaFechaIngreso', 'simConsultarAuditoriaAplicacion', 'simConsultarAuditoriaModulo', 'simConsultarAuditoriaFuncionalidad', 'simConsultarAuditoriaAccion', 'simConsultarAuditoriaRegistroActual', 'simConsultarAuditoriaRegistroModificado'];

    public conditionsList = conditionsLists.Varchar;
    public searchValue: any = {};
    public searchCondition: any = {};
    public searchColumn: any = {};
    public _pageSize = 10;

    filter = {
        column:  '',
        condition:  '',
        value: '',
        generate: null
    };

    selectedColumn = {
        name:  '',
        dbName: '',
        type:  '',
        sign: '',
        filter: []
    };

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    set pageIndex(value: number) {
        this.paginator.pageIndex = value;
        this.paginator.page.emit();
    }

    get pageIndex(): number {
        return this.paginator.pageIndex;
    }

    _proc: boolean = false;
    _status: boolean = false;
    _expand: boolean = false;
    _eliminar: boolean = false;
    _errorFecha: boolean = false;
    resultError: string = null;

    simAuditoriaForm: FormGroup;
    vistaEliminar: boolean = false;

    filteredSimAuditoriaAplicacion: Array<any> = [];
    simAuditoriaAplicacionCtrl: FormControl = new FormControl(["", [
      (control: AbstractControl): {[key: string]: any} | null => {
          const selected = !!control["selected"];
          let result = null;
          if (control.value !== "" && !selected) {
              result = {"simAuditoriaAplicacionCtrl": true };
          }
          return result;
      }] ]);
      
    filteredSimAuditoriaModulo: Array<any> = [];
    simAuditoriaModuloCtrl: FormControl = new FormControl(["", [
      (control: AbstractControl): {[key: string]: any} | null => {
          const selected = !!control["selected"];
          let result = null;
          if (control.value !== "" && !selected) {
              result = {"simAuditoriaModuloCtrl": true };
          }
          return result;
      }] ]);

    filteredSimAuditoriaFuncionalidad: Array<any> = [];
    simAuditoriaFuncionalidadCtrl: FormControl = new FormControl(["", [
      (control: AbstractControl): {[key: string]: any} | null => {
          const selected = !!control["selected"];
          let result = null;
          if (control.value !== "" && !selected) {
              result = {"simAuditoriaFuncionalidadCtrl": true };
          }
          return result;
      }] ]);


    constructor(public dialog: MatDialog,
                private snackBar: MatSnackBar,
                private builder: FormBuilder,
                private router: Router,
                private simConsultarAuditoriaService: SimConsultarAuditoriaService) {

        this.vistaEliminar = router.url.includes('/SIM_EliminarAuditoria');
        let ruta = router.url;
    }

    ngOnInit() {
      this.simAuditoriaForm = this.builder.group({
            'SimConsultarAuditoriaAplicacion': [''],
            'SimConsultarAuditoriaModulo': [''],
            'SimConsultarAuditoriaFuncionalidad': [''],
            'SimConsultarAuditoriaFechaIngresoInicialFe': [new Date()],
            'SimConsultarAuditoriaFechaIngresoInicialHr': ['00:00'],
            'SimConsultarAuditoriaFechaIngresoFinalFe': [new Date()],
            'SimConsultarAuditoriaFechaIngresoFinalHr': ['23:59']
        }, {
            validators: (formGroup: FormGroup): ValidationErrors | null => {
                let validationErrors: any = null;
                return validationErrors;
            }
        });

        this.simAuditoriaForm.controls.SimConsultarAuditoriaAplicacion.setValidators(Validators.required);
        this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialFe.setValidators(Validators.required);
        this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalFe.setValidators(Validators.required);

        this.simAuditoriaAplicacionCtrl.setValue('');
        this.simAuditoriaAplicacionCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.simConsultarAuditoriaService.filterSimAuditoriaAplicacion(data))
            ).subscribe((data) => this.filteredSimAuditoriaAplicacion = data);

        this.simAuditoriaModuloCtrl.setValue('');
        this.simAuditoriaModuloCtrl.disable();
        this.simAuditoriaModuloCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => {
                    let aplicacion = this.simAuditoriaAplicacionCtrl.value;
                    if (aplicacion === '') {
                        return of([]);
                    } else {
                        return this.simConsultarAuditoriaService.filterSimAuditoriaModulo(data, aplicacion);
                    };
                })
            ).subscribe((data) => this.filteredSimAuditoriaModulo = data);

        this.simAuditoriaFuncionalidadCtrl.setValue('');
        this.simAuditoriaFuncionalidadCtrl.disable();
        this.simAuditoriaFuncionalidadCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => {
                    let aplicacion = this.simAuditoriaAplicacionCtrl.value;
                    let modulo = this.simAuditoriaModuloCtrl.value;
                    if (modulo === '') {
                        return of([]);
                    } else {
                        return this.simConsultarAuditoriaService.filterSimAuditoriaFuncionalidad(data, aplicacion, modulo);
                    };
                })
            ).subscribe((data) => this.filteredSimAuditoriaFuncionalidad = data);

        this.simAuditoriaForm.valueChanges.subscribe((data) => {
            this.simAuditoriaForm.patchValue({
            }, {emitEvent: false, onlySelf: true});
        });

        this.simAuditoriaForm.valueChanges.subscribe(data => {
            this.rows = [];
        })

        this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialFe.valueChanges.subscribe(data => {
            this.validarFechas(1);
        })

        this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialHr.valueChanges.subscribe(data => {
            this.validarFechas(3);
        })

        this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalFe.valueChanges.subscribe(data => {
            this.validarFechas(2);
        })

        this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalHr.valueChanges.subscribe(data => {
            this.validarFechas(4);
        })
    }

    validarFechas(tipo: number) {
        if (tipo === 1 && this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialFe.value === null) {
            this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialHr.disable({emitEvent: false});
            this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialHr.reset(null, {emitEvent: false});

        } else if (tipo === 2 && this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalFe.value === null) {
            this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalHr.disable({emitEvent: false});
            this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalHr.reset(null, {emitEvent: false});

        } else {
            let fechaInicio = moment(this.obtenerFecha(1));
            let fechaFinal = moment(this.obtenerFecha(2));
            this._errorFecha = fechaInicio.isAfter(fechaFinal);

            if (tipo === 1) {
                this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialHr.enable({emitEvent: false});
            } else if (tipo === 2) {
                this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalHr.enable({emitEvent: false});
            };
        };
    }

    obtenerFecha(tipo: number) {
        let fecha = tipo === 1 ? this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialFe.value : this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalFe.value;
        let hora = tipo === 1 ? this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoInicialHr.value : this.simAuditoriaForm.controls.SimConsultarAuditoriaFechaIngresoFinalHr.value;

        if (hora === null || hora === '') {
            return fecha;
        } else {
            let dt = hora.split(':');
            let fe = new Date(fecha);
            fe.setHours(Number(dt[0]), Number(dt[1]), 0);
            return fe;
        };
    }

    onFiltro() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                
                let formData = this.simAuditoriaForm.value;
                let fechaInicio = moment(this.obtenerFecha(1));
                let fechaFinal = moment(this.obtenerFecha(2));

                let _filter = '';
                if (formData.SimConsultarAuditoriaAplicacion !== '') { _filter +=  `SimConsultarAuditoriaAplicacion eq '${formData.SimConsultarAuditoriaAplicacion}' and `};
                if (formData.SimConsultarAuditoriaModulo !== '') { _filter +=  `SimConsultarAuditoriaModulo eq '${formData.SimConsultarAuditoriaModulo}' and `};
                if (formData.SimConsultarAuditoriaFuncionalidad !== '') { _filter +=  `SimConsultarAuditoriaFuncionalidad eq '${formData.SimConsultarAuditoriaFuncionalidad}' and `};
                if (formData.SimConsultarAuditoriaFechaIngresoInicialFe !== null) { _filter +=  `SimConsultarAuditoriaFechaIngreso Ge ${fechaInicio.toISOString()} and `};
                if (formData.SimConsultarAuditoriaFechaIngresoFinalFe !== null) { _filter +=  `SimConsultarAuditoriaFechaIngreso Le ${fechaFinal.toISOString()}`};
                
                if (_filter.endsWith(' and ')) {
                    _filter = _filter.substr(0, _filter.length - 5);
                };

                return this.simConsultarAuditoriaService.getList(_filter, this.filter, this.paginator, this.sort);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data["@odata.count"] || 0;

              if(data.error) {
                this.openNotificationDanger(data.message); 
              }

              return data.value || [];
            }),
            catchError(() => {
              this.isLoadingResults = false;
              // Catch if the API has reached its rate limit. Return empty data.
              this.isRateLimitReached = true;
              return observableOf({
                "@odata.count": 0,
                value: []
              });
            })
          ).subscribe(data => {
            this.rows = [...data];
            this.originals = data;
            this._eliminar = this.rows.length > 0;
          });
    }

    onEliminar() {
        const dialogRef = this.dialog.open(AlertaComponent, {
            data: {
                 tipo: 'error', 
                 titulo: 'Confirmar', 
                 mensaje: '¿Está seguro de borrar la información de la tabla de auditoria?' 
            }
         });

         dialogRef.afterClosed().subscribe(result => {
             if (result.data) {

                let formData = this.simAuditoriaForm.value;
                let fechaInicio = moment(this.obtenerFecha(1));
                let fechaFinal = moment(this.obtenerFecha(2));
                let aplicacion = formData.SimConsultarAuditoriaAplicacion;

                this.onExportExcel();

                this.simConsultarAuditoriaService.onDeleteAuditoria(fechaInicio.toISOString(), fechaFinal.toISOString(), aplicacion).subscribe(data => {
                    this._status = !data?.error;
                    this.resultError = null;

                    if (this._status) {
                        this.onFiltro();
                    } else {
                        this._proc = false;
                        this.resultError = data.error.value;
                        this.dialog.open(AlertaComponent, { 
                            data: {            
                                tipo: 'error',
                                titulo: 'Error al eliminar',
                                mensaje: this.resultError
                            }
                        })
                    };
                })
            };
        });
    }

    onExportExcel() {
        if (this.simAuditoriaForm.invalid) {
            this.dialog.open(AlertaComponent, {
                data: {
                     tipo: 'error', 
                     titulo: 'Datos faltantes', 
                     mensaje: 'Debe seleccionar Aplicación, Fecha Inicial y Fecha Final para descargar el archivo de auditoría' 
                }
             });

        } else {
            let formData = this.simAuditoriaForm.value;
            let fechaInicio = moment(this.obtenerFecha(1));
            let fechaFinal = moment(this.obtenerFecha(2));
            let aplicacion = formData.SimConsultarAuditoriaAplicacion;
            let fecIni = moment(formData.SimConsultarAuditoriaFechaIngresoInicialFe).format('YYYY-MM-DD');
            let fecFin = moment(formData.SimConsultarAuditoriaFechaIngresoFinalFe).format('YYYY-MM-DD');

            this.simConsultarAuditoriaService.onExportAuditoria(fechaInicio.toISOString(), fechaFinal.toISOString(), aplicacion)
                .subscribe((file: Blob) => {
                    var url = window.URL.createObjectURL(file);
                    var anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.download = `Aplicación:${aplicacion}_Desde:${fecIni}_Hasta:${fecFin}`;
                    anchor.click();
                    this.isLoadingResults = false;
                });
            };
    }

    onRefresh() {
        this.filter.column = '';
        this.filter.value = '';
        this.filter.condition = '';
        this.selectedRow = null;
        
        this.paginator.page.emit();
    }

    onSelect(e: Event, row: SimConsultarAuditoriaModel, index: number) {
        this.selectedRow = row;
        this.selectedIndex = index;
        this.originalRow = SimConsultarAuditoriaModel.clone(row);
    }

    onSelectColumn(e: Event, name: string, columnType: string, dbName: string, sign: string) {
        this.selectedColumn.name = name;
        this.selectedColumn.dbName = dbName;
        this.selectedColumn.type = columnType;
        this.selectedColumn.sign = sign;
        this.selectedColumn.filter = conditionsLists[columnType] || conditionsLists.Varchar;
    }

    onApplyFilter(e: Event) {
        this.filter.column = this.selectedColumn.dbName;
        this.filter.condition = this.searchCondition[this.selectedColumn.name].value;
        this.filter.value = this.searchValue[this.selectedColumn.name];
        this.filter.generate = this.searchCondition[this.selectedColumn.name].filter;

        this.paginator.page.emit();
    }

    onClearColumn(e: Event) {
        this.searchValue[this.selectedColumn.name] = '';
        this.searchCondition[this.selectedColumn.name] = '';

        this.onRefresh();
    }

    onTotals(data: any) {
        Object.assign(this.selectedRow, data);
    }

    openNotificationDanger(message: string, action?: string) {
       this.snackBar.open(message, action, {
           duration: 2000,
           panelClass: 'dangerSnackBar',
       });
    }

    formatPageLabel(value: number) {
        return value + 1;
    }

    // Autocompletes

    onKeydownSimAuditoriaAplicacion(e: Event) {
        this.simAuditoriaAplicacionCtrl["selected"] = false;

        this.simAuditoriaModuloCtrl.disable({ emitEvent: false });
        this.simAuditoriaModuloCtrl.reset('', { emitEvent: false });
        this.simAuditoriaFuncionalidadCtrl.disable({ emitEvent: false });
        this.simAuditoriaFuncionalidadCtrl.reset('', { emitEvent: false });

        this.simAuditoriaForm.patchValue({
            SimConsultarAuditoriaAplicacion: '',
            SimConsultarAuditoriaModulo: '',
            SimConsultarAuditoriaFuncionalidad: ''
        });
    }

    onSelectSimAuditoriaAplicacion(opt: any){
        this.simAuditoriaAplicacionCtrl["selected"] = true;
        this.simAuditoriaAplicacionCtrl["SimDepartamento"] = opt;

        this.simAuditoriaModuloCtrl.disable({ emitEvent: false });
        this.simAuditoriaModuloCtrl.reset('', { emitEvent: false });
        this.simAuditoriaFuncionalidadCtrl.disable({ emitEvent: false });
        this.simAuditoriaFuncionalidadCtrl.reset('', { emitEvent: false });

        this.simAuditoriaForm.patchValue({
            SimConsultarAuditoriaAplicacion: opt.SimConsultarAuditoriaAplicacion,
            SimConsultarAuditoriaModulo: '',
            SimConsultarAuditoriaFuncionalidad: ''
        });

        this.simConsultarAuditoriaService.filterSimAuditoriaModulo('', opt.SimConsultarAuditoriaAplicacion)
            .subscribe((data) => {
                this.filteredSimAuditoriaModulo = data;
                if (data.length > 0) { this.simAuditoriaModuloCtrl.enable({ emitEvent: false }) };
            });
    }

    onKeydownSimAuditoriaModulo(e: Event) {
        this.simAuditoriaModuloCtrl["selected"] = false;

        this.simAuditoriaFuncionalidadCtrl.disable({ emitEvent: false });
        this.simAuditoriaFuncionalidadCtrl.reset('', { emitEvent: false });

        this.simAuditoriaForm.patchValue({
            SimConsultarAuditoriaModulo: '',
            SimConsultarAuditoriaFuncionalidad: ''
        });
    }

    onSelectSimAuditoriaModulo(opt: any){
        this.simAuditoriaModuloCtrl["selected"] = true;
        this.simAuditoriaModuloCtrl["SimDepartamento"] = opt;

        this.simAuditoriaFuncionalidadCtrl.disable({ emitEvent: false });
        this.simAuditoriaFuncionalidadCtrl.reset('', { emitEvent: false });

        this.simAuditoriaForm.patchValue({
            SimConsultarAuditoriaModulo: opt.SimConsultarAuditoriaModulo,
            SimConsultarAuditoriaFuncionalidad: ''
        });

        let aplicacion = this.simAuditoriaAplicacionCtrl.value;
        this.simConsultarAuditoriaService.filterSimAuditoriaFuncionalidad('', aplicacion, opt.SimConsultarAuditoriaModulo)
            .subscribe((data) => {
                this.filteredSimAuditoriaFuncionalidad = data;
                if (data.length > 0) { this.simAuditoriaFuncionalidadCtrl.enable({ emitEvent: false }) };
            });
    }

    onKeydownSimAuditoriaFuncionalidad(e: Event) {
        this.simAuditoriaFuncionalidadCtrl["selected"] = false;

        this.simAuditoriaForm.patchValue({
            SimConsultarAuditoriaFuncionalidad: ''
        });
    }

    onSelectSimAuditoriaFuncionalidad(opt: any){
        this.simAuditoriaFuncionalidadCtrl["selected"] = true;
        this.simAuditoriaFuncionalidadCtrl["SimDepartamento"] = opt.SimConsultarAuditoriaFuncionalidad;

        this.simAuditoriaForm.patchValue({
            SimConsultarAuditoriaFuncionalidad: opt.SimConsultarAuditoriaFuncionalidad
        });
    }
}
