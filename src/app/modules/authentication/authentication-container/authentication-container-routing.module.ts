import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationContainerComponent } from './authentication-container.component';

const routes: Routes = [
  { path: '', component: AuthenticationContainerComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationContainerRoutingModule { }
