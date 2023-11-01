import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsContainerRoutingModule } from './questions-container-routing.module';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { TopicHttpService } from 'src/app/shared/services/topic-http.service';
import { QuestionShowContainerComponent } from './question-show-container/question-show-container.component';
import { QuestionCreateContainerComponent } from './question-create-container/question-create-container.component';
import { QuestionEditContainerComponent } from './question-edit-container/question-edit-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, QuestionsContainerRoutingModule, NgbModule],
  declarations: [
    QuestionsContainerComponent,
    QuestionShowContainerComponent,
    QuestionCreateContainerComponent,
    QuestionEditContainerComponent,
  ],
  providers: [
    {
      provide: 'components',
      useValue: [
        QuestionsContainerComponent,
        QuestionShowContainerComponent,
        QuestionCreateContainerComponent,
        QuestionEditContainerComponent,
      ],
      multi: true,
    },
    TopicHttpService,
    QuestionHttpService,
  ],
  exports: [
    QuestionsContainerComponent,
    QuestionShowContainerComponent,
    QuestionCreateContainerComponent,
    QuestionEditContainerComponent,
  ],
})
export class QuestionsContainerModule {}
