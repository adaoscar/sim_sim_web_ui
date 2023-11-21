import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { AlertasArkeosComponent, DescargaExcelModule } from 'arkeos-components';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SimOrientacionSexualDialog } from './sim.orientacionsexual.dialog';
import { SimOrientacionSexualService } from './sim.orientacionsexual.service';
import { SimOrientacionSexualModel } from './sim.orientacionsexual.model';

declare var conditionsLists: any;

@Component({
  selector: 'sim-orientacionsexual-table',
  templateUrl: './sim.orientacionsexual.table.html',
  // styleUrls: ['./sim.orientacionsexual.table.css'],
  providers: [SimOrientacionSexualService]
})
export class SimOrientacionSexualTable implements AfterViewInit {
    rows: SimOrientacionSexualModel[] = [];
    originals: SimOrientacionSexualModel[] = [];
    selectedRow: SimOrientacionSexualModel;
    selectedIndex: number = 0;
    originalRow: SimOrientacionSexualModel;

    public displayedColumns: string[] = ['simOrientacionSexualCodigo', 'simOrientacionSexualNombre', 'simOrientacionSexualEstado'];

    public conditionsList = conditionsLists.Varchar;
    public searchValue: any = {};
    public searchCondition: any = {};
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

    _proc: boolean = false;
    _status: boolean = false;
    _expand: boolean = false;

    constructor(public dialog: MatDialog,
                private bottomSheet: MatBottomSheet,
                private snackBar: MatSnackBar,
                private simOrientacionSexualService: SimOrientacionSexualService) { }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.simOrientacionSexualService.getList(this.filter, this.paginator, this.sort);
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
      this.selectedRow = new SimOrientacionSexualModel();
      this.originalRow = new SimOrientacionSexualModel();
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
     }
    }

    onRefresh() {
        this.filter.column = '';
        this.filter.value = '';
        this.filter.condition = '';
        this.selectedRow = null;

        this.paginator.page.emit();
    }

    onSelect(e: Event, row: SimOrientacionSexualModel, index: number) {
        this._expand = this.selectedRow !== row ? true : !this._expand;
        this.selectedRow = row;
        this.selectedIndex = index;
        this.originalRow = SimOrientacionSexualModel.clone(row);
    }

    onSelectAndEdit(e: Event, row: SimOrientacionSexualModel, index: number) {
        this.selectedRow = row;
        this.selectedRow._estado = 'O';
        this.selectedIndex = index;
        this.originalRow = SimOrientacionSexualModel.clone(row);
        this.originalRow._estado = 'O';

        this.openDialog();
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

    onExportExcel(e: Event) {
        this.isLoadingResults = true;
        this.simOrientacionSexualService.getAll().subscribe(data => {
            if (data.value.length == 0) {
                this.isLoadingResults = false;
                this.bottomSheet.open(AlertasArkeosComponent, {
                data: {
                    mensajeTranslate: 'alertas._mensajeNoData',
                    nombreBoton1: 'Main._aceptar',
                }
                });
            } else {
                DescargaExcelModule.generarArchivoExcel(SimOrientacionSexualModel.cloneExcel(data.value), 'OrientacionSexual');
                this.isLoadingResults = false;
            }
        });
    }

    onCopyRows(e: Event) {
        let result = this.displayedColumns.join('\t') + '\n';
        this.simOrientacionSexualService.getAll().subscribe((data: any) => {
            data.forEach((row) => result += new SimOrientacionSexualModel(row).toClipboard() + '\n');
            (navigator as any).clipboard.writeText(result)
                .then(
                    () => console.log('write to clipboard OK'),
                    () => console.log('write to clipboard failed'
                )
            );
        });
    }

    onPasteRows(e: Event) {
        (navigator as any).clipboard.readText().then((text: string) => {
            let rows = text.split("\n").filter((line) => line.length > 0).map((line) => {
                return new SimOrientacionSexualModel().fromClipboard(line);
            });

            this.simOrientacionSexualService.saveRows(rows).subscribe((data: any) => {
                console.log('Saved rows for SimOrientacionSexual');
                this.paginator.page.emit();
            });
        });
    }

    onTotals(data: any) {
        Object.assign(this.selectedRow, data);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SimOrientacionSexualDialog, {
          data: {
            selected: this.selectedRow,
            original: this.originalRow
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            Object.assign(this.selectedRow, result.data);
            switch (this.selectedRow._estado )
            {
              case 'N':
                this.selectedRow._estado = 'O';
                this.selectedIndex = this.rows.length;
                this.rows.push(this.selectedRow);
                this.originals.push(this.selectedRow);
                this.rows = [...this.rows];
                this.resultsLength = this.rows.length;
                break;
              case 'D':
                this.rows.splice(this.selectedIndex, 1);
                this.rows = [...this.rows];
                this.resultsLength -= 1;
                this.selectedRow = null;
                break;
            }
          }
        });
    }

    openNotificationDanger(message: string, action?: string) {
       this.snackBar.open(message, action, {
           duration: 2000,
           panelClass: 'dangerSnackBar',
       });
    }
}
