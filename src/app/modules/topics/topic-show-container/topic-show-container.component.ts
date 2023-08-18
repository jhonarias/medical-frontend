import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceType } from '../enums';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { Question, Subtopic, Topic } from 'src/app/shared/models';
import { AuthenticatedService } from '../../../shared/services/authenticated.service';
import { UserType } from 'src/app/shared/enums';
import { SubtopicResponse, TopicResponse } from 'src/app/shared/api-models';

@Component({
  selector: 'topic-show-container',
  templateUrl: './templates/topic-show-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicShowContainerComponent implements OnInit {
  public topic: Topic;
  public subtopic: Subtopic;
  public questions: Question[];
  public isAdmin: boolean;

  protected resourceType: ResourceType;
  protected resourceId: string;

  constructor(
    public authenticatedService: AuthenticatedService,
    protected topicHttpService: TopicHttpService,
    protected questionHttpService: QuestionHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resourceType = ResourceType.TOPIC;
    this.resourceId = '';
    // @ts-ignore
    this.topic = undefined;
    // @ts-ignore
    this.subtopic = undefined;
    this.questions = [];
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public generateQuestions(): void {
    if (this.topic) {
      this.getQuestionsByTopic();
    }

    if (this.subtopic) {
      this.getQuestionsBySubtopic();
    }
  }

  public detete(): void {
    if (window.confirm('¿Estás seguro de que lo desea eliminar?')) {
      this.topicHttpService
        .deleteResourceById(this.resourceId, this.resourceType)
        .subscribe({
          next: (response) => {
            alert(response.data.name + ' eliminado correctamente');
            this.router.navigate(['/topics']);
          },
          error: (err) => console.error(err),
        });
    }
  }

  public edit(): void {
    if (this.resourceType === ResourceType.TOPIC) {
      this.router.navigate(['/topics/topic-edit/'+ this.resourceId]);
    } else {
      this.router.navigate(['/topics/subtopic-edit/'+ this.resourceId]);
    }
  }

  public createQuestions(): void {
    this.router.navigate(['/questions/question-create'], {
      queryParams: { resourceId: this.resourceId, resourceType: this.resourceType }
    });
  }

  protected getQuestionsByTopic(): void {
    this.questionHttpService.getQuestionsByTopic(this.topic._id).subscribe({
      next: (response) => {
        if (!response.data.length) {
          alert('No hay preguntas');
        }
        this.questions = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  protected getQuestionsBySubtopic(): void {
    this.questionHttpService
      .getQuestionsBySubtopic(this.subtopic._id)
      .subscribe({
        next: (response) => {
          if (!response.data.length) {
            alert('No hay preguntas');
          }
          this.questions = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected internalInit(): void {
    this.setIsAdmin();
    this.setResourceType();
    this.subscribeToParams();
  }

  protected setResourceType(): void {
    this.resourceType = this.router.url
    .split('/')[2]
    .split('-')[0] as ResourceType;
  }

  protected subscribeToParams(): void {
    this.route.params.subscribe((params) => {
      this.resourceId = params['id'];
      this.getResourceById();
    });
  }

  protected setIsAdmin(): void {
    this.isAdmin = this.authenticatedService.hasRole([UserType.ADMIN]);
  }

  protected handleGenerateQuestions(): void {
    if (this.isAdmin) {
      this.generateQuestions();
    }
  }

  protected getResourceById() {
    this.topicHttpService
      .getResourceById(this.resourceId, this.resourceType)
      .subscribe({
        next: (response) => {
          this.handleGetResourceById(response);
          this.handleGenerateQuestions();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected handleGetResourceById(response: TopicResponse | SubtopicResponse): void {
    if (this.resourceType === ResourceType.TOPIC) {
      this.topic = response.data as Topic;
    } else {
      this.subtopic = response.data as Subtopic;
    }
  }
}
