import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { authUser } from '../auth/authUser.model';
import { tap, map, BehaviorSubject, Subject } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServerMediatorService {

  serverLink = "https://ux-notes-d32d1-default-rtdb.firebaseio.com"
  ourUser : authUser;
  dataTransformer = new BehaviorSubject<any>(null);
  userData : any[] = [];
  forwardViewContent = new BehaviorSubject<any>(null);
  errorOccured = new Subject();

  constructor(
    private http : HttpClient,
    private auth : AuthService,
    private router : Router
  ) { 
    this.auth.user.subscribe(
      resp => {
        this.ourUser = resp;
      }
    )
  }


  storeContentObject(content){
   return this.http.post(
    `${this.serverLink}/${this.ourUser.userId}.json`, content
    ).pipe(tap((resp : {name : String} )=> {
      let storeObjLocally = {
        id : resp.name,
        ...content
      }
      this.userData.push(storeObjLocally)
    }))
      .subscribe(
        resp => {
          this.router.navigate(['home'])
        },
        err => {
          this.errorOccured.next('An UnExpected Error Occured, Console for more details')
          console.log(err)
        }
      )
     
  }

  updateContent(data, id){
    this.http.put(
      `${this.serverLink}/${this.ourUser.userId}/${id}.json`, data
    ).pipe(
      tap( (resp) => {
        const index = this.userData.findIndex(curEle => curEle.id == id)
        this.userData.splice(index, 1, resp)
    }))
    .subscribe(
        resp => {
          this.router.navigate(['home'])
        },
        err => {
          this.errorOccured.next('An UnExpected Error Occured, Console for more details')
          console.log(err)
        }
      )
  } 

  deleteContent(contendId){
    return this.http.delete(
      `${this.serverLink}/${this.ourUser.userId}/${contendId}.json`)
        .pipe(tap(() => {
          this.userData = this.userData.filter(curEle => curEle.id != contendId)
          this.dataTransformer.next(this.userData)
        }))
  }

  editOrViewContent(content){
    const {type} = content.data
    this.forwardViewContent.next(content)
    this.router.navigate( ['edit', type ])
  }

  fetchUserContent(){
   if(this.userData.length == 0){
      this.http.get(`${this.serverLink}/${this.ourUser.userId}.json`)
      .pipe(map( resp => {
        let modifiedResult = []
        for(let key in resp){
          let newObj = {
            id : key,
            createdOn : resp[key].createdOn,
            type : resp[key].type,
            value : resp[key].value
          }
          modifiedResult.push(newObj)
        }
        return modifiedResult
      }))
      .subscribe(resp => {
        this.userData = resp;
        this.dataTransformer.next(resp)
      })
    } else {
      this.dataTransformer.next(this.userData)
    }
  }

  
}
