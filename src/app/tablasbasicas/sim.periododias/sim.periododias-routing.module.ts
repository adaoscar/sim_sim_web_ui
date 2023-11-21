import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimPeriodoDiasTable } from './sim.periododias.table';

const routes: Routes = [
    {
        path: '',
        component: SimPeriodoDiasTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimPeriodoDiasRoutingModule { }
