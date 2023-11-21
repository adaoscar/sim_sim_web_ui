import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimVulnerabilidadOcupacionRoutingModule } from './sim.vulnerabilidadocupacion-routing.module';

import { SimVulnerabilidadOcupacionTable } from './sim.vulnerabilidadocupacion.table';
import { SimVulnerabilidadOcupacionDialog } from './sim.vulnerabilidadocupacion.dialog';


@NgModule({
  declarations: [
    SimVulnerabilidadOcupacionTable,
    SimVulnerabilidadOcupacionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimVulnerabilidadOcupacionRoutingModule
  ],
  entryComponents: [
    SimVulnerabilidadOcupacionTable,
    SimVulnerabilidadOcupacionDialog
  ],
  exports: [
    SimVulnerabilidadOcupacionTable,
    SimVulnerabilidadOcupacionDialog
  ]
})
export class SimVulnerabilidadOcupacionModule { }
