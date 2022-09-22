import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  isLoading = false;
  surveyForm : FormGroup

  constructor() { }

  ngOnInit(): void {
    this.surveyForm = new FormGroup({
        title : new FormControl(null, Validators.required),
        quesAnsArr : new FormArray([
          new FormGroup({
            question : new FormControl(null, Validators.required),
            answersArr : new FormArray([
                  new FormControl(null, Validators.required)
                ])
            })
        ])
    })

  }

  getQuesAnsArr(){
    return (<FormArray>this.surveyForm.get('quesAnsArr')).controls
  }

  getAnsArr(ind){
    let quesAnsArr = (<FormArray>this.surveyForm.get('quesAnsArr')).controls[ind]
    return (<FormArray>quesAnsArr.get('answersArr')).controls
  }

  onSubmitHandler(){
    
  }

}
