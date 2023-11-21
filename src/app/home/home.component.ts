import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { LOGIN_CambioClave_Dialog } from '../login/login.cambioclave/login.cambioclave.dialog';
import { BusquedaComponent } from '../shared/busqueda/busqueda.dialog';
import { JwtDecodeTokenService } from '../modulos/jwtdecodetoken.service';
import { SeguridadService } from '../modulos/seguridad.service';
import { environment } from 'src/environments/environment';

declare var readOnly: boolean;
@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  opened: boolean = false;
  tipoLogoMenu: string = 'menu';

  usuario: any = {};
  rolUsuario: string = '';
  modulos: ModuloModel[] = [];
  grupos: GrupoModel[] = [];
  funcionalidades: FuncionalidadModel[] = [];
  
  get isInicio(): boolean {
    //Respuesta Mock
    var yaInicio = 'true';//sessionStorage.getItem("yaInicio");
    var _yaInicio = yaInicio != null && yaInicio == 'true';

    return _yaInicio;
  }

  get isLogin(): boolean {
    //Respuesta Mock
    var estaLogueado = 'true'; //sessionStorage.getItem("estaLogueado");
    var _isLogin = estaLogueado != null && estaLogueado == 'true';

    return _isLogin;
  }

  get isMenu(): boolean {
    let sIsMenu = sessionStorage.getItem("isMenu") || '';
    return sIsMenu === 'true';
  }

  modDescripcion: string = '';
  modNombre: string = '';
  modId: number = 0;
  grupoDescripcion: string = '';
  grupoNombre: string = '';
  grupoId: number = 0;
  funcDescripcion: string = '';
  funcNombre: string = '';
  moduloVista: GrupoModel;

  _flecha: boolean = false;
  _grupo: boolean = false;
  _vistaGeneral: boolean = true;
  _funcionalidad: boolean = false;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private jwtDecodeTokenService: JwtDecodeTokenService,
              private seguridadService: SeguridadService,
              private dialog: MatDialog,
              private router: Router) {

      jwtDecodeTokenService.getUsuario().subscribe(data => {
        this.usuario = data;
      })

      this.seguridadService.currentHome.subscribe(data => {
        if (data) {
          sessionStorage.setItem("isMenu", "false");
          this.setRutaNavbar();
        } else {
          this.onVolverMenu();
        };
      });

      this.seguridadService.setCurrentTimeInactive();
  }
  
  ngOnInit() {
    if (sessionStorage.getItem('isMenu')) {
      this.setRutaNavbar();
    } else {
      sessionStorage.setItem("isMenu", "true");
    };
    if (this.isLogin) { this.setModulos() };
  }

  setRutaNavbar() {
    this.modDescripcion = sessionStorage.getItem('modulo');
    this.grupoDescripcion = sessionStorage.getItem('grupo');
    this.funcDescripcion = sessionStorage.getItem('funcionalidad');
    if (this.funcDescripcion !== null) { window.document.title = `SIM - ${this.funcDescripcion}` };
  }

  setModulos() {
    this.jwtDecodeTokenService.getPermisos().subscribe((data: any[]) => {
      
        let roles: any[] = data[0].roles;
        let modulosFiltro: any[] = roles[0].modulos;
        this.rolUsuario = roles[0].nombre;

        for (let index = 1; index < roles.length; index++) {
          roles[index].modulos.forEach(mod => {
            let valModulo = modulosFiltro.find(reg => reg.nombre === mod.nombre);

            if (valModulo) {
              mod.funcionalidades.forEach(func => {
                let valFuncionalidad = valModulo.funcionalidades.find(reg => reg.descripcion === func.descripcion);

                if (!valFuncionalidad) {

                  modulosFiltro.forEach(modfiltro => {
                    if (modfiltro.nombre === mod.nombre) {
                      modfiltro.funcionalidades.push(func);
                    };
                  });

                };

              });

            } else {
              modulosFiltro.push(mod);
            };

          });
        };

        this.modulos = modulosFiltro;
    })
  }

  onVolverMenu() {
    sessionStorage.setItem("isMenu", "true");
    sessionStorage.removeItem("modulo");
    sessionStorage.removeItem("grupo");
    sessionStorage.removeItem("funcionalidad");
    window.document.title = 'SIM';
    this.tipoLogoMenu = 'menu';
    this.opened = false;
    this.grupos = [];
    this.funcionalidades = [];
    this.modDescripcion = '';
    this.modNombre = '';
    this.modId = 0;
    this.grupoDescripcion = '';
    this.grupoNombre = '';
    this.grupoId = 0;
    this.funcDescripcion = '';
    this.funcNombre = '';
    this.router.navigateByUrl('/SIM');
    this._vistaGeneral = true;
    this.setModulos();
  }

  onNavegacion(navegacion: any) {
    this.onSelectModulo(navegacion.modulo);
    this.onSelectGrupo(navegacion.grupo);
    this.onSelectFuncionalidad(navegacion.modulo, navegacion.grupo, navegacion.funcionalidad);
  }

  onCambiarIconoMenu() {
    if (this.tipoLogoMenu == 'more_vert') {
      this.tipoLogoMenu = 'menu';
      this.opened = false;
    } else {
      this.tipoLogoMenu = 'more_vert';
      this.opened = true;
    };
  }

  onVolverVista() {
    this._vistaGeneral = true;
    this.moduloVista = null;
  }

  onSelectModuloVista(modulo: ModuloModel) {
    this._vistaGeneral = false;
    this.moduloVista = modulo;
    this.onSelectModulo(modulo);  
  }

  onSelectModulo(modulo: ModuloModel) {
    this._funcionalidad = false;
    if (this.modId == modulo.id) {
      this._grupo = !this._grupo;
      this._flecha = false;
    } else {
      this.modNombre = modulo.nombre;
      this.modId = modulo.id;
      this.grupos = modulo.funcionalidades;
      this._grupo = true;
      this._flecha = true;
    };
  }

  onSelectGrupo(grupo: GrupoModel) {
    if (this.grupoId == grupo.id) {
      this._funcionalidad = !this._funcionalidad;
    } else {
      this.grupoNombre = grupo.nombre;
      this.grupoId = grupo.id;
      this.funcionalidades = grupo.funcionalidades;
      this._funcionalidad = true;
    };
  }

  onSelectFuncionalidad(modulo: ModuloModel, grupo: GrupoModel, funcionalidad: FuncionalidadModel) {
    if (grupo.nombre !== this.funcNombre) {
      this.grupoDescripcion = modulo.descripcion;
      this.modDescripcion = 'SIM';
      this.funcNombre = grupo.nombre;
      this.funcDescripcion = grupo.descripcion;
      window.document.title = `SIM - ${grupo.descripcion}`;
      this.router.navigateByUrl(`SIM/${modulo.nombre}/${grupo.nombre}`);
      sessionStorage.setItem('isMenu', 'false');
      sessionStorage.setItem('modulo', 'SIM');
      sessionStorage.setItem('grupo', modulo.descripcion);
      sessionStorage.setItem('funcionalidad', grupo.descripcion);
    };
  }

  onBusqueda() {
    const dialogRef = this.dialog.open(BusquedaComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSelectFuncionalidad(result.data.grupo, result.data, null);
      };
    });
  }

  onCambiarClave() {
    this.dialog.open(LOGIN_CambioClave_Dialog);
  }

  onCerrarSesion() {
    console.log('logged out');
    sessionStorage.clear();
    localStorage.clear();
    this.opened = false;
    this.tipoLogoMenu = 'menu';
    window.location.href = `${environment.urls.SIM}`;
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.blockUI.start();
      if (event.url == '/') { sessionStorage.setItem("isMenu", "true"); }
    }
    if (event instanceof NavigationEnd) { this.blockUI.stop(); }
    if (event instanceof NavigationCancel) { this.blockUI.stop(); }
    if (event instanceof NavigationError) { this.blockUI.stop(); }
  }

  getIcon(nombre: string) {
    switch (nombre) {
      case 'TablasBasicas': return 'view_list';
      case 'Auditoria': return 'schedule';
      case 'Reportes': return 'description';
      case 'Procesos': return 'label';
      case 'Seguridad': return 'lock';
    };
  }
}

class ModuloModel {
  id: number;
  codigo: number;
  nombre: string;
  descripcion: string;
  check: boolean;
  funcionalidades: any[];
}

class GrupoModel {
  id: number;
  codigo: number;
  nombre: string;
  descripcion: string;
  check: boolean;
  funcionalidades: any[];
}

class FuncionalidadModel {
  id: number;
  codigo: number;
  nombre: string;
  descripcion: string;
  check: boolean;
}
