import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { UserType } from 'src/app/shared/enums';
import { AuthGuard } from 'src/app/middleware/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: QuestionsContainerComponent,
    data: { roles: [UserType.USER, UserType.ADMIN] },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsContainerRoutingModule {}
