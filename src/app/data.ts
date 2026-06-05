import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Định nghĩa interface cấu trúc dữ liệu Task đồng bộ với API Server
export interface Task {
  id: number;
  title: string;
  content: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Địa chỉ URL gốc của API server Spring Boot
  private rootURL = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  // 1. Lấy danh sách toàn bộ công việc (GET /task/all)
  getTaskList(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.rootURL}/task/all`);
  }

  // 2. Thêm mới công việc (POST /task)
  addTask(task: any) {
    return this.http.post<any>(`${this.rootURL}/task`, task, { observe: 'response' });
  }

  // 3. Cập nhật trạng thái công việc (PUT /task/{id})
  updateTask(task: any) {
    return this.http.put(`${this.rootURL}/task/${task.id}`, task);
  }

  // 4. Xóa công việc (DELETE /task/{id})
  deleteTask(taskid: any) {
    return this.http.delete(`${this.rootURL}/task/${taskid}`);
  }
}