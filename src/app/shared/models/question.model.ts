import { Answer, Subtopic, Topic } from '.';
import { QuestionStatus } from '../enums';

export interface Question {
  _id: string;
  description: string;
  status: QuestionStatus;
  answers: Answer[];
  topic: Topic;
  subtopic: Subtopic;
  createdAt: Date;
  updatedAt: Date;
}
