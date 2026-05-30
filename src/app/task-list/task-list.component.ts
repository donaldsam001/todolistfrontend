import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // Import CommonModule để dùng *ngFor, *ngIf và RouterLink
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks = TASKS;
  constructor() {}
  ngOnInit() {}
}