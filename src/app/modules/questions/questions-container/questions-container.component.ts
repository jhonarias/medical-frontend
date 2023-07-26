import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';

@Component({
  selector: 'questions-container',
  templateUrl: './templates/questions-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class QuestionsContainerComponent implements OnInit {
  public questions: Question[];

  constructor(protected questionHttpService: QuestionHttpService) {
    this.questions = [];
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit(): void {
    this.retrieveQuestions();
  }

  protected retrieveQuestions(): void {
    this.questionHttpService.retrieveQuestions().subscribe({
      next: (response) => {
        this.questions = response.data;
      },
      error: (err) => {},
    });
  }
}
