import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimPaisRoutingModule } from './sim.pais-routing.module';

import { SimPaisTable } from './sim.pais.table';
import { SimPaisDialog } from './sim.pais.dialog';


@NgModule({
  declarations: [
    SimPaisTable,
    SimPaisDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimPaisRoutingModule
  ],
  entryComponents: [
    SimPaisTable,
    SimPaisDialog
  ],
  exports: [
    SimPaisTable,
    SimPaisDialog
  ]
})
export class SimPaisModule { }
