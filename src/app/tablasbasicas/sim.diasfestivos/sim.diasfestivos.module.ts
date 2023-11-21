import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimDiasFestivosRoutingModule } from './sim.diasfestivos-routing.module';

import { SimDiasFestivosTable } from './sim.diasfestivos.table';
import { SimDiasFestivosDialog } from './sim.diasfestivos.dialog';


@NgModule({
  declarations: [
    SimDiasFestivosTable,
    SimDiasFestivosDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimDiasFestivosRoutingModule
  ],
  entryComponents: [
    SimDiasFestivosTable,
    SimDiasFestivosDialog
  ],
  exports: [
    SimDiasFestivosTable,
    SimDiasFestivosDialog
  ]
})
export class SimDiasFestivosModule { }
