import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourse(id).subscribe(
      course => this.course = course
    );
  }
}
