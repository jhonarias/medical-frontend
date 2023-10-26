import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicStatus } from '../enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { Topic } from 'src/app/shared/models';
import {
  SubtopicRequest,
  SubtopicResponse,
  TopicRequest,
  TopicResponse,
} from 'src/app/shared/api-models';
import { MediaType, ResourceType } from 'src/app/shared/enums';
import { MediaService } from 'src/app/shared/services/media.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  public file: string;
  public mediaTypeEnum = MediaType;
  public fileMediaType: MediaType;
  public isLoading: boolean;

  public config: AngularEditorConfig;

  constructor(
    protected topicHttpService: TopicHttpService,
    protected mediaService: MediaService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.statusList = [];
    this.resourceType = ResourceType.TOPIC;
    this.topics = [];
    this.file = '';
    this.fileMediaType = MediaType.UNKNOWN;
    this.isLoading = false;
    this.config = {
      editable: true,
      spellcheck: true,
      height: '10rem',
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
      this.fileMediaType = this.mediaService.getMediaTypeFromBase64(this.file);
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
      status: new FormControl(TopicStatus.OPEN, [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });

    if (this.resourceType === this.resourceTypeEnum.SUBTOPIC) {
      this.form.addControl('topic', new FormControl('', [Validators.required]));
    }
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

  protected buildRequest(): TopicRequest | SubtopicRequest {
    const form = this.form.value;
    return {
      ...form,
      files: this.file,
    };
  }

  protected register() {
    this.isLoading = true;
    const request = this.buildRequest();
    this.topicHttpService
      .registerResource(request, this.resourceType)
      .subscribe({
        next: (response) => {
          this.handleRegisterSuccess(response);
        },
        error: (err) => {
          console.log('err', err);
          this.isLoading = false;
        },
      });
  }

  protected handleRegisterSuccess(response: TopicResponse | SubtopicResponse) {
    this.form.reset();
    this.router.navigate(['/topics']);
  }
}
