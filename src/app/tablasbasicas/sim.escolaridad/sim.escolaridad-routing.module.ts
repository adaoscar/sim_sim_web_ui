import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimEscolaridadTable } from './sim.escolaridad.table';

const routes: Routes = [
    {
        path: '',
        component: SimEscolaridadTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimEscolaridadRoutingModule { }
