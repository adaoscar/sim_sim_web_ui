import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimDecisionTramiteRoutingModule } from './sim.decisiontramite-routing.module';

import { SimDecisionTramiteTable } from './sim.decisiontramite.table';
import { SimDecisionTramiteDialog } from './sim.decisiontramite.dialog';


@NgModule({
  declarations: [
    SimDecisionTramiteTable,
    SimDecisionTramiteDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimDecisionTramiteRoutingModule
  ],
  entryComponents: [
    SimDecisionTramiteTable,
    SimDecisionTramiteDialog
  ],
  exports: [
    SimDecisionTramiteTable,
    SimDecisionTramiteDialog
  ]
})
export class SimDecisionTramiteModule { }
