import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimTipoSesionRoutingModule } from './sim.tiposesion-routing.module';

import { SimTipoSesionTable } from './sim.tiposesion.table';
import { SimTipoSesionDialog } from './sim.tiposesion.dialog';


@NgModule({
  declarations: [
    SimTipoSesionTable,
    SimTipoSesionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimTipoSesionRoutingModule
  ],
  entryComponents: [
    SimTipoSesionTable,
    SimTipoSesionDialog
  ],
  exports: [
    SimTipoSesionTable,
    SimTipoSesionDialog
  ]
})
export class SimTipoSesionModule { }
