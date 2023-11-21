import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimMotivoNoViabilidadRoutingModule } from './sim.motivonoviabilidad-routing.module';

import { SimMotivoNoViabilidadTable } from './sim.motivonoviabilidad.table';
import { SimMotivoNoViabilidadDialog } from './sim.motivonoviabilidad.dialog';


@NgModule({
  declarations: [
    SimMotivoNoViabilidadTable,
    SimMotivoNoViabilidadDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimMotivoNoViabilidadRoutingModule
  ],
  entryComponents: [
    SimMotivoNoViabilidadTable,
    SimMotivoNoViabilidadDialog
  ],
  exports: [
    SimMotivoNoViabilidadTable,
    SimMotivoNoViabilidadDialog
  ]
})
export class SimMotivoNoViabilidadModule { }
