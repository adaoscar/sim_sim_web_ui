import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimPertenenciaEtnicaTable } from './sim.pertenenciaetnica.table';

const routes: Routes = [
    {
        path: '',
        component: SimPertenenciaEtnicaTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimPertenenciaEtnicaRoutingModule { }
