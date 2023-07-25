import { Question } from ".";
import { AnswerStatus } from "../enums";

export interface Answer {
    _id: string;
    title: string;
    description: string;
    isCorrect: boolean;
    status: AnswerStatus;
    question: Question;
    createdAt: Date;
    updatedAt: Date;
}
