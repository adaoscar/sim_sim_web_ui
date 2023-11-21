import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimVigenciaRoutingModule } from './sim.vigencia-routing.module';

import { SimVigenciaTable } from './sim.vigencia.table';
import { SimVigenciaDialog } from './sim.vigencia.dialog';


@NgModule({
  declarations: [
    SimVigenciaTable,
    SimVigenciaDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimVigenciaRoutingModule
  ],
  entryComponents: [
    SimVigenciaTable,
    SimVigenciaDialog
  ],
  exports: [
    SimVigenciaTable,
    SimVigenciaDialog
  ]
})
export class SimVigenciaModule { }
