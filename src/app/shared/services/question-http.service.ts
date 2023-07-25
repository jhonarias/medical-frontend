import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { QuestionDataResponse } from '../api-models';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionsHttpService extends HttpClientService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Send a request for register a user
   * @param request Data to query through API
   * @returns response observable resource
   */
  public retrieveQuestions(): Observable<QuestionDataResponse> {
    return this.get(environment.apiURLQuestion, '');
  }

  public getQuestionsByTopic(id: string): Observable<QuestionDataResponse> {
    return this.get(environment.apiURLQuestion + '/questionsByTopic/' + id, '');
  }

  public getQuestionsBySubtopic(id: string): Observable<QuestionDataResponse> {
    return this.get(environment.apiURLQuestion + '/questionsBySubtopic/' + id, '');
  }
}
