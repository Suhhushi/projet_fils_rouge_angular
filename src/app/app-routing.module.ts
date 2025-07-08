import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { 
    path: 'courses', 
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'course/new', 
    component: CourseFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'course/:id', 
    component: CourseDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'course/:id/edit', 
    component: CourseFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
