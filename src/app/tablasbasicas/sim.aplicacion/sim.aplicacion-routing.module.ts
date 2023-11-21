import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimAplicacionTable } from './sim.aplicacion.table';

const routes: Routes = [
    {
        path: '',
        component: SimAplicacionTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimAplicacionRoutingModule { }
