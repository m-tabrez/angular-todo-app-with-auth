import { Component, OnInit, AfterViewInit , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ServerMediatorService } from '../server-mediator.service';
import {map, Subject} from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  displayedColumns : string[] = ['title', 'type', 'created', 'action']
  dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator : MatPaginator;
  isLoading = false;

  constructor(
    private server : ServerMediatorService,
    public dialog : MatDialog,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.server.fetchUserContent()
    this.server.dataTransformer
      .subscribe(
        resp => {
          this.dataSource.data = resp;
        }
      )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id){
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed()
      .subscribe(resp => {
        if(resp){
          this.isLoading = true
          this.server.deleteContent(id)
            .subscribe(
              result => {
                this.isLoading = false;
              },
              error => {
                console.log(error)
                this.isLoading = false;
              }
            )
        }
      })
  }

  onEditOrPreview(elemContent, isEditable){
    this.server.editOrViewContent({
      data : elemContent,
      editPermission : isEditable
    })
  }

}
