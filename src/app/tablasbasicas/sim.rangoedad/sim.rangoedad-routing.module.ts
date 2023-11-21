import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimRangoEdadTable } from './sim.rangoedad.table';

const routes: Routes = [
    {
        path: '',
        component: SimRangoEdadTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimRangoEdadRoutingModule { }
