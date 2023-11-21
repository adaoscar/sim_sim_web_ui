import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimVulnerabilidadOcupacionTable } from './sim.vulnerabilidadocupacion.table';

const routes: Routes = [
    {
        path: '',
        component: SimVulnerabilidadOcupacionTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimVulnerabilidadOcupacionRoutingModule { }
