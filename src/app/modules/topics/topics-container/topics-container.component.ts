import { Component, OnInit } from '@angular/core';
import { TopicsHttpService } from '../../../shared/services/topics-http.service';
import { TopicData } from '../models';

@Component({
  selector: 'topics-container',
  templateUrl: './templates/topics-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicsContainerComponent implements OnInit {

  public topicData: TopicData[];

  constructor(protected topicsHttpService: TopicsHttpService) {
    this.topicData = [];
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit() {
    this.retrieveTopics();
  }

  protected retrieveTopics() {
    this.topicsHttpService.retrieveTopics().subscribe({
      next: (response) => {
        this.topicData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
