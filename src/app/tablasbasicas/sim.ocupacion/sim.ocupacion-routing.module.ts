import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimOcupacionTable } from './sim.ocupacion.table';

const routes: Routes = [
    {
        path: '',
        component: SimOcupacionTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimOcupacionRoutingModule { }
