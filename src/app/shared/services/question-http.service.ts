import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import {
  QuestionDataResponse,
  QuestionRequest,
  QuestionResponse,
} from '../api-models';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionHttpService extends HttpClientService {
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

  public getQuestionById(id: string): Observable<QuestionResponse> {
    return this.get(environment.apiURLQuestion, id);
  }

  public updateQuestion(request: QuestionRequest, id: string) {
    return this.put<QuestionRequest, QuestionResponse>(
      environment.apiURLQuestion + '/' + id,
      '',
      request
    );
  }

  public createQuestion(request: QuestionRequest) {
    return this.post<QuestionRequest, QuestionResponse>(
      environment.apiURLQuestion,
      '',
      request
    );
  }

  public deleteQuestion(id: string) {
    return this.delete<any, QuestionResponse>(
      environment.apiURLQuestion + '/' + id,
      ''
    );
  }

  public getQuestionsByTopic(id: string): Observable<QuestionDataResponse> {
    return this.get(environment.apiURLQuestion + '/questionsByTopic/' + id, '');
  }

  public getQuestionsBySubtopic(id: string): Observable<QuestionDataResponse> {
    return this.get(
      environment.apiURLQuestion + '/questionsBySubtopic/' + id,
      ''
    );
  }
}
