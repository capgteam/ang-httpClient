import { Component, OnInit, inject,OnDestroy } from '@angular/core';
import { Task } from '../Model/Task';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {Subscription} from 'rxjs'

import { TaskService } from '../Services/task.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient)
  taskService: TaskService=inject(TaskService)
  allTasks: Task[]=[]
  editMode:boolean=false
  selectedTask: Task
  currentTaskId:string=''
  isLoading:boolean=false
  errorMessage:string | null = null

  errSub: Subscription

ngOnInit(): void {
  this.fetchAllTasks()
  this.errSub= this.taskService.errorSubject.subscribe({next:(httpError)=>{
    this.setErrorMessage(httpError)
  }})
}

ngOnDestroy(){
  this.errSub.unsubscribe()
}

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode=false
    this.selectedTask = { title : '',
    desc:'',
    assignedTo:'',
    createdAt:'',
    priority:'',
    status:''
  }
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  FetchAllTaskClicked(){
  
    this.fetchAllTasks()
  }
  createOrUpdateTask(task:Task){
    if(!this.editMode)
      this.taskService.createTask(task)
    else
    this.taskService.UpdateTask(this.currentTaskId,task)
  }

  private fetchAllTasks(){
    this.isLoading=true
    this.taskService.GetAlltasks().subscribe({next:(tasks)=>{
      this.allTasks=tasks
      this.isLoading=false
     },error: (error)=>{
      this.isLoading=false
      this.setErrorMessage(error)
      console.log(error)
     }})

  /* this.taskService.GetAlltasks().subscribe((tasks)=>{
    this.allTasks=tasks
    this.isLoading=false
   })*/
  }

  private setErrorMessage(err: HttpErrorResponse){
    if(err.error.error === 'Permission denied')
      this.errorMessage='You do not have permisssion to perform this action'
    else
      this.errorMessage = err.message
    setTimeout(() => {
      this.errorMessage = null
    }, 3000)
  }

  DeleteTask(id:string | undefined){
   this.taskService.DeleteTask(id)
  }
  DeleteAllTasks(){
    this.taskService.DeleteAllTasks()
  }
  onEditTaskClicked(id:string|undefined){
    this.currentTaskId=id
    this.showCreateTaskForm=true
    this.editMode=true
    this.selectedTask= this.allTasks.find((task)=>task.id===id)
  }
}
