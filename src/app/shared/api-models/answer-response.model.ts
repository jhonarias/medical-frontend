import { Answer } from '../models';
import { ApiResponse } from './api-response.model';

export interface AnswerResponse extends ApiResponse {
  data: Answer;
}

export interface AnswerDataResponse extends ApiResponse {
  data: Answer[];
}
