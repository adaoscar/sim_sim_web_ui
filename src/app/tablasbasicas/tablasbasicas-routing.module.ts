import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'SIM_Ambito',
        loadChildren: () => import('./sim.ambito/sim.ambito.module').then(mod => mod.SimAmbitoModule)
    },
    {
        path: 'SIM_Aplicacion',
        loadChildren: () => import('./sim.aplicacion/sim.aplicacion.module').then(mod => mod.SimAplicacionModule)
    },
    {
        path: 'SIM_Departamento',
        loadChildren: () => import('./sim.departamento/sim.departamento.module').then(mod => mod.SimDepartamentoModule)
    },
    {
        path: 'SIM_EstadoAsignacion',
        loadChildren: () => import('./sim.estadoasignacion/sim.estadoasignacion.module').then(mod => mod.SimEstadoAsignacionModule)
    },
    {
        path: 'SIM_Genero',
        loadChildren: () => import('./sim.genero/sim.genero.module').then(mod => mod.SimGeneroModule)
    },
    {
        path: 'SIM_MedioComunicacion',
        loadChildren: () => import('./sim.mediocomunicacion/sim.mediocomunicacion.module').then(mod => mod.SimMedioComunicacionModule)
    },
    {
        path: 'SIM_MotivoNoViabilidad',
        loadChildren: () => import('./sim.motivonoviabilidad/sim.motivonoviabilidad.module').then(mod => mod.SimMotivoNoViabilidadModule)
    },
    {
        path: 'SIM_MotivosFinalizacionTramite',
        loadChildren: () => import('./sim.motivosfinalizaciontramite/sim.motivosfinalizaciontramite.module').then(mod => mod.SimMotivosFinalizacionTramiteModule)
    },
    {
        path: 'SIM_Municipio',
        loadChildren: () => import('./sim.municipio/sim.municipio.module').then(mod => mod.SimMunicipioModule)
    },
    {
        path: 'SIM_Ocupacion',
        loadChildren: () => import('./sim.ocupacion/sim.ocupacion.module').then(mod => mod.SimOcupacionModule)
    },
    {
        path: 'SIM_OrientacionSexual',
        loadChildren: () => import('./sim.orientacionsexual/sim.orientacionsexual.module').then(mod => mod.SimOrientacionSexualModule)
    },
    {
        path: 'SIM_Pais',
        loadChildren: () => import('./sim.pais/sim.pais.module').then(mod => mod.SimPaisModule)
    },
    {
        path: 'SIM_PeriodoDias',
        loadChildren: () => import('./sim.periododias/sim.periododias.module').then(mod => mod.SimPeriodoDiasModule)
    },
    {
        path: 'SIM_PertenenciaEtnica',
        loadChildren: () => import('./sim.pertenenciaetnica/sim.pertenenciaetnica.module').then(mod => mod.SimPertenenciaEtnicaModule)
    },
    {
        path: 'SIM_RangoEdad',
        loadChildren: () => import('./sim.rangoedad/sim.rangoedad.module').then(mod => mod.SimRangoEdadModule)
    },
    {
        path: 'SIM_Sexo',
        loadChildren: () => import('./sim.sexo/sim.sexo.module').then(mod => mod.SimSexoModule)
    },
    {
        path: 'SIM_TipoDecision',
        loadChildren: () => import('./sim.tipodecision/sim.tipodecision.module').then(mod => mod.SimTipoDecisionModule)
    },
    {
        path: 'SIM_TipoDelito',
        loadChildren: () => import('./sim.tipodelito/sim.tipodelito.module').then(mod => mod.SimTipoDelitoModule)
    },
    {
        path: 'SIM_TipoDocumento',
        loadChildren: () => import('./sim.tipodocumento/sim.tipodocumento.module').then(mod => mod.SimTipoDocumentoModule)
    },
    {
        path: 'SIM_Vigencia',
        loadChildren: () => import('./sim.vigencia/sim.vigencia.module').then(mod => mod.SimVigenciaModule)
    },
    {
        path: 'SIM_VulnerabilidadOcupacion',
        loadChildren: () => import('./sim.vulnerabilidadocupacion/sim.vulnerabilidadocupacion.module').then(mod => mod.SimVulnerabilidadOcupacionModule)
    },
    {
        path: 'SIM_Escolaridad',
        loadChildren: () => import('./sim.escolaridad/sim.escolaridad.module').then(mod => mod.SimEscolaridadModule)
    },
    {
        path: 'SIM_DecisionTramite',
        loadChildren: () => import('./sim.decisiontramite/sim.decisiontramite.module').then(mod => mod.SimDecisionTramiteModule)
    },
    {
        path: 'SIM_Modulos',
        loadChildren: () => import('./sim.modulos/sim.modulos.module').then(mod => mod.SimModulosModule)
    },
    {
        path: 'SIM_CondicionesVunerabilidad',
        loadChildren: () => import('./sim.condicionesvunerabilidad/sim.condicionesvunerabilidad.module').then(mod => mod.SimCondicionesVunerabilidadModule)
    },
    {
        path: 'SIM_EstadoDocumento',
        loadChildren: () => import('./sim.estadodocumento/sim.estadodocumento.module').then(mod => mod.SimEstadoDocumentoModule)
    },
    {
        path: 'SIM_TipoSesion',
        loadChildren: () => import('./sim.tiposesion/sim.tiposesion.module').then(mod => mod.SimTipoSesionModule)
    },
    {
        path: 'SIM_DiasFestivos',
        loadChildren: () => import('./sim.diasfestivos/sim.diasfestivos.module').then(mod => mod.SimDiasFestivosModule)
    },
    {
        path: '',
        children: [
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablasBasicasRoutingModule { }
