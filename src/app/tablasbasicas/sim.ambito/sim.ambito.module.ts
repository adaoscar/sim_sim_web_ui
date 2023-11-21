import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimAmbitoRoutingModule } from './sim.ambito-routing.module';

import { SimAmbitoTable } from './sim.ambito.table';
import { SimAmbitoDialog } from './sim.ambito.dialog';


@NgModule({
  declarations: [
    SimAmbitoTable,
    SimAmbitoDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimAmbitoRoutingModule
  ],
  entryComponents: [
    SimAmbitoTable,
    SimAmbitoDialog
  ],
  exports: [
    SimAmbitoTable,
    SimAmbitoDialog
  ]
})
export class SimAmbitoModule { }
