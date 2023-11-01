import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionRequest, QuestionResponse } from 'src/app/shared/api-models';
import { QuestionStatus, ResourceType } from 'src/app/shared/enums';
import { Modal, Question, Subtopic, Topic } from 'src/app/shared/models';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { TopicHttpService } from 'src/app/shared/services/topic-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'question-create-container',
  templateUrl: './templates/question-create-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class QuestionCreateContainerComponent implements OnInit {

  @ViewChild('modalContent') modalContent!: ElementRef;

  public forms: FormArray;
  public topics: Topic[];
  public subtopics: Subtopic[];
  public statusList: string[];

  public resourceType: ResourceType;
  public resourceTypeEnum = ResourceType;
  public resourceId: string;
  public isLoading: boolean;
  public modalModel: Modal;

  constructor(
    protected topicHttpService: TopicHttpService,
    protected questionHttpService: QuestionHttpService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal
  ) {
    // @ts-ignore
    this.forms = new FormArray([]);
    this.topics = [];
    this.subtopics = [];
    this.statusList = [];
    this.resourceType = ResourceType.TOPIC;
    this.resourceId = '';
    this.isLoading = true;
    this.modalModel = {
      title: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public addForm(): void {
    const form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      status: new FormControl(QuestionStatus.ACTIVE, [Validators.required]),
      topic: new FormControl(
        this.resourceType === ResourceType.TOPIC ? this.resourceId : '',
        []
      ),
      subtopic: new FormControl(
        this.resourceType === ResourceType.SUBTOPIC ? this.resourceId : '',
        []
      ),
    });
    this.forms.push(form);
  }

  public deleteForm(index: number): void {
    this.forms.controls.splice(index, 1);
  }

  public validate(): void {
    if (
      this.forms.valid
      // && (this.forms.get('topic')?.value || this.forms.get('subtopic')?.value)
    ) {
      this.register();
    } else {
      this.openSm('Aviso!', 'Rellene los campos');
    }
  }

  protected openSm(title: string, description: string): void {
    this.modalModel = { title, description};
		this.modalService.open(this.modalContent, { size: 'sm' });
	}

  protected internalInit(): void {
    this.subscribeToParams();
  }

  protected subscribeToParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.resourceId = params['resourceId'];
      this.resourceType = params['resourceType'];
      this.setStatusList();
      this.retrieveTopics();
      this.retrieveSubTopics();
      this.addForm();
    });
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(QuestionStatus).forEach((status) => {
      this.statusList.push(status);
    });
  }

  protected retrieveTopics(): void {
    this.isLoading = true;
    this.topicHttpService.retrieveTopics().subscribe({
      next: (response) => {
        this.topics = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.openSm('Aviso!', 'Problema al cargar los temas, vuelva a intentarlo');
      },
    });
  }

  protected retrieveSubTopics(): void {
    this.isLoading = true;
    this.topicHttpService.retrieveSubTopics().subscribe({
      next: (response) => {
        this.subtopics = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.openSm('Aviso!', 'Problema al cargar los subtemas, vuelva a intentarlo');
        this.isLoading = false;
      },
    });
  }

  protected buildRequest(): QuestionRequest[] {
    const questions = this.forms.value as Question[];
    return questions.map((question) => {
      let request = {
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
    });
  }

  protected register() {
    this.isLoading = true;
    const requests = this.buildRequest();
    this.questionHttpService.createQuestion(requests).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {
        this.isLoading = false;
        this.openSm('Aviso!', 'Problema al guardar, vuelva a intentarlo');
      },
    });
  }

  protected handleRegisterSuccess(response: QuestionResponse) {
    // this.forms.reset();
    // this.router.navigate(['/questions']);
    this.location.back();
  }
}
