import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimPaisTable } from './sim.pais.table';

const routes: Routes = [
    {
        path: '',
        component: SimPaisTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimPaisRoutingModule { }
