import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimModulosTable } from './sim.modulos.table';

const routes: Routes = [
    {
        path: '',
        component: SimModulosTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimModulosRoutingModule { }
