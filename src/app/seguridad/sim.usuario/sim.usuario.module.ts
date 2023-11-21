import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimUsuarioRoutingModule } from './sim.usuario-routing.module';

import { SimUsuarioTable } from './sim.usuario.table';
import { SimUsuarioDialog } from './sim.usuario.dialog';


@NgModule({
  declarations: [
    SimUsuarioTable,
    SimUsuarioDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimUsuarioRoutingModule
  ],
  entryComponents: [
    SimUsuarioTable,
    SimUsuarioDialog
  ],
  exports: [
    SimUsuarioTable,
    SimUsuarioDialog
  ]
})
export class SimUsuarioModule { }
