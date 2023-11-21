import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimEstadoDocumentoTable } from './sim.estadodocumento.table';

const routes: Routes = [
    {
        path: '',
        component: SimEstadoDocumentoTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimEstadoDocumentoRoutingModule { }
