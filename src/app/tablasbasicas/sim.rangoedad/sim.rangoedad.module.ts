import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimRangoEdadRoutingModule } from './sim.rangoedad-routing.module';

import { SimRangoEdadTable } from './sim.rangoedad.table';
import { SimRangoEdadDialog } from './sim.rangoedad.dialog';


@NgModule({
  declarations: [
    SimRangoEdadTable,
    SimRangoEdadDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimRangoEdadRoutingModule
  ],
  entryComponents: [
    SimRangoEdadTable,
    SimRangoEdadDialog
  ],
  exports: [
    SimRangoEdadTable,
    SimRangoEdadDialog
  ]
})
export class SimRangoEdadModule { }
