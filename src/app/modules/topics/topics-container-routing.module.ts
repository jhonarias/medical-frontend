import { RouterModule, Routes } from '@angular/router';
import { TopicsContainerComponent } from './topics-container/topics-container.component';
import { NgModule } from '@angular/core';
import { TopicCreateContainerComponent } from './topic-create-container/topic-create-container.component';
import { TopicShowContainerComponent } from './topic-show-container/topic-show-container.component';
import { AuthGuard } from 'src/app/middleware/auth-guard';
import { UserType } from 'src/app/shared/enums';
import { TopicEditContainerComponent } from './topic-edit-container/topic-edit-container.component';

const routes: Routes = [
  {
    path: '',
    component: TopicsContainerComponent,
    data: { roles: [UserType.USER, UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'topic-create',
    component: TopicCreateContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'subtopic-create',
    component: TopicCreateContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'topic-show/:id',
    component: TopicShowContainerComponent,
    data: { roles: [UserType.USER, UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'subtopic-show/:id',
    component: TopicShowContainerComponent,
    data: { roles: [UserType.USER, UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'topic-edit/:id',
    component: TopicEditContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'subtopic-edit/:id',
    component: TopicEditContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicsContainerRoutingModule {}
