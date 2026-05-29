import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Thêm FormGroup
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-new.component.html',
//   styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {
  newForm: FormGroup; // 1. Khai báo kiểu FormGroup

  constructor(private fb: FormBuilder) { 
    // 2. Khởi tạo giá trị bên trong constructor
    this.newForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  ngOnInit() { }

  onSubmit() {
    console.log(this.newForm.value);
  }
}