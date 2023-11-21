import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimMotivoNoViabilidadTable } from './sim.motivonoviabilidad.table';

const routes: Routes = [
    {
        path: '',
        component: SimMotivoNoViabilidadTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimMotivoNoViabilidadRoutingModule { }
