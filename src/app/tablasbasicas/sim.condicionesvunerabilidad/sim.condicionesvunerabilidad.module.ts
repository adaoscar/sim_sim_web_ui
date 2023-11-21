import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimCondicionesVunerabilidadRoutingModule } from './sim.condicionesvunerabilidad-routing.module';

import { SimCondicionesVunerabilidadTable } from './sim.condicionesvunerabilidad.table';
import { SimCondicionesVunerabilidadDialog } from './sim.condicionesvunerabilidad.dialog';


@NgModule({
  declarations: [
    SimCondicionesVunerabilidadTable,
    SimCondicionesVunerabilidadDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimCondicionesVunerabilidadRoutingModule
  ],
  entryComponents: [
    SimCondicionesVunerabilidadTable,
    SimCondicionesVunerabilidadDialog
  ],
  exports: [
    SimCondicionesVunerabilidadTable,
    SimCondicionesVunerabilidadDialog
  ]
})
export class SimCondicionesVunerabilidadModule { }
