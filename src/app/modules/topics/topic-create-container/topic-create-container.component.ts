import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceType, TopicStatus } from '../enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { Topic } from 'src/app/shared/models';
import {
  SubtopicRequest,
  SubtopicResponse,
  TopicRequest,
  TopicResponse,
} from 'src/app/shared/api-models';

@Component({
  selector: 'topic-create-container',
  templateUrl: './templates/topic-create-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicCreateContainerComponent implements OnInit {
  public form: FormGroup;
  public resourceType: ResourceType;
  public resourceTypeEnum = ResourceType;
  public statusList: string[];
  public topics: Topic[];

  protected file: string;

  constructor(
    protected topicHttpService: TopicHttpService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.statusList = [];
    this.resourceType = ResourceType.TOPIC;
    this.topics = [];
    this.file = '';
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public validate(): void {
    if (this.form.valid) {
      this.register();
    } else {
      alert('form invalid');
    }
  }

  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file);
    }
  }

  protected convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.file = base64Image;
    };
    reader.readAsDataURL(file);
  }

  protected internalInit(): void {
    this.setStatusList();
    this.setResourceType();
    this.retrieveTopics();
    this.buildForm();
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(TopicStatus).forEach((status) => {
      this.statusList.push(status);
    });
  }

  protected setResourceType(): void {
    this.resourceType = this.router.url
      .split('/')
      .pop()
      ?.split('-')[0] as ResourceType;
  }

  protected buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });

    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.form.addControl('topic', new FormControl('', [Validators.required]));
    }
  }

  protected retrieveTopics(): void {
    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.topicHttpService.retrieveTopics().subscribe({
        next: (response) => {
          this.topics = response.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  protected buildRequest(): TopicRequest | SubtopicRequest {
    const form = this.form.value;
    return {
      ...form,
      files: this.file,
    };
  }

  protected register() {
    const request = this.buildRequest();
    this.topicHttpService
      .registerResource(request, this.resourceType)
      .subscribe({
        next: (response) => {
          this.handleRegisterSuccess(response);
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  protected handleRegisterSuccess(response: TopicResponse | SubtopicResponse) {
    this.form.reset();
    this.router.navigate(['/topics']);
  }
}
