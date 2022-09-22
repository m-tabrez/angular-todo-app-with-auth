import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerMediatorService } from '../../server-mediator.service'
import { userData } from '../../user-data.model';

@Component({
  selector: 'app-todo-edit-preview',
  templateUrl: './todo-edit-preview.component.html',
  styleUrls: ['./todo-edit-preview.component.css']
})
export class TodoEditPreviewComponent implements OnInit {

  isLoading = false;
  previewOnly : boolean
  toDoForm : FormGroup
  previewData : any;

  constructor(
    private server : ServerMediatorService,
    private _snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.server.forwardViewContent
      .subscribe(
        resp => {
          this.previewData = resp.data;
          const {title, todoArr} = resp.data.value;
          const allFormControls =  todoArr.map(curEle => new FormControl({value : curEle, disabled : !resp.editPermission}, Validators.required));
          this.previewOnly = !resp.editPermission
          this.toDoForm = new FormGroup({
            'title' : new FormControl({value: title, disabled: !resp.editPermission}, Validators.required),
            'todoArr' : new FormArray([
             ...allFormControls
            ])
          })
        }
      )
      this.server.errorOccured  
        .subscribe((err : string) => {
          this.isLoading = false;
          this._snackbar.open(err, 'Dimsiss')
        })
  }

  getTodos(){
    return (<FormArray>this.toDoForm.get('todoArr')).controls
  }

  addTodo(){
    const fc = new FormControl(null, Validators.required);
    (<FormArray>this.toDoForm.get('todoArr')).push(fc);
  }

  deleteItem(delInd){
    (<FormArray>this.toDoForm.get('todoArr')).removeAt(delInd)
  }

  onSubmitHandler(){
   this.isLoading = true;
   const data = new userData(
    this.previewData.createdOn,
    this.previewData.type,
    this.toDoForm.value,
    new Date()
   )
   this.server.updateContent(data, this.previewData.id)
  }

}
