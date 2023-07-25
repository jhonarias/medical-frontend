import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TopicsContainerRoutingModule } from './topics-container-routing.module';
import { TopicsContainerComponent } from './topics-container/topics-container.component';
import { TopicCreateContainerComponent } from './topic-create-container/topic-create-container.component';
import { TopicsHttpService } from '../../shared/services/topics-http.service';
import { TopicShowContainerComponent } from './topic-show-container/topic-show-container.component';
import { QuestionsHttpService } from 'src/app/shared/services/question-http.service';
import { TopicEditContainerComponent } from './topic-edit-container/topic-edit-container.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TopicsContainerRoutingModule],
  declarations: [
    TopicsContainerComponent,
    TopicCreateContainerComponent,
    TopicShowContainerComponent,
    TopicEditContainerComponent,
  ],
  providers: [
    {
      provide: 'components',
      useValue: [
        TopicsContainerComponent,
        TopicCreateContainerComponent,
        TopicShowContainerComponent,
        TopicEditContainerComponent,
      ],
      multi: true,
    },
    TopicsHttpService,
    QuestionsHttpService,
  ],
  exports: [
    TopicsContainerComponent,
    TopicCreateContainerComponent,
    TopicShowContainerComponent,
  ],
})
export class TopicsContainerModule {}
