import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerDataResponse, AnswerRequest } from 'src/app/shared/api-models';
import { AnswerStatus } from 'src/app/shared/enums';
import { Answer } from 'src/app/shared/models';
import { AnswerHttpService } from 'src/app/shared/services/answer-http.service';

@Component({
  selector: 'answers-create-container',
  templateUrl: './templates/answers-create-container.component.html',
})
export class AnswersCreateContainerComponent implements OnInit {
  public forms: FormArray;
  public statusList: string[];
  public questionId: string;
  public isLoading: boolean;

  constructor(
    protected answerHttpService: AnswerHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.questionId = '';
    // @ts-ignore
    this.forms = new FormArray([]);
    this.statusList = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public addForm(): void {
    const form: FormGroup = new FormGroup({
      description: new FormControl('', [Validators.required]),
      isCorrect: new FormControl(false, [Validators.required]),
      status: new FormControl(AnswerStatus.ACTIVE, [Validators.required]),
    });
    this.forms.push(form);
  }

  public deleteForm(index: number): void {
    this.forms.controls.splice(index, 1);
  }

  public validate(): void {
    if (this.forms.valid) {
      this.register();
    } else {
      alert('form invalid');
    }
  }

  protected internalInit(): void {
    this.subscribeToParams();
    this.setStatusList();
    this.addForm();
  }

  protected subscribeToParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.questionId = params['questionId'];
    });
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(AnswerStatus).forEach((status) => {
      this.statusList.push(status);
    });
  }

  protected buildRequest(): AnswerRequest[] {
    const answers = this.forms.value as Answer[];
    return answers.map((answer) => {
      return {
        ...answer,
        question: this.questionId as string,
      } as Answer;
    });
  }

  protected register() {
    this.isLoading = true;
    const request = this.buildRequest();
    console.log(request);
    this.answerHttpService.createAnswers(request).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {console.error(err); this.isLoading = false;}
    });
  }

  protected handleRegisterSuccess(response: AnswerDataResponse) {
    this.forms.reset();
    if (this.questionId) {
      this.router.navigate(['/questions/question-show/' + this.questionId]);
      return;
    }
    this.router.navigate(['/answers']);
  }
}
