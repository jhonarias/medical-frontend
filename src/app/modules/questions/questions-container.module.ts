import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsContainerRoutingModule } from './questions-container-routing.module';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { QuestionsHttpService } from 'src/app/shared/services/question-http.service';
import { TopicsHttpService } from 'src/app/shared/services/topics-http.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, QuestionsContainerRoutingModule],
  declarations: [QuestionsContainerComponent],
  providers: [
    {
      provide: 'components',
      useValue: [QuestionsContainerComponent],
      multi: true,
    },
    TopicsHttpService,
    QuestionsHttpService,
  ],
  exports: [QuestionsContainerComponent],
})
export class QuestionsContainerModule {}
