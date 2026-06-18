import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];
      displayColumns:string[]=['completed','taskName','description','dueDate','status','action'];
    dataSource=new MatTableDataSource<any>();
  constructor(private taskService: TaskService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe((data:any)=>{
      this.dataSource.data=data;
    })
  }

  deleteTask(id: number): void {
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          alert("Task Deleted Successfully!");
          this.getAllTasks();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

editTask(id: number) {

  console.log("Edit clicked", id);

  this.router.navigate(['/task-form', id]);

}
toggleTask(task:any){
  if(task.status === 'Completed'){
    task.status='Pending';
  }else{
    task.status="Completed";
  }
}
}
