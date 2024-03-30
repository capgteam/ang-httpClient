import { Component, EventEmitter, Output,Input,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Task } from 'src/app/Model/Task';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Input() isEditMode:boolean=false
  @Input() selectedTask: Task;
  @ViewChild('taskForm') taskForm:NgForm
    @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

@Output()
EmittedTaskData: EventEmitter<Task> = new EventEmitter<Task>();
ngAfterViewInit(){
  setTimeout(()=>{
   // console.log(this.taskForm.value)
   // this.taskForm.setValue(this.selectedTask)
   this.taskForm.form.patchValue(this.selectedTask)
  },0)
  
}

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  onFormSubmitted(taskForm:NgForm){
    this.EmittedTaskData.emit(taskForm.value)
   // console.log(taskForm.value)
    this.CloseForm.emit(false);
    
  }
}