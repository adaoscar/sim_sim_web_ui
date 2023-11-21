import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimMedioComunicacionRoutingModule } from './sim.mediocomunicacion-routing.module';

import { SimMedioComunicacionTable } from './sim.mediocomunicacion.table';
import { SimMedioComunicacionDialog } from './sim.mediocomunicacion.dialog';


@NgModule({
  declarations: [
    SimMedioComunicacionTable,
    SimMedioComunicacionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimMedioComunicacionRoutingModule
  ],
  entryComponents: [
    SimMedioComunicacionTable,
    SimMedioComunicacionDialog
  ],
  exports: [
    SimMedioComunicacionTable,
    SimMedioComunicacionDialog
  ]
})
export class SimMedioComunicacionModule { }
