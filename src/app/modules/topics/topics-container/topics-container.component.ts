import { Component, OnInit } from '@angular/core';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { Topic } from 'src/app/shared/models';

@Component({
  selector: 'topics-container',
  templateUrl: './templates/topics-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicsContainerComponent implements OnInit {
  public topicData: Topic[];

  constructor(protected topicHttpService: TopicHttpService) {
    this.topicData = [];
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit() {
    this.retrieveTopics();
  }

  protected retrieveTopics() {
    this.topicHttpService.retrieveTopics().subscribe({
      next: (response) => {
        this.topicData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
