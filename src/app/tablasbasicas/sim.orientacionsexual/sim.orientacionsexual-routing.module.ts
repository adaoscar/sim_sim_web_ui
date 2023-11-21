import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimOrientacionSexualTable } from './sim.orientacionsexual.table';

const routes: Routes = [
    {
        path: '',
        component: SimOrientacionSexualTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimOrientacionSexualRoutingModule { }
