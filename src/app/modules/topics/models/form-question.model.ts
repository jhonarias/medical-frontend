import { FormAnswer } from '.';

export interface FormQuestion {
  _id: string;
  description: string;
  selectedAnswer: string; // answer id
  answers: FormAnswer[];
}
