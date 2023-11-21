import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimEstadoDocumentoRoutingModule } from './sim.estadodocumento-routing.module';

import { SimEstadoDocumentoTable } from './sim.estadodocumento.table';
import { SimEstadoDocumentoDialog } from './sim.estadodocumento.dialog';


@NgModule({
  declarations: [
    SimEstadoDocumentoTable,
    SimEstadoDocumentoDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimEstadoDocumentoRoutingModule
  ],
  entryComponents: [
    SimEstadoDocumentoTable,
    SimEstadoDocumentoDialog
  ],
  exports: [
    SimEstadoDocumentoTable,
    SimEstadoDocumentoDialog
  ]
})
export class SimEstadoDocumentoModule { }
