import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';

import { FormDetailComponent } from './form-detail/form-detail.component';

import { CgDetailComponent } from './form-detail/cg-detail/cg-detail.component';

import { UserRole } from './shared/auth.roles';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },{
    path: 'forms/:id',
    component: FormDetailComponent,
    
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
