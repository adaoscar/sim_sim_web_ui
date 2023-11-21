import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimSexoRoutingModule } from './sim.sexo-routing.module';

import { SimSexoTable } from './sim.sexo.table';
import { SimSexoDialog } from './sim.sexo.dialog';


@NgModule({
  declarations: [
    SimSexoTable,
    SimSexoDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimSexoRoutingModule
  ],
  entryComponents: [
    SimSexoTable,
    SimSexoDialog
  ],
  exports: [
    SimSexoTable,
    SimSexoDialog
  ]
})
export class SimSexoModule { }
