import { ApiResponse } from ".";
import { Question } from "../models";
import { Answer } from "../models/answer.model";

export interface QuestionResponse extends ApiResponse {
    data: Question;
}

export interface QuestionDataResponse extends ApiResponse {
    data: QuestionData[];
}

export interface QuestionData extends Question {
    answers: Answer[];
}