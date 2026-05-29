import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.component.html',
//   styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  id: any = "0";
  t: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.t = this.findByID(this.id);
  }

  findByID(id: any): any {
    return TASKS.find(obj => obj.id == id);
  }
}