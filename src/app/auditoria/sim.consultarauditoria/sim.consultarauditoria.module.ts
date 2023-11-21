import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimConsultarAuditoriaRoutingModule } from './sim.consultarauditoria-routing.module';

import { SimConsultarAuditoriaTable } from './sim.consultarauditoria.table';


@NgModule({
  declarations: [
    SimConsultarAuditoriaTable,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimConsultarAuditoriaRoutingModule
  ],
  entryComponents: [
    SimConsultarAuditoriaTable,
  ],
  exports: [
    SimConsultarAuditoriaTable,
  ]
})
export class SimConsultarAuditoriaModule { }
