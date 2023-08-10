import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home-container/home-container.module').then(
        (m) => m.HomeContainerModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import(
        './modules/authentication/authentication-container/authentication-container.module'
      ).then((m) => m.AuthenticationContainerModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import(
        './modules/authentication/authentication-container/authentication-container.module'
      ).then((m) => m.AuthenticationContainerModule),
  },
  {
    path: 'topics',
    loadChildren: () =>
      import('./modules/topics/topics-container.module').then(
        (m) => m.TopicsContainerModule
      ),
  },
  {
    path: 'topic-create',
    loadChildren: () =>
      import('./modules/topics/topics-container.module').then(
        (m) => m.TopicsContainerModule
      ),
  },
  {
    path: 'topic-show/:id',
    loadChildren: () =>
      import('./modules/topics/topics-container.module').then(
        (m) => m.TopicsContainerModule
      ),
  },
  {
    path: 'subtopic-create',
    loadChildren: () =>
      import('./modules/topics/topics-container.module').then(
        (m) => m.TopicsContainerModule
      ),
  },
  {
    path: 'subtopic-show/:id',
    loadChildren: () =>
      import('./modules/topics/topics-container.module').then(
        (m) => m.TopicsContainerModule
      ),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./modules/questions/questions-container.module').then(
        (m) => m.QuestionsContainerModule
      ),
  },
  {
    path: 'question-create',
    loadChildren: () =>
      import('./modules/questions/questions-container.module').then(
        (m) => m.QuestionsContainerModule
      ),
  },
  {
    path: 'question-show/:id',
    loadChildren: () =>
      import('./modules/questions/questions-container.module').then(
        (m) => m.QuestionsContainerModule
      ),
  },
  {
    path: 'answers',
    loadChildren: () =>
      import('./modules/answers/answers-container.module').then(
        (m) => m.AnswersContainerModule
      ),
  },
  {
    path: 'answers-create',
    loadChildren: () =>
      import('./modules/answers/answers-container.module').then(
        (m) => m.AnswersContainerModule
      ),
  },
  {
    path: 'answers-create/:questionId',
    loadChildren: () =>
      import('./modules/answers/answers-container.module').then(
        (m) => m.AnswersContainerModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
