import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent, AlertasArkeosComponent } from 'arkeos-components';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SimUsuarioModel, SimAplicacionModel } from './sim.usuario.model';
import { SimUsuarioDialog } from './sim.usuario.dialog';
import { SimUsuarioService } from './sim.usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var conditionsLists: any;

@Component({
  selector: 'sim-usuario-table',
  templateUrl: './sim.usuario.table.html',
  styleUrls: ['./sim.usuario.table.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [SimUsuarioService]
})
export class SimUsuarioTable implements AfterViewInit {
    rows: any[] = [];
    originals: any[] = [];
    selectedRow: any;
    selectedIndex: number = 0;
    originalRow: any;

    public displayedColumns: string[] = ['select', 'simTipoDocumento/simTipoDocumentoNombre', 'Documento', 'Nombres', 'Apellidos', 'PhoneNumber', 'Email', 'Estado'];

    public conditionsList = conditionsLists.Varchar;
    public searchValue: any = {};
    public searchCondition: any = {};
    public searchColumn: any = {};
    public _pageSize = 10;

    selectedColumn = {
      name:  '',
      dbName: '',
      type:  '',
      sign: '',
      filter: []
    };

    resultsLength = 0;
    isLoading = false;
    resultError: string = null;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    set pageIndex(value: number) {
        this.paginator.pageIndex = value;
        this.paginator.page.emit();
    }

    get pageIndex(): number {
        return this.paginator.pageIndex;
    }

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    _proc: boolean = false;
    _status: boolean = false;
    _expand: boolean = false;
    _editUsuario: boolean = false;

    aplicativoCtrl: FormControl = new FormControl();
    filteredAplicacionRoles: SimAplicacionModel[] = [];
    filteredAplicativos: any[] = [];

    constructor(public dialog: MatDialog,
                private bottomSheet: MatBottomSheet,
                private snackBar: MatSnackBar,
                private simUsuarioService: SimUsuarioService) {

        simUsuarioService.getAllSimRoles().subscribe(data => {
          let aplicacion = data.value[0].SimAplicacion;
          aplicacion.roles = [];

          data.value.forEach(reg => {
            if (aplicacion.SimAplicacionId === reg.SimAplicacion.SimAplicacionId) {
              aplicacion.roles.push(reg);
            } else {
              this.filteredAplicacionRoles.push(aplicacion);
              aplicacion = reg.SimAplicacion;
              aplicacion.roles = [];
              aplicacion.roles.push(reg);
            };
          });
          this.filteredAplicacionRoles.push(aplicacion);
        })
    }

    ngOnInit() {
      this.simUsuarioService.getAllSimAplicacion().subscribe(data => this.filteredAplicativos = data.value);
      this.aplicativoCtrl.setValue('');
      this.aplicativoCtrl.setValidators(Validators.required);
    }

    onSearchAll() {
      this.aplicativoCtrl.setValue('');
      this.ngAfterViewInit();
    }

    onSearch() {
      this.ngAfterViewInit();
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;

              let _filter = '';
              for (var filterKey in this.searchValue) {
                let filter = {
                  column: this.searchColumn[filterKey].dbName,
                  condition: this.searchCondition[filterKey].value,
                  value: this.searchValue[filterKey],
                  generate: this.searchCondition[filterKey].filter
                } 

                _filter += ' and ' +  filter.generate(filter);
              }
              _filter = (_filter) ? _filter.substr(5) : _filter;

              return this.simUsuarioService.getList(_filter, this.paginator, this.sort, this.aplicativoCtrl.value);
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
          });
    }

    onAdd(): void {
      this.selectedRow = new SimUsuarioModel();
      this.originalRow = new SimUsuarioModel();
      this.selectedIndex = 0;

      this.openDialog();
    }

    onEdit(): void {
      if (this.selectedRow && this.selectedRow._estado != 'N') {
        this.selectedRow._estado = 'O';
        this.originalRow._estado = 'O';
        this.openDialog();
	    } else {
        this.bottomSheet.open(AlertasArkeosComponent, {
          data: {
            mensajeTranslate: 'alertas._mensajeSelectRow',
            nombreBoton1: 'Main._aceptar',
          }
        });
      };
    }

    onSelect(e: Event, row: any, index: number, detalle = false) {
      let act = this._expand && row.Id !== this.selectedRow.Id;
      this.selectedRow = row;
      this.selectedIndex = index;
      this.originalRow = row;
      if (detalle || act) {
        if (!act) { this._expand = !this._expand };
        this.onSelectUsuario();
      };
    }

    onCheckRol() {
      this._editUsuario = true;
    }

    onSelectUsuario() {
      if (!this.isLoadingResults) {
          if (this._editUsuario) {
              this._editUsuario = false;
              const dialogRef = this.dialog.open(AlertaComponent, {
                  data: {
                      tipo: 'error', 
                      titulo: 'Guardar', 
                      mensaje: '¿Desea guardar cambios?' 
                  }
               });     
               dialogRef.afterClosed().subscribe(result => {

                  if (result.data) {
                      this.onActualizarUsuario(true);
                  } else {
                      this.onActivarRoles();        
                  };

              });
          } else {
              this.onActivarRoles();
          };
      };
    }

    onActualizarUsuario(automatico = false) {
      this._proc = true;

      let idRoles: string[] = [];
      this.filteredAplicacionRoles.forEach(reg => {
        reg.roles.forEach(rol => {
          if (rol.check) {
            idRoles.push(rol.Id);
          };
        })
      })

      this.selectedRow.Roles = idRoles;
      this.selectedRow._estado = 'O';
      this.originalRow.SimUsuarioId = this.selectedRow.Id;

      this.isLoadingResults = true;
      this.simUsuarioService.save(this.selectedRow, this.originalRow, 1).subscribe((data: any) => {
          this.isLoadingResults = false;
          this._status = !data?.error;
          this.resultError = null;

          if (this._status) {
            this._editUsuario = false;
            this.selectedRow._edit = true;

            if (automatico) {
              this.onActivarRoles();
            };     

          } else {
              this.resultError = data.error.value;
              this.openNotificationDanger('Error al salvar', this.resultError)
          };
      });
    }

    onActivarRoles() {
      if (this._expand) {
        if (this.selectedRow._edit) {
          this.filteredAplicacionRoles.forEach(reg => {
            reg.roles.forEach(rol => {
              let result = this.selectedRow.Roles.find(reg => reg === rol.Id);
              rol.check = result ? true : false;
            });
          });
        } else {
          this.filteredAplicacionRoles.forEach(reg => {
            reg.roles.forEach(rol => {
              let result = this.selectedRow.Roles.find(reg => reg.Role.Id === rol.Id);
              rol.check = result ? true : false;
            });
          });
        }
      };
    }

    onSelectAndEdit(e: Event, row: SimUsuarioModel, index: number) {
        this.selectedRow = row;
        this.selectedRow._estado = 'O';
        this.selectedIndex = index;
        this.originalRow = row;
        this.originalRow._estado = 'O';

        this.openDialog();
    }

    onSelectColumn(e: Event, name: string, columnType: string, dbName: string, sign: string) {
        this.selectedColumn.name = name;
        this.selectedColumn.dbName = dbName;
        this.selectedColumn.type = columnType;
        this.selectedColumn.sign = sign;
        this.selectedColumn.filter = conditionsLists[columnType] || conditionsLists.Varchar;

        this.searchColumn[name] = Object.assign(this.searchColumn[name] || {}, this.selectedColumn); 
    }

    onRefresh() {
      this.paginator.page.emit();
    }

    onApplyFilter(e: Event) {
        this.paginator.page.emit();
    }

    onClearColumn(e: Event) {
        delete this.searchValue[this.selectedColumn.name];
        delete this.searchCondition[this.selectedColumn.name];

        this.onRefresh();
    }

    onTotals(data: any) {
        Object.assign(this.selectedRow, data);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SimUsuarioDialog, {
          data: {
            selected: this.selectedRow,
            original: this.originalRow
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.onRefresh();
          };
        });
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
}
