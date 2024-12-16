import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-creator',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.scss']
})
export class SurveyCreatorComponent {
  surveyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      surveyName: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return (this.questions.at(questionIndex).get('options') as FormArray);
  }

  isChoiceQuestion(index: number): boolean {
    const questionType = this.questions.at(index).get('questionType')?.value;
    return questionType === 'singleChoice' || questionType === 'multipleChoice';
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      questionTitle: ['', Validators.required],
      questionType: ['singleChoice', Validators.required],
      options: this.fb.array([])
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.fb.group({
      optionText: ['', Validators.required]
    }));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  createSurvey(): void {
    if (this.surveyForm.valid) {
      console.log(this.surveyForm.value);
      alert('הסקר נוצר בהצלחה!');
      this.surveyForm.reset();
      this.questions.clear();
    } else {
      alert('נא למלא את כל השדות הדרושים.');
    }
  }
}
