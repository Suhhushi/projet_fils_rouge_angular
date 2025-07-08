import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  course: Course = { nom: '', description: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.courseService.getCourse(Number(id)).subscribe(
        course => this.course = course
      );
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.courseService.updateCourse(this.course.id!, this.course).subscribe(
        () => this.router.navigate(['/courses'])
      );
    } else {
      this.courseService.createCourse(this.course).subscribe(
        () => this.router.navigate(['/courses'])
      );
    }
  }
}
