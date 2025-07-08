// src/app/components/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  courses: Course[] = [];
  currentUser: any;

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses
    );
  }
}