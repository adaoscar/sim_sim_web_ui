import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimDiasFestivosTable } from './sim.diasfestivos.table';

const routes: Routes = [
    {
        path: '',
        component: SimDiasFestivosTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimDiasFestivosRoutingModule { }
