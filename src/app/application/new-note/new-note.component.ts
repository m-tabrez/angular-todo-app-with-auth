import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ServerMediatorService } from '../server-mediator.service';
import { take} from 'rxjs'
import { userData } from '../user-data.model';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('noteTempDrv') noteForm : NgForm
  isLoading = false;

  constructor(
    private server : ServerMediatorService,
    private _snackBar: MatSnackBar,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.server.errorOccured
      .subscribe(
        (res : string) => {
          this.isLoading = false;
          this._snackBar.open(res, 'Dismiss')
        }
      )
  }

  ngAfterViewInit(): void {
   
  }

  ngOnDestroy() : void{
  
  }

  onSubmitHandler(){
    this.isLoading = true;
    const createdOn = new Date();
    const data = new userData(
      new Date(),
      'note',
      this.noteForm.value,
      null
    )
    this.server.storeContentObject(data)
      
  }
}
