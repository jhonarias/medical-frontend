import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import {
  AnswerDataResponse,
  AnswerRequest,
  AnswerResponse,
} from '../api-models';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class AnswerHttpService extends HttpClientService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Send a request for register a user
   * @param request Data to query through API
   * @returns response observable resource
   */
  public retrieveAnswers(): Observable<AnswerDataResponse> {
    return this.get(environment.apiURLAnswer, '');
  }

  public getQuestionById(id: string): Observable<AnswerResponse> {
    return this.get(environment.apiURLAnswer, id);
  }

  public updateAnswer(request: AnswerRequest, id: string) {
    return this.put<AnswerRequest, AnswerResponse>(
      environment.apiURLAnswer + '/' + id,
      '',
      request
    );
  }

  public createAnswers(request: AnswerRequest[]) {
    return this.post<AnswerRequest[], AnswerDataResponse>(
      environment.apiURLAnswer,
      '',
      request
    );
  }

  public deleteAnswer(id: string) {
    return this.delete<any, AnswerResponse>(
      environment.apiURLAnswer + '/' + id,
      ''
    );
  }
}
