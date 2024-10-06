import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'screenplash',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'screenplash',
    loadChildren: () => import('./pages/screenplash/screenplash.module').then( m => m.ScreenplashPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./pages/resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'loguear',
    loadChildren: () => import('./pages/loguear/loguear.module').then( m => m.LoguearPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./TipoUsers/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'detalle-admin',
    loadChildren: () => import('./TipoUsers/admin/detalle-admin/detalle-admin.module').then( m => m.DetalleAdminPageModule)
  },
  {
    path: 'pasajero-dashboard',
    loadChildren: () => import('./TipoUsers/pasajero/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'detalle-pasajero',
    loadChildren: () => import('./TipoUsers/pasajero/detalle-pasajero/detalle-pasajero.module').then( m => m.DetallePasajeroPageModule)
  },
  {
    path: 'conductor-dashboard',
    loadChildren: () => import('./TipoUsers/conductor/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'detalle-conductor',
    loadChildren: () => import('./TipoUsers/conductor/detalle-conductor/detalle-conductor.module').then( m => m.DetalleConductorPageModule)
  },
  {
    path: 'usuarios',
    children: [
      {
        path: '',
        loadChildren: () => import('./TipoUsers/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: ':email',
        loadChildren: () => import('./TipoUsers/admin/detalle-admin/detalle-admin.module').then( m => m.DetalleAdminPageModule)
      }
    ]
  },
  {
    path: 'conductor-billetera',
    loadChildren: () => import('./TipoUsers/conductor/menu/billetera/billetera.module').then( m => m.BilleteraPageModule)
  },
  {
    path: 'conductor-historial',
    loadChildren: () => import('./TipoUsers/conductor/menu/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'conductor-notificaciones',
    loadChildren: () => import('./TipoUsers/conductor/menu/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'conductor-ajustes',
    loadChildren: () => import('./TipoUsers/conductor/menu/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./TipoUsers/conductor/menu/qr/qr.module').then( m => m.QRPageModule)
  },
  {
    path: 'pasajero-perfil',
    loadChildren: () => import('./TipoUsers/pasajero/menu/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'buscar-viaje',
    loadChildren: () => import('./TipoUsers/pasajero/menu/buscar-viaje/buscar-viaje.module').then( m => m.BuscarViajePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
