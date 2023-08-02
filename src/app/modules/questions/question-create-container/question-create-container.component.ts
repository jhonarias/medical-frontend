import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionRequest, QuestionResponse } from 'src/app/shared/api-models';
import { QuestionStatus } from 'src/app/shared/enums';
import { Question, Subtopic, Topic } from 'src/app/shared/models';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { TopicHttpService } from 'src/app/shared/services/topic-http.service';

@Component({
  selector: 'question-create-container',
  templateUrl: './templates/question-create-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class QuestionCreateContainerComponent implements OnInit {
  public form: FormGroup;
  public topics: Topic[];
  public subtopics: Subtopic[];
  public statusList: string[];

  constructor(
    protected topicHttpService: TopicHttpService,
    protected questionHttpService: QuestionHttpService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.topics = [];
    this.subtopics = [];
    this.statusList = [];
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public validate(): void {
    if (
      this.form.valid &&
      (this.form.get('topic')?.value || this.form.get('subtopic')?.value)
    ) {
      this.register();
    } else {
      alert('Formulario invalido o debe seleccionar un tema o un subtema');
    }
  }

  protected internalInit(): void {
    this.retrieveTopics();
    this.retrieveSubTopics();
    this.setStatusList();
    this.buildForm();
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(QuestionStatus).forEach((status) => {
      this.statusList.push(status);
    });
  }

  protected buildForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      topic: new FormControl('', []),
      subtopic: new FormControl('', []),
    });
  }

  protected retrieveTopics(): void {
    this.topicHttpService.retrieveTopics().subscribe({
      next: (response) => {
        this.topics = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  protected retrieveSubTopics(): void {
    this.topicHttpService.retrieveSubTopics().subscribe({
      next: (response) => {
        this.subtopics = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  protected buildRequest(): QuestionRequest {
    const question = this.form.value as Question;
    let request = {
      title: question.title,
      description: question.description,
      status: question.status,
    } as QuestionRequest;

    if (question.topic) {
      request = {
        ...request,
        topic: question.topic,
      } as QuestionRequest;
    } else if (question.subtopic) {
      request = {
        ...request,
        subtopic: question.subtopic,
      } as QuestionRequest;
    }

    return request;
  }

  protected register() {
    this.questionHttpService.createQuestion(this.buildRequest()).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  protected handleRegisterSuccess(response: QuestionResponse) {
    this.form.reset();
    this.router.navigate(['/questions']);
  }
}
