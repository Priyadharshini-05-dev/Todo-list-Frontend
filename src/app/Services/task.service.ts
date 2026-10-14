import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

 
  constructor(private http: HttpClient) { }


 private apiUrl = "http://localhost:8080/task";

getAllTasks() {
  return this.http.get(this.apiUrl + "/getAll");
}

getTaskById(id: number) {
  return this.http.get(this.apiUrl + "/getById/" + id);
}

addTask(task: any) {
  return this.http.post(this.apiUrl + "/create", task);
}

updateTask(id: number, task: any) {
  return this.http.put(this.apiUrl + "/update/" + id, task);
}

deleteTask(id: number) {
  return this.http.delete(this.apiUrl + "/delete/" + id, { responseType: 'text' });
}
}
