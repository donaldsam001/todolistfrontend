import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService, Task } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.component.html',
  // styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  id = 0;
  t: any; // Biến giữ thông tin chi tiết của công việc đang được chọn
  message: string = "";

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Trích xuất ID từ tham số định tuyến của URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Đăng ký lấy danh sách dữ liệu thực tế từ API server để thực hiện lọc tìm kiếm
    this.dataService.getTaskList().subscribe((data: Array<Task>) => {
      this.t = data.find(obj => obj.id === this.id);
    });
  }

  deleteTask() {
    this.dataService.deleteTask(this.t.id).subscribe(() => {
      this.router.navigate(['/list']); // Chuyển hướng người dùng về trang danh sách sau khi xóa
    });
  }

  actionTask() {
    let code = 0;
    if (this.t.status == 0) this.t.status = 1;
    else if (this.t.status == 1) this.t.status = 2;

    this.dataService.updateTask(this.t).subscribe({
      next: () => {
        this.message = "Cập nhật công việc thành công";
      },
      error: (error) => {
        code = error.status;
        console.log("status code: " + code);
        if (code == 303) {
          this.message = "Cập nhật công việc thành công";
        }
      }
    });
  }
}