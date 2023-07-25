import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormType } from './enum/form-type.enum';

@Component({
  selector: 'authentication-container',
  templateUrl: './templates/authentication-container.component.html',
//   styleUrls: ['./auth.component.scss']
})
export class AuthenticationContainerComponent implements OnInit {
  public formType: FormType;
  public formTypeEnum = FormType;

  constructor(private router: Router) {
    this.formType = FormType.REGISTER;
  }

  ngOnInit() {
    this.internalInit();
  }

  protected internalInit() {
    this.formType = this.router.url.split('/').pop() as FormType;
  }
}