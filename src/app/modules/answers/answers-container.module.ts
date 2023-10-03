import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswersContainerRoutingModule } from './answers-container-routing.module';
import { AnswersCreateContainerComponent } from './answers-create-container/answers-create-container.component';
import { AnswersContainerComponent } from './answers-container/answers-container.component';
import { AnswerCreateFormComponent } from './answers-create-container/components/answer-create-form/answer-create-form.component';
import { AnswerHttpService } from 'src/app/shared/services/answer-http.service';
import { AnswerShowContainerComponent } from './answer-show-container/answer-show-container.component';
import { AnswerEditContainerComponent } from './answer-edit-container/answer-edit-container.component';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AnswersContainerRoutingModule],
  declarations: [
    AnswersContainerComponent,
    AnswersCreateContainerComponent,
    AnswerCreateFormComponent,
    AnswerShowContainerComponent,
    AnswerEditContainerComponent,
  ],
  providers: [
    {
      provide: 'components',
      useValue: [
        AnswersContainerComponent,
        AnswersCreateContainerComponent,
        AnswerCreateFormComponent,
        AnswerShowContainerComponent,
        AnswerEditContainerComponent,
      ],
      multi: true,
    },
    AnswerHttpService,
    QuestionHttpService,
  ],
  exports: [
    AnswersContainerComponent,
    AnswersCreateContainerComponent,
    AnswerCreateFormComponent,
    AnswerShowContainerComponent,
    AnswerEditContainerComponent,
  ],
})
export class AnswersContainerModule {}
