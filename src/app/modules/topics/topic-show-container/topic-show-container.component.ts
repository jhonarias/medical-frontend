import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceType } from '../enums';
import { TopicsHttpService } from '../../../shared/services/topics-http.service';
import { QuestionsHttpService } from 'src/app/shared/services/question-http.service';
import { Subtopic, Topic } from 'src/app/shared/models';

@Component({
  selector: 'topic-show-container',
  templateUrl: './templates/topic-show-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicShowContainerComponent implements OnInit {
  public topic: Topic;
  public subtopic: Subtopic;

  protected resourceType: ResourceType;
  protected resourceId: string;

  constructor(
    protected topicsHttpService: TopicsHttpService,
    protected questionsHttpService: QuestionsHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resourceType = ResourceType.TOPIC;
    this.resourceId = '';
    // @ts-ignore
    this.topic = undefined;
    // @ts-ignore
    this.subtopic = undefined;
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
      this.topicsHttpService
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

  protected getQuestionsByTopic(): void {
    this.questionsHttpService.getQuestionsByTopic(this.topic._id).subscribe({
      next: (response) => {
        if (!response.data.length) {
          alert('No hay preguntas');
        }
        console.log('topic', response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  protected getQuestionsBySubtopic(): void {
    this.questionsHttpService
      .getQuestionsBySubtopic(this.subtopic._id)
      .subscribe({
        next: (response) => {
          if (!response.data.length) {
            alert('No hay preguntas');
          }
          console.log('subtopic', response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected internalInit(): void {
    this.resourceType = this.router.url
      .split('/')[2]
      .split('-')[0] as ResourceType;
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
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
