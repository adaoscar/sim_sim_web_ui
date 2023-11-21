import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimRolRoutingModule } from './sim.rol-routing.module';

import { SimRolPermisoPestana } from './sim.rol.permisopestana';
import { SimRolComponent } from './sim.rol.component';
import { SimRolDialog } from './sim.rol.dialog';

@NgModule({
  declarations: [
    SimRolComponent,
    SimRolDialog,
    SimRolPermisoPestana
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimRolRoutingModule
  ],
  entryComponents: [
    SimRolComponent,
    SimRolDialog,
    SimRolPermisoPestana
  ],
  exports: [
    SimRolComponent,
    SimRolDialog,
    SimRolPermisoPestana
  ]
})
export class SimRolModule { }
