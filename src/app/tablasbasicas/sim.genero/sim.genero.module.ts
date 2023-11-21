import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimGeneroRoutingModule } from './sim.genero-routing.module';

import { SimGeneroTable } from './sim.genero.table';
import { SimGeneroDialog } from './sim.genero.dialog';


@NgModule({
  declarations: [
    SimGeneroTable,
    SimGeneroDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimGeneroRoutingModule
  ],
  entryComponents: [
    SimGeneroTable,
    SimGeneroDialog
  ],
  exports: [
    SimGeneroTable,
    SimGeneroDialog
  ]
})
export class SimGeneroModule { }
