import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { Observable } from 'rxjs';
import {
  SubTopicDataResponse,
  SubtopicRequest,
  SubtopicResponse,
  TopicDataResponse,
  TopicRequest,
  TopicResponse,
} from '../api-models';
import { ResourceType } from '../enums';

@Injectable()
export class TopicHttpService extends HttpClientService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public retrieveTopics(): Observable<TopicDataResponse> {
    return this.get(environment.apiURLTopic, '');
  }

  public retrieveSubTopics(): Observable<SubTopicDataResponse> {
    return this.get(environment.apiURLSubtopic, '');
  }

  public getResourceById(
    id: string,
    resourceType: ResourceType
  ): Observable<TopicResponse | SubtopicResponse> {
    return this.get(
      resourceType === ResourceType.TOPIC
        ? environment.apiURLTopic
        : environment.apiURLSubtopic,
      id
    );
  }

  public registerResource(
    request: TopicRequest | SubtopicRequest,
    resourceType: ResourceType
  ): Observable<TopicResponse | SubtopicResponse> {
    return this.post<
      TopicRequest | SubtopicRequest,
      TopicResponse | SubtopicResponse
    >(
      resourceType === ResourceType.TOPIC
        ? environment.apiURLTopic
        : environment.apiURLSubtopic,
      '',
      request
    );
  }

  public updateResource(
    request: TopicRequest | SubtopicRequest,
    resourceType: ResourceType,
    id: string
  ): Observable<TopicResponse | SubtopicResponse> {
    return this.put<
      TopicRequest | SubtopicRequest,
      TopicResponse | SubtopicResponse
    >(
      (resourceType === ResourceType.TOPIC
        ? environment.apiURLTopic
        : environment.apiURLSubtopic) +
        '/' +
        id,
      '',
      request
    );
  }

  public deleteResourceById(
    id: string,
    resourceType: ResourceType
  ): Observable<TopicResponse | SubtopicResponse> {
    return this.delete<any, TopicResponse | SubtopicResponse>(
      (resourceType === ResourceType.TOPIC
        ? environment.apiURLTopic
        : environment.apiURLSubtopic) +
        '/' +
        id,
      ''
    );
  }
}
