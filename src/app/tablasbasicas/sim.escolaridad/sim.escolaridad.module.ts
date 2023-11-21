import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimEscolaridadRoutingModule } from './sim.escolaridad-routing.module';

import { SimEscolaridadTable } from './sim.escolaridad.table';
import { SimEscolaridadDialog } from './sim.escolaridad.dialog';


@NgModule({
  declarations: [
    SimEscolaridadTable,
    SimEscolaridadDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimEscolaridadRoutingModule
  ],
  entryComponents: [
    SimEscolaridadTable,
    SimEscolaridadDialog
  ],
  exports: [
    SimEscolaridadTable,
    SimEscolaridadDialog
  ]
})
export class SimEscolaridadModule { }
