import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimMunicipioRoutingModule } from './sim.municipio-routing.module';

import { SimMunicipioTable } from './sim.municipio.table';
import { SimMunicipioDialog } from './sim.municipio.dialog';


@NgModule({
  declarations: [
    SimMunicipioTable,
    SimMunicipioDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimMunicipioRoutingModule
  ],
  entryComponents: [
    SimMunicipioTable,
    SimMunicipioDialog
  ],
  exports: [
    SimMunicipioTable,
    SimMunicipioDialog
  ]
})
export class SimMunicipioModule { }
