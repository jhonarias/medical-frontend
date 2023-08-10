import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'answers-container',
  templateUrl: './templates/answers-container.component.html',
})
export class AnswersContainerComponent implements OnInit {
  protected questionId: string;

  constructor(private route: ActivatedRoute) {
    this.questionId = '';
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit(): void {
    this.subscribeToParams();
  }

  protected subscribeToParams(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['questionId'];
    });
  }
}
