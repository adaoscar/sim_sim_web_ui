import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimDecisionTramiteTable } from './sim.decisiontramite.table';

const routes: Routes = [
    {
        path: '',
        component: SimDecisionTramiteTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimDecisionTramiteRoutingModule { }
