import { Component, OnInit } from '@angular/core';
import { TopicStatus } from '../enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Subtopic, Topic } from 'src/app/shared/models';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  SubtopicRequest,
  TopicRequest,
} from 'src/app/shared/api-models';
import { MediaType, ResourceType } from 'src/app/shared/enums';
import { MediaService } from 'src/app/shared/services/media.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  public mediaType: MediaType;
  public mediaTypeEnum = MediaType;
  public file: string;
  public fileMediaType: MediaType;
  public resourceTypeEnum = ResourceType;
  public isLoading: boolean;
  public config: AngularEditorConfig;

  protected resourceType: ResourceType;
  protected resourceId: string;

  constructor(
    protected topicHttpService: TopicHttpService,
    protected mediaService: MediaService,
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
    this.mediaType = MediaType.UNKNOWN;
    this.fileMediaType = MediaType.UNKNOWN;
    this.isLoading = true;
    this.config = {
      editable: true,
      spellcheck: true,
      height: '100%',
      minHeight: '5rem',
      placeholder: 'Enter text in this rich text editor....',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      customClasses: [
        {
          name: 'Quote',
          class: 'quoteClass',
        },
        {
          name: 'Title Heading',
          class: 'titleHead',
          tag: 'h1',
        },
      ],
    };
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
      this.fileMediaType = this.mediaService.getMediaTypeFromBase64(this.file);
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
    this.topicHttpService
      .getResourceById(this.resourceId, this.resourceType)
      .subscribe({
        next: (response) => {
          this.mediaType = this.mediaService.getMediaTypeFromBase64(
            response.data.files
          );
          if (this.resourceType === ResourceType.TOPIC) {
            this.topic = response.data as Topic;
          } else {
            this.subtopic = response.data as Subtopic;
          }
          this.isLoading = false;
          this.retrieveTopics();
          this.setFormValues();
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  protected retrieveTopics(): void {
    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.isLoading = true;
      this.topicHttpService.retrieveTopics().subscribe({
        next: (response) => {
          this.topics = response.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
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

  protected buildRequest(): TopicRequest | SubtopicRequest {
    const form = this.form.value;
    return {
      ...form,
      files: this.file ? this.file : this.topic.files,
    };
  }

  protected update() {
    this.isLoading = true;
    const request = this.buildRequest();
    this.topicHttpService
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
          this.isLoading = false;
        },
      });
  }
}
