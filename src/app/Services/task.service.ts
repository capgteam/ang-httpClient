import {Injectable,inject} from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Task } from "../Model/Task";
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TaskService{
    http: HttpClient = inject(HttpClient);
    errorSubject=new Subject<HttpErrorResponse>()

    createTask(task:Task){
        
    const header=new HttpHeaders({'my-header':'Hello-world'})
   // this.http.post("https://ang-http-client-default-rtdb.firebaseio.com/tasks.json",
   this.http.post("https://angsss-http-client-default-rtdb.firebaseio.com/tasks.json",
    
   task,{headers:header}).subscribe({error:(err)=>{
      this.errorSubject.next(err)
    }})
     
    //this.showCreateTaskForm = false;
    }

    DeleteTask(id:string | undefined){
        this.http.delete('https://ang-http-client-default-rtdb.firebaseio.com/tasks/'+id+'.json')
        .subscribe({error:(err)=>{
          this.errorSubject.next(err)
        }})
        
      }
      DeleteAllTasks(){
        this.http.delete('https://ang-http-client-default-rtdb.firebaseio.com/tasks.json')
          .subscribe({error:(err)=>{
            this.errorSubject.next(err)
          }})
        
      }

      GetAlltasks(){
       return this.http.get<{[key:string]:Task}>('https://ang-http-client-default-rtdb.firebaseio.com/tasks.json')
          .pipe(map((response)=>{
            let tasks=[];
            for(let key in response){
              if(response.hasOwnProperty(key))
                tasks.push({...response[key],id:key})
            }
            return tasks
          }))
         
      }

      UpdateTask(id:string | undefined,data:Task){
        this.http.put('https://ang-http-client-default-rtdb.firebaseio.com/tasks/'+id+'.json',data)
          .subscribe({error:(err)=>{
            this.errorSubject.next(err)
          }})
      }
}