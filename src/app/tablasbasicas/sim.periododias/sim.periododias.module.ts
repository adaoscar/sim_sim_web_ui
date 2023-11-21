import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimPeriodoDiasRoutingModule } from './sim.periododias-routing.module';

import { SimPeriodoDiasTable } from './sim.periododias.table';
import { SimPeriodoDiasDialog } from './sim.periododias.dialog';


@NgModule({
  declarations: [
    SimPeriodoDiasTable,
    SimPeriodoDiasDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimPeriodoDiasRoutingModule
  ],
  entryComponents: [
    SimPeriodoDiasTable,
    SimPeriodoDiasDialog
  ],
  exports: [
    SimPeriodoDiasTable,
    SimPeriodoDiasDialog
  ]
})
export class SimPeriodoDiasModule { }
