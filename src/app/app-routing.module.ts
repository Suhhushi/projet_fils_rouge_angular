import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CourseListComponent },
  { path: 'course/new', component: CourseFormComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'course/:id/edit', component: CourseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
