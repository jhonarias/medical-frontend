import { Component, OnInit } from '@angular/core';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { Topic } from 'src/app/shared/models';
import { AuthenticatedService } from 'src/app/shared/services/authenticated.service';
import { UserType } from 'src/app/shared/enums';

@Component({
  selector: 'topics-container',
  templateUrl: './templates/topics-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicsContainerComponent implements OnInit {
  public topicData: Topic[];
  public userType = UserType;
  public isLoading: boolean;

  constructor(
    public authenticatedService: AuthenticatedService,
    protected topicHttpService: TopicHttpService) {
    this.topicData = [];
    this.isLoading = true;
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
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}