import { Component, OnInit } from '@angular/core';
import { ResourceType, TopicStatus } from '../enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Subtopic, Topic } from 'src/app/shared/models';
import { TopicsHttpService } from '../../../shared/services/topics-http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubtopicRequest, TopicRequest } from '../models';

@Component({
  selector: 'topic-edit-container',
  templateUrl: './templates/topic-edit-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicEditContainerComponent implements OnInit {
  public topic: Topic;
  public subtopic: Subtopic;
  public form: FormGroup;
  public topics: Topic[];
  public statusList: string[];

  protected resourceType: ResourceType;
  public resourceTypeEnum = ResourceType;
  protected resourceId: string;
  protected file: string;

  constructor(
    protected topicsHttpService: TopicsHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({});
    // @ts-ignore
    this.topic = undefined;
    // @ts-ignore
    this.subtopic = undefined;
    this.resourceType = ResourceType.TOPIC;
    this.resourceId = '';
    this.topics = [];
    this.statusList = [];
    this.file = '';
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public validate(): void {
    if (this.form.valid) {
      this.update();
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
    this.setResourceId();
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
      .split('/')[2]
      .split('-')[0] as ResourceType;
  }

  protected setResourceId(): void {
    this.route.params.subscribe((params) => {
      this.resourceId = params['id'];
      this.getResourceById();
    });
  }

  protected getResourceById() {
    this.topicsHttpService
      .getResourceById(this.resourceId, this.resourceType)
      .subscribe({
        next: (response) => {
          if (this.resourceType === ResourceType.TOPIC) {
            this.topic = response.data as Topic;
          } else {
            this.subtopic = response.data as Subtopic;
          }
          this.retrieveTopics();
          this.setFormValues();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected retrieveTopics(): void {
    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.topicsHttpService.retrieveTopics().subscribe({
        next: (response) => {
          this.topics = response.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  protected buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      file: new FormControl('', []),
    });

    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.form.addControl('topic', new FormControl('', [Validators.required]));
    }
  }

  protected setFormValues() {
    const resource = this.topic || this.subtopic;
    this.form.get('name')?.setValue(resource.name);
    this.form.get('description')?.setValue(resource.description);
    this.form.get('status')?.setValue(resource.status);
    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.form.get('topic')?.setValue(this.subtopic.topic?._id);
    }
  }

  protected buildRequest(): TopicRequest | SubtopicRequest | FormData {
    const form = this.form.value;
    return {
      ...form,
      files: this.file,
    };
  }

  protected update() {
    const request = this.buildRequest();
    this.topicsHttpService
      .updateResource(request, this.resourceType, this.resourceId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('Actualizado correctamente');
          }
          this.router.navigate(['/topics']);
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }
}