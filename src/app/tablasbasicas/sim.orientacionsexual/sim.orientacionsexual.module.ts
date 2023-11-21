import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimOrientacionSexualRoutingModule } from './sim.orientacionsexual-routing.module';

import { SimOrientacionSexualTable } from './sim.orientacionsexual.table';
import { SimOrientacionSexualDialog } from './sim.orientacionsexual.dialog';


@NgModule({
  declarations: [
    SimOrientacionSexualTable,
    SimOrientacionSexualDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimOrientacionSexualRoutingModule
  ],
  entryComponents: [
    SimOrientacionSexualTable,
    SimOrientacionSexualDialog
  ],
  exports: [
    SimOrientacionSexualTable,
    SimOrientacionSexualDialog
  ]
})
export class SimOrientacionSexualModule { }
