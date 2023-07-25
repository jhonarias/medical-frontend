import { NgModule } from "@angular/core";
import { HomeContainerComponent } from './home-container.component';
import { CommonModule } from "@angular/common";
import { HomeContainerRoutingModule } from "./home-container-routing.module";

@NgModule({
    imports: [CommonModule, HomeContainerRoutingModule],
    declarations: [HomeContainerComponent],
    providers: [
      {
        provide: 'components',
        useValue: [HomeContainerComponent],
        multi: true,
      },
    ],
    exports: [HomeContainerComponent],
  })
  export class HomeContainerModule {}
  