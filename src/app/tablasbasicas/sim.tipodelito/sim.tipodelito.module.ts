import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimTipoDelitoRoutingModule } from './sim.tipodelito-routing.module';

import { SimTipoDelitoTable } from './sim.tipodelito.table';
import { SimTipoDelitoDialog } from './sim.tipodelito.dialog';


@NgModule({
  declarations: [
    SimTipoDelitoTable,
    SimTipoDelitoDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimTipoDelitoRoutingModule
  ],
  entryComponents: [
    SimTipoDelitoTable,
    SimTipoDelitoDialog
  ],
  exports: [
    SimTipoDelitoTable,
    SimTipoDelitoDialog
  ]
})
export class SimTipoDelitoModule { }
