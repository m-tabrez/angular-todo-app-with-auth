import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { WelcomeComponent } from '../auth/welcome/welcome.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomeComponent } from '../application/home/home.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { NewNoteComponent } from '../application/new-note/new-note.component';
import { ToDoComponent } from '../application/to-do/to-do.component';
import { NoteEditPreviewComponent } from '../application/edit/note-edit-preview/note-edit-preview.component';
import { TodoEditPreviewComponent } from '../application/edit/todo-edit-preview/todo-edit-preview.component';
import { SurveyComponent } from '../application/survey/survey.component';
import { SurveyEditPreviewComponent } from '../application/edit/survey-edit-preview/survey-edit-preview.component';

const routes : Routes = [
  {path : '', redirectTo : '/welcome', pathMatch : 'full'},
  {path : 'welcome', component : WelcomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'home', canActivate : [AuthGuardService], children : [
    {path : '', component : HomeComponent},
    {path : 'new-note', component : NewNoteComponent},
    {path : 'new-todo', component : ToDoComponent},
    {path : 'survey', component : SurveyComponent}
  ]},
  {path : 'edit', canActivate : [AuthGuardService], children : [
    {path : 'note', component : NoteEditPreviewComponent},
    {path : 'todo', component : TodoEditPreviewComponent},
    {path : 'survey', component : SurveyEditPreviewComponent}
  ]},
  {path : '**', component : PageNotFoundComponent},
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class RoutingModule { }
