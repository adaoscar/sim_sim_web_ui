import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimMotivosFinalizacionTramiteRoutingModule } from './sim.motivosfinalizaciontramite-routing.module';

import { SimMotivosFinalizacionTramiteTable } from './sim.motivosfinalizaciontramite.table';
import { SimMotivosFinalizacionTramiteDialog } from './sim.motivosfinalizaciontramite.dialog';


@NgModule({
  declarations: [
    SimMotivosFinalizacionTramiteTable,
    SimMotivosFinalizacionTramiteDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimMotivosFinalizacionTramiteRoutingModule
  ],
  entryComponents: [
    SimMotivosFinalizacionTramiteTable,
    SimMotivosFinalizacionTramiteDialog
  ],
  exports: [
    SimMotivosFinalizacionTramiteTable,
    SimMotivosFinalizacionTramiteDialog
  ]
})
export class SimMotivosFinalizacionTramiteModule { }
