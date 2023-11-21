import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

import { environment } from 'src/environments/environment';
import { AlertaComponent } from '../shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from './login.dialog';
import { LOGIN_RecuperarClave_Dialog } from './login.recuperarclave/login.recuperarclave.dialog';
import { AuthenticationService } from '../_helpers/authentication.service';
import { JwtDecodeTokenService } from '../../app/modulos/jwtdecodetoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./assets/css/font-awesome.min.css', './assets/css/bootstrap.min.css',
    './assets/css/supersized.css',
    './assets/css/mj-style.css', './assets/css/media-queries.css', 'login.component.scss'
  ]

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  estaLogueado = false;
  inputType = 'password';
  noValido = false;
  logo: string;
  alt: string;
  version = environment.VERSION;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private jwtDecodeTokenService: JwtDecodeTokenService,
              private authenticationService: AuthenticationService) {
                
    this.logo = 'SIM';
    if (this.loginService.ValorUsuarioLogueado) {
      window.location.href = environment.urls[this.route.snapshot.paramMap.get('app')];
    };

    if (this.router.url.startsWith('/RecuperarClave')) {
      this.logo = 'SIM';
      this.recuperarClave();
    };
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      mostrarContrasena: [''],
      aceptoTerminos: ['']
    });
    document.body.style.zoom = "90%"
  }

  get f() { return this.loginForm.controls; }

  onMostrarContrasena() {
    if (this.f.mostrarContrasena.value == false) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    };
  }

  onCancelar() {
    sessionStorage.setItem("yaInicio", "false");
    sessionStorage.setItem("estaLogueado", "false");
    sessionStorage.setItem("token", "false");
    window.location.href = `${environment.urls.SIM}`;
  }

  onSubmit() {
    if (this.loginForm.valid) {      
      this.loading = true;

      this.loginService.login(this.f.usuario.value, this.f.contrasena.value).subscribe((data) => {
        this.estaLogueado = !!data.Value;
        
        if (this.estaLogueado) {
            let user = { token: data.Value };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.authenticationService.setCurrentUser();
            this.validarPermisos();
            
        } else {
          this.loading = false;
          this.openNotification('Error Ingreso', data.error.Error);
        };

      });
    };
  }

  validarPermisos() {
      this.jwtDecodeTokenService.getPermisos().subscribe(data => {
          this.loading = false;
          if (data.length > 0) {
            this.router.navigateByUrl('/SIM');
          } else {
            localStorage.clear();
            sessionStorage.clear();
            this.openNotification('Error', 'El usuario no tiene funcionalidades asignadas');
          };
      })
  }

  solicitudRecuperarClave() {
    this.dialog.open(LoginDialog);
  }

  recuperarClave() {
    const dialogRef = this.dialog.open(LOGIN_RecuperarClave_Dialog);

    dialogRef.afterClosed().subscribe(() => {
      window.location.href = `${environment.urls.SIM}`;
    });
  }

  openNotification(pTitulo: string, pMensaje: string, pTipo = 'error') {
    this.dialog.open(AlertaComponent, {
      data: {
        tipo: pTipo,
        titulo: pTitulo,
        mensaje: pMensaje,
      }
    });
  }

  openNotificationDanger(message: string, action?: string) {
    this.snackBar.open(message, action, {
        duration: 2000,
        panelClass: 'dangerSnackBar',
    });
  }

  getLogo() {
    switch (this.logo) {
        case 'SICEQ': return { logo: '/assets/images/logos-sistemas/logo-siceq-minjusticia-inicio.png', alt: 'SICEQ - Sistema de Información de la Conciliación en Equidad' };
        case 'CDJ': return { logo: '/assets/images/logos-sistemas/logo-casas-de-justicia-minjusticia.png', alt: 'Casas de Justicia' };
        case 'SICAAC': return { logo: '/assets/images/logos-sistemas/logo-sicaac-minjustica.png', alt: 'SICAAC - Sistema de Información de la Conciliación, el Arbitraje y la Amigable Conciliación' };
        case 'GCDI': return { logo: '/assets/images/logos-sistemas/logo-control-disciplinario-minjusticia.png', alt: 'Control Disciplinario' };
        case 'PCR': return { logo: '/assets/images/logos-sistemas/logo-politica-criminal-minjusticia.png', alt: 'Política Criminal' };
        case 'DAI': return { logo: '/assets/images/logos-sistemas/logo-asuntos-internacionales-minjusticia.png', alt: 'Asuntos Internacionales' };
        case 'SIM': return { logo: '/assets/images/logo-sim.png', alt: 'Asuntos Disciplinarios' };
    };
  }
}
