import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';
import { UserStateService } from '../../services/user-state.service';


@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userStateService: UserStateService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourse(id).subscribe(
      course => this.course = course
    );
    this.isAdmin = this.userStateService.getAdminStatus();
  }

  getCurrentDate(): string {
  const today = new Date();
  return today.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
}
