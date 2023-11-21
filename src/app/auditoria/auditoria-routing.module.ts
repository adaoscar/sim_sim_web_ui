import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'SIM_ConsultarAuditoria',
        loadChildren: () => import('./sim.consultarauditoria/sim.consultarauditoria.module').then(mod => mod.SimConsultarAuditoriaModule)
    },
    {
        path: 'SIM_EliminarAuditoria',
        loadChildren: () => import('./sim.consultarauditoria/sim.consultarauditoria.module').then(mod => mod.SimConsultarAuditoriaModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuditoriaRoutingModule { }
