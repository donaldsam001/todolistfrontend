import { Component, OnInit } from '@angular/core';
import { DataService, Task } from '../data'; // Import service mới thay thế mock dữ liệu
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  // styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayListTask(); // Gọi nạp dữ liệu khi component khởi tạo
  }

  displayListTask() {
    this.dataService.getTaskList().subscribe((data: Array<Task>) => {
      this.tasks = data;
    });
  }

  actionTask(task: any) {
    let code = 0;
    
    // Nếu trạng thái là Hoàn thành (2) -> Tiến hành XÓA công việc khỏi cơ sở dữ liệu
    if (task.status == 2) {
      console.log("delete id:", task.id);
      this.dataService.deleteTask(task.id).subscribe(() => {
        this.displayListTask(); // Nạp lại danh sách mới sau khi xóa thành công
      });
    } else {
      // Chuyển đổi trạng thái tuần tự: 0 (Chưa làm) -> 1 (Đang làm) -> 2 (Hoàn thành)
      if (task.status == 0) {
        task.status = 1;
      } else if (task.status == 1) {
        task.status = 2;
      }

      this.dataService.updateTask(task).subscribe({
        next: () => {
          this.displayListTask(); // Cập nhật lại giao diện hiển thị danh sách
        },
        error: (error) => {
          code = error.status;
          console.log("status code: " + code);
          if (code == 303) {
            this.displayListTask();
          }
        }
      });
    }
  }
}