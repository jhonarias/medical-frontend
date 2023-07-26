import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { UserType } from 'src/app/shared/enums';
import { AuthGuard } from 'src/app/middleware/auth-guard';
import { QuestionShowContainerComponent } from './question-show-container/question-show-container.component';
import { QuestionEditContainerComponent } from './question-edit-container/question-edit-container.component';
import { QuestionCreateContainerComponent } from './question-create-container/question-create-container.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsContainerComponent,
    data: { roles: [UserType.USER, UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'question-create',
    component: QuestionCreateContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'question-show/:id',
    component: QuestionShowContainerComponent,
    data: { roles: [UserType.USER, UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
  {
    path: 'question-edit/:id',
    component: QuestionEditContainerComponent,
    data: { roles: [UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsContainerRoutingModule {}
