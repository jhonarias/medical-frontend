import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    protected questionHttpService: QuestionHttpService,
    protected topicHttpService: TopicHttpService
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
}
