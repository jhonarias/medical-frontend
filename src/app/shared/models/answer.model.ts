import { Question } from ".";
import { AnswerStatus } from "../enums";

export interface Answer {
    _id: string;
    description: string;
    isCorrect: boolean;
    status: AnswerStatus;
    question: Question | string;
    createdAt: Date;
    updatedAt: Date;
}
