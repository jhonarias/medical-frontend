import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'answer-create-form',
  templateUrl: './templates/answer-create-form.component.html',
})
export class AnswerCreateFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() statusList: string[];

  constructor() {
    this.form = new FormGroup({});
    this.statusList = [];
  }

  ngOnInit(): void {}
}
