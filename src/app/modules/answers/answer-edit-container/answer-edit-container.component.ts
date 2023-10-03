import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnswerRequest, AnswerResponse } from 'src/app/shared/api-models';
import { AnswerStatus } from 'src/app/shared/enums';
import { Answer, Question } from 'src/app/shared/models';
import { AnswerHttpService } from 'src/app/shared/services/answer-http.service';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';

@Component({
  selector: 'answer-edit-container',
  templateUrl: './templates/answer-edit-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class AnswerEditContainerComponent implements OnInit {
  public form: FormGroup;
  public statusList: string[];
  public answer: Answer;
  public questions: Question[];
  protected answerId: string;

  constructor(
    protected questionHttpService: QuestionHttpService,
    protected answerHttpService: AnswerHttpService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.form = new FormGroup({});
    this.statusList = [];
    this.answerId = '';
    // @ts-ignore
    this.answer = undefined;
    this.questions = [];
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public validate(): void {
    if (
      this.form.valid
      // && (this.forms.get('topic')?.value || this.forms.get('subtopic')?.value)
    ) {
      this.register();
    } else {
      alert('Formulario invalido o debe seleccionar un tema o un subtema');
    }
  }

  protected internalInit(): void {
    this.setAnswerId();
  }

  protected setAnswerId(): void {
    this.route.params.subscribe((params) => {
      this.answerId = params['id'];
      this.getAnswerById();
    });
  }

  protected getAnswerById() {
    this.answerHttpService.getAnswerById(this.answerId).subscribe({
      next: (response) => {
        this.answer = response.data;
        this.buildForm();
        this.setStatusList();
        this.retrieveQuestions();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(AnswerStatus).forEach((status) => {
      this.statusList.push(status);
    });
  }

  protected buildForm(): void {
    const question = this.answer.question as Question;
    this.form = new FormGroup({
      description: new FormControl(this.answer.description, [
        Validators.required,
      ]),
      isCorrect: new FormControl(this.answer.isCorrect, [Validators.required]),
      status: new FormControl(this.answer.status, [Validators.required]),
      question: new FormControl(question?._id, [Validators.required]),
    });
  }

  protected retrieveQuestions(): void {
    this.questionHttpService.retrieveQuestions().subscribe({
      next: (response) => {
        this.questions = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  protected buildRequest(): AnswerRequest {
    return {
      _id: this.answerId,
      ...this.form.value,
    };
  }

  protected register() {
    const requests = this.buildRequest();
    this.answerHttpService.updateAnswer(requests).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }

  protected handleRegisterSuccess(response: AnswerResponse) {
    this.location.back();
  }
}
