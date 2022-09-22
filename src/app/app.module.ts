import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { RoutingModule } from './routing/routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/loading/loading.component';
import { HomeComponent } from './application/home/home.component';
import { NewNoteComponent } from './application/new-note/new-note.component';
import { ToDoComponent } from './application/to-do/to-do.component';
import { ConfirmDialogComponent } from './application/confirm-dialog/confirm-dialog.component';
import { NoteEditPreviewComponent } from './application/edit/note-edit-preview/note-edit-preview.component';
import { TodoEditPreviewComponent } from './application/edit/todo-edit-preview/todo-edit-preview.component';
import { SurveyComponent } from './application/survey/survey.component';
import { SurveyEditPreviewComponent } from './application/edit/survey-edit-preview/survey-edit-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LoadingComponent,
    HomeComponent,
    NewNoteComponent,
    ToDoComponent,
    ConfirmDialogComponent,
    NoteEditPreviewComponent,
    TodoEditPreviewComponent,
    SurveyComponent,
    SurveyEditPreviewComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
