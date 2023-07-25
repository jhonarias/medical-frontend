import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import {
  SubtopicRequest,
  SubtopicResponse,
  TopicDataResponse,
  TopicRequest,
  TopicResponse,
} from '../../modules/topics/models';
import { Observable } from 'rxjs';
import { ResourceType } from '../../modules/topics/enums';

@Injectable()
export class TopicsHttpService extends HttpClientService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Send a request for register a user
   * @param request Data to query through API
   * @returns response observable resource
   */
  public retrieveTopics(): Observable<TopicDataResponse> {
    return this.get(environment.apiURLTopic, '');
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
    request: TopicRequest | SubtopicRequest | FormData,
    resourceType: ResourceType,
    id: string,
  ): Observable<TopicResponse | SubtopicResponse> {
    return this.put<
      TopicRequest | SubtopicRequest | FormData,
      TopicResponse | SubtopicResponse
    >(
      (resourceType === ResourceType.TOPIC
        ? environment.apiURLTopic
        : environment.apiURLSubtopic) + '/'+ id,
      '',
      request
    );
  }

  public deleteResourceById(
    id: string,
    resourceType: ResourceType
  ): Observable<TopicResponse | SubtopicResponse> {
    return this.delete<
      any,
      TopicResponse | SubtopicResponse
    >(
      (resourceType === ResourceType.TOPIC
        ? environment.apiURLTopic
        : environment.apiURLSubtopic) + '/'+id,
      ''
    );
  }
}
