import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimTipoDecisionRoutingModule } from './sim.tipodecision-routing.module';

import { SimTipoDecisionTable } from './sim.tipodecision.table';
import { SimTipoDecisionDialog } from './sim.tipodecision.dialog';


@NgModule({
  declarations: [
    SimTipoDecisionTable,
    SimTipoDecisionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimTipoDecisionRoutingModule
  ],
  entryComponents: [
    SimTipoDecisionTable,
    SimTipoDecisionDialog
  ],
  exports: [
    SimTipoDecisionTable,
    SimTipoDecisionDialog
  ]
})
export class SimTipoDecisionModule { }
