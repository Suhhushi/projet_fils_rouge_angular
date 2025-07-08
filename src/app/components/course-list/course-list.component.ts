import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses
    );
  }

  deleteCourse(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.courseService.deleteCourse(id).subscribe(
        () => this.loadCourses()
      );
    }
  }
}
