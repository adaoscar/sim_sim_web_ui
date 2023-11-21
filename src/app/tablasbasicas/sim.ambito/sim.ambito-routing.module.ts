import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimAmbitoTable } from './sim.ambito.table';

const routes: Routes = [
    {
        path: '',
        component: SimAmbitoTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimAmbitoRoutingModule { }
