import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimGeneroTable } from './sim.genero.table';

const routes: Routes = [
    {
        path: '',
        component: SimGeneroTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimGeneroRoutingModule { }
