import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ServerMediatorService } from '../../server-mediator.service';
import { userData } from '../../user-data.model';

@Component({
  selector: 'app-note-edit-preview',
  templateUrl: './note-edit-preview.component.html',
  styleUrls: ['./note-edit-preview.component.css']
})
export class NoteEditPreviewComponent implements OnInit, OnDestroy {

  isLoading = false;
  previewOnly : boolean;
  previewEditData :any;
  previewSubscription : Subscription;
  @ViewChild('noteTempDrv') noteForm : NgForm

  constructor(
    private server : ServerMediatorService,
    private router : Router,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.previewSubscription = this.server.forwardViewContent
      .subscribe(
        resp => {
          if(resp){
            this.previewOnly = !resp.editPermission;
            this.previewEditData = resp.data
            setTimeout(() => {
              this.noteForm.setValue({
                title : resp.data.value.title,
                content : resp.data.value.content
              })
            },)
          }
        }
      )
      this.server.errorOccured
        .subscribe((errMsg : string) => {
          this.isLoading = false;
          this._snackBar.open(errMsg, 'Dismiss')
        })
  }

  ngOnDestroy(): void {
    this.previewSubscription.unsubscribe()
  }

  onSubmitHandler(){
    this.isLoading = true
    const {id, type, createdOn} = this.previewEditData
    const updatedData = new userData(
      createdOn,
      type,
      this.noteForm.value,
      new Date()
    )
    this.server.updateContent(updatedData, id)
  }

}
