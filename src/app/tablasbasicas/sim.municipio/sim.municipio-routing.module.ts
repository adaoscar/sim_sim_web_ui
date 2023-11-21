import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimMunicipioTable } from './sim.municipio.table';

const routes: Routes = [
    {
        path: '',
        component: SimMunicipioTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimMunicipioRoutingModule { }
