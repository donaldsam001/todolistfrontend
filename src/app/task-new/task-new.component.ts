import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../data';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-new.component.html',
  // styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {
  newForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Xóa bỏ trường deadline vì API server không quản lý thuộc tính này
    this.newForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  onSubmit() {
    // Khởi tạo thực thể Object gửi lên server theo đúng cấu trúc Interface Task
    let task = {
      // id: 0,
      title: this.newForm.value.title ?? "",
      content: this.newForm.value.content ?? "",
      status: 0 // Mặc định trạng thái ban đầu là Chưa làm
    };

    this.dataService.addTask(task).subscribe(response => {
      let code = response.status;
      console.log("status code: " + code);
      if (code == 201) { // Mã phản hồi 201 Created thành công từ Spring Boot
        this.router.navigate(['/list']); // Chuyển hướng màn hình quay lại trang danh sách
      }
    });
  }
} 