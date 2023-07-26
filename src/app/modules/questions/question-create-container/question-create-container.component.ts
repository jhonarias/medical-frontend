import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'question-create-container',
  templateUrl: './templates/question-create-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class QuestionCreateContainerComponent implements OnInit {
  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit(): void {}
}
