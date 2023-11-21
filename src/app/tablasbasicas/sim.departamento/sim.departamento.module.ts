import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimDepartamentoRoutingModule } from './sim.departamento-routing.module';

import { SimDepartamentoTable } from './sim.departamento.table';
import { SimDepartamentoDialog } from './sim.departamento.dialog';


@NgModule({
  declarations: [
    SimDepartamentoTable,
    SimDepartamentoDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimDepartamentoRoutingModule
  ],
  entryComponents: [
    SimDepartamentoTable,
    SimDepartamentoDialog
  ],
  exports: [
    SimDepartamentoTable,
    SimDepartamentoDialog
  ]
})
export class SimDepartamentoModule { }
