import { Subtopic, Topic } from ".";
import { QuestionStatus } from "../enums";

export interface Question {
    _id: string;
    title: string;
    description: string;
    status: QuestionStatus;
    topic: Topic;
    subtopic: Subtopic;
    createdAt: Date;
    updatedAt: Date;
}
