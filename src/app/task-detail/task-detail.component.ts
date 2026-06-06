import { Component, OnInit, signal } from '@angular/core';
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
  t = signal<Task | null>(null);
  message: string = "";

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.displayTaskDetail();
  }

  displayTaskDetail() {
    this.dataService.getTaskList().subscribe((data:Array <Task>) =>{
      const foundTask = data.find(obj => obj.id === this.id);
      if (foundTask) {
        this.t.set(foundTask) ;
      } else {
        console.error( `Không tìm thấy công việc với ID:  + ${this.id}`);
      }
    });
  }

  deleteTask() {
    this.dataService.deleteTask(this.t()!.id).subscribe(() => {
      this.router.navigate(['/list']); 
    });
  }

  actionTask() {
    let code = 0;
    const currentTask = this.t(); 

    if (currentTask) {
      if (currentTask.status == 0){
        currentTask.status = 1;
      } else if (currentTask.status == 1) {
        currentTask.status = 2;
      }
    

      this.dataService.updateTask(currentTask).subscribe({
        next: () => {
          this.message = "Cập nhật công việc thành công";
          this.t.set({...currentTask});
        },
        error: (error) => {
          code = error.status;
          console.log("status code: " + code);
          if (code == 303) {
            this.message = "Cập nhật công việc thành công";
            this.t.set({...currentTask});
          }
        }
      });
    }
  }
}