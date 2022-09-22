import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerMediatorService } from '../server-mediator.service';
import { userData } from '../user-data.model';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  toDoForm : FormGroup
  isLoading = false;

  constructor(
    private server : ServerMediatorService,
    private _snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.toDoForm = new FormGroup({
      'title' : new FormControl(null, [Validators.required]),
      'todoArr' : new FormArray([
        new FormControl(null, Validators.required)
      ])
    })
    this.server.errorOccured
      .subscribe(
        (res: string) => {
          this.isLoading = false;
          this._snackbar.open(res, 'Dismiss')
        }
      )
  }

  getTodoArr(){
    return (<FormArray>this.toDoForm.get('todoArr')).controls
  }

  deleteItem(delId){
    (<FormArray>this.toDoForm.get('todoArr')).removeAt(delId)
  }

  addTodo(){
    const fc = new FormControl(null, Validators.required);
    (<FormArray>this.toDoForm.get('todoArr')).push(fc)
  }

  onSubmitHandler(){
    this.isLoading = true;
    const data = new userData(
      new Date(),
      'todo',
      this.toDoForm.value,
      null
    )
    this.server.storeContentObject(data)
      
  }

}
