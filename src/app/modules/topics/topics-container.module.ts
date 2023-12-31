import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TopicsContainerRoutingModule } from './topics-container-routing.module';
import { TopicsContainerComponent } from './topics-container/topics-container.component';
import { TopicCreateContainerComponent } from './topic-create-container/topic-create-container.component';
import { TopicHttpService } from '../../shared/services/topic-http.service';
import { TopicShowContainerComponent } from './topic-show-container/topic-show-container.component';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { TopicEditContainerComponent } from './topic-edit-container/topic-edit-container.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TopicsContainerRoutingModule, AngularEditorModule],
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
    TopicHttpService,
    QuestionHttpService,
  ],
  exports: [
    TopicsContainerComponent,
    TopicCreateContainerComponent,
    TopicShowContainerComponent,
  ],
})
export class TopicsContainerModule {}
