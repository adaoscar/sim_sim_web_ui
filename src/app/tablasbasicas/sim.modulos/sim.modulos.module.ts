import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimModulosRoutingModule } from './sim.modulos-routing.module';

import { SimModulosTable } from './sim.modulos.table';
import { SimModulosDialog } from './sim.modulos.dialog';


@NgModule({
  declarations: [
    SimModulosTable,
    SimModulosDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimModulosRoutingModule
  ],
  entryComponents: [
    SimModulosTable,
    SimModulosDialog
  ],
  exports: [
    SimModulosTable,
    SimModulosDialog
  ]
})
export class SimModulosModule { }
