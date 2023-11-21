import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimTipoDecisionTable } from './sim.tipodecision.table';

const routes: Routes = [
    {
        path: '',
        component: SimTipoDecisionTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimTipoDecisionRoutingModule { }
