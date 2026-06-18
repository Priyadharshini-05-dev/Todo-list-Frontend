import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;

  id!: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.taskForm = this.fb.group({

      taskName: [''],
      description: [''],
      dueDate: [''],
      status: ['']

    });



 this.route.paramMap.subscribe(params=>{
  this.id=Number(params.get('id'));
  console.log(this.id)

    if (this.id) {

      this.taskService.getTaskById(this.id)
        .subscribe((data: any) => {
          console.log(data)
          data.dueDate=new Date(data.dueDate) 

          this.taskForm.patchValue(data);

        });

    }
 })

   

  }

  saveTask() {

  
    if (this.id) {

      this.taskService.updateTask(this.id, this.taskForm.value)
        .subscribe(() => {

          alert("Task Updated Successfully");

          this.router.navigate(['/task-list']);

        });

    }

    else {

      this.taskService.addTask(this.taskForm.value)
        .subscribe(() => {

          alert("Task Added Successfully");

          this.router.navigate(['/task-list']);

        });

    }

  }

}