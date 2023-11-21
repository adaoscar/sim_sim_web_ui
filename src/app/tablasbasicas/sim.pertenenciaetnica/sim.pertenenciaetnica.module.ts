import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimPertenenciaEtnicaRoutingModule } from './sim.pertenenciaetnica-routing.module';

import { SimPertenenciaEtnicaTable } from './sim.pertenenciaetnica.table';
import { SimPertenenciaEtnicaDialog } from './sim.pertenenciaetnica.dialog';


@NgModule({
  declarations: [
    SimPertenenciaEtnicaTable,
    SimPertenenciaEtnicaDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimPertenenciaEtnicaRoutingModule
  ],
  entryComponents: [
    SimPertenenciaEtnicaTable,
    SimPertenenciaEtnicaDialog
  ],
  exports: [
    SimPertenenciaEtnicaTable,
    SimPertenenciaEtnicaDialog
  ]
})
export class SimPertenenciaEtnicaModule { }
