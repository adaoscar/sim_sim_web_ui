import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimTipoDocumentoRoutingModule } from './sim.tipodocumento-routing.module';

import { SimTipoDocumentoTable } from './sim.tipodocumento.table';
import { SimTipoDocumentoDialog } from './sim.tipodocumento.dialog';


@NgModule({
  declarations: [
    SimTipoDocumentoTable,
    SimTipoDocumentoDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimTipoDocumentoRoutingModule
  ],
  entryComponents: [
    SimTipoDocumentoTable,
    SimTipoDocumentoDialog
  ],
  exports: [
    SimTipoDocumentoTable,
    SimTipoDocumentoDialog
  ]
})
export class SimTipoDocumentoModule { }
