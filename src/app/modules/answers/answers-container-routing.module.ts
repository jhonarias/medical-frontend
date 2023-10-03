import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserType } from 'src/app/shared/enums';
import { AnswersCreateContainerComponent } from './answers-create-container/answers-create-container.component';
import { AuthGuard } from 'src/app/middleware/auth-guard';
import { AnswersContainerComponent } from './answers-container/answers-container.component';
import { AnswerShowContainerComponent } from './answer-show-container/answer-show-container.component';
import { AnswerEditContainerComponent } from './answer-edit-container/answer-edit-container.component';

const routes: Routes = [
  {
    path: '',
    component: AnswersContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'answers-create',
    component: AnswersCreateContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'answer-show/:id',
    component: AnswerShowContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'answer-edit/:id',
    component: AnswerEditContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswersContainerRoutingModule {}
