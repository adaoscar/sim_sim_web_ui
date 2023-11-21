import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimOcupacionRoutingModule } from './sim.ocupacion-routing.module';

import { SimOcupacionTable } from './sim.ocupacion.table';
import { SimOcupacionDialog } from './sim.ocupacion.dialog';


@NgModule({
  declarations: [
    SimOcupacionTable,
    SimOcupacionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimOcupacionRoutingModule
  ],
  entryComponents: [
    SimOcupacionTable,
    SimOcupacionDialog
  ],
  exports: [
    SimOcupacionTable,
    SimOcupacionDialog
  ]
})
export class SimOcupacionModule { }
