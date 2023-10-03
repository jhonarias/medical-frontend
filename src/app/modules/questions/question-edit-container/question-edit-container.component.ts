import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionRequest, QuestionResponse } from 'src/app/shared/api-models';
import { QuestionStatus } from 'src/app/shared/enums';
import { Question, Subtopic, Topic } from 'src/app/shared/models';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { TopicHttpService } from 'src/app/shared/services/topic-http.service';

@Component({
  selector: 'question-edit-container',
  templateUrl: './templates/question-edit-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class QuestionEditContainerComponent implements OnInit {
  public form: FormGroup;
  public statusList: string[];
  public topics: Topic[];
  public subtopics: Subtopic[];
  protected resourceId: string;
  protected question: Question;

  constructor(
    protected questionHttpService: QuestionHttpService,
    protected topicHttpService: TopicHttpService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.form = new FormGroup({});
    this.resourceId = '';
    this.statusList = [];
    this.topics = [];
    this.subtopics = [];
    // @ts-ignore
    this.question = undefined;
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
    this.setResourceId();
  }

  protected setResourceId(): void {
    this.route.params.subscribe((params) => {
      this.resourceId = params['id'];
      this.getQuestionById();
    });
  }

  protected getQuestionById() {
    this.questionHttpService.getQuestionById(this.resourceId).subscribe({
      next: (response) => {
        this.question = response.data;
        this.buildForm();
        this.setStatusList();
        this.retrieveTopics();
        this.retrieveSubTopics();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(QuestionStatus).forEach((status) => {
      this.statusList.push(status);
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

  protected buildForm(): void {
    this.form = new FormGroup({
      description: new FormControl(this.question.description, [Validators.required]),
      status: new FormControl(this.question.status, [Validators.required]),
      topic: new FormControl(this.question.topic?._id, []),
      subtopic: new FormControl(this.question.subtopic?._id, []),
    });
  }

  protected buildRequest(): QuestionRequest {
    return {
      _id: this.resourceId,
      ...this.form.value
    };
  }

  protected register() {
    const requests = this.buildRequest();
    this.questionHttpService.updateQuestion(requests).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }

  protected handleRegisterSuccess(response: QuestionResponse) {
    this.location.back();
  }
}
