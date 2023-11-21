import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimEstadoAsignacionRoutingModule } from './sim.estadoasignacion-routing.module';

import { SimEstadoAsignacionTable } from './sim.estadoasignacion.table';
import { SimEstadoAsignacionDialog } from './sim.estadoasignacion.dialog';


@NgModule({
  declarations: [
    SimEstadoAsignacionTable,
    SimEstadoAsignacionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimEstadoAsignacionRoutingModule
  ],
  entryComponents: [
    SimEstadoAsignacionTable,
    SimEstadoAsignacionDialog
  ],
  exports: [
    SimEstadoAsignacionTable,
    SimEstadoAsignacionDialog
  ]
})
export class SimEstadoAsignacionModule { }
