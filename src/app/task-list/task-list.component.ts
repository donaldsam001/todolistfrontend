import { Component, OnInit, signal } from '@angular/core'; // 1. Import signal ở đây
import { DataService, Task } from '../data'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  
  // 2. Khởi tạo một signal chứa danh sách các Task, mặc định là mảng rỗng
  tasks = signal<Array<Task>>([]);

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayListTask(); 
  }

  displayListTask() {
    this.dataService.getTaskList().subscribe((data: Array<Task>) => {
      // 3. Sử dụng phương thức .set() để cập nhật giá trị cho signal
      this.tasks.set(data);
    });
  }

  actionTask(task: any) {
    let code = 0;
    
    if (task.status == 2) {
      console.log("delete id:", task.id);
      this.dataService.deleteTask(task.id).subscribe(() => {
        this.displayListTask(); 
      });
    } else {
      if (task.status == 0) {
        task.status = 1;
      } else if (task.status == 1) {
        task.status = 2;
      }

      this.dataService.updateTask(task).subscribe({
        next: () => {
          this.displayListTask(); 
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