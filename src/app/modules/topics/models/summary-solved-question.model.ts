import { Answer, Question } from 'src/app/shared/models';

export interface SummarySolvedQuestion {
  question: Question;
  isCorrect: boolean;
  selectedAnswer: Answer;
  correctAnswer: Answer;
}
