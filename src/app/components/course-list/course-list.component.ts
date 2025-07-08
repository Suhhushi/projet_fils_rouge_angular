import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../services/course.service';
import { UserStateService } from '../../services/user-state.service';


@Component({
  selector: 'app-course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = []; 
  isAdmin: boolean = false;

  constructor(
    private courseService: CourseService,
    private userStateService: UserStateService
  ) {}

  ngOnInit() {
    this.loadCourses();
    this.isAdmin = this.userStateService.getAdminStatus();
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

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomRating(): number {
    // Returns a random rating between 3 and 5 (inclusive, with one decimal)
    return Math.round((Math.random() * 2 + 3) * 10) / 10;
  }
}
