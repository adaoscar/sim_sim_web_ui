import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { SimAplicacionRoutingModule } from './sim.aplicacion-routing.module';

import { SimAplicacionTable } from './sim.aplicacion.table';
import { SimAplicacionDialog } from './sim.aplicacion.dialog';


@NgModule({
  declarations: [
    SimAplicacionTable,
    SimAplicacionDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SimAplicacionRoutingModule
  ],
  entryComponents: [
    SimAplicacionTable,
    SimAplicacionDialog
  ],
  exports: [
    SimAplicacionTable,
    SimAplicacionDialog
  ]
})
export class SimAplicacionModule { }
