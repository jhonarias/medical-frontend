import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerDataResponse, AnswerRequest } from 'src/app/shared/api-models';
import { AnswerStatus } from 'src/app/shared/enums';
import { Answer, Modal } from 'src/app/shared/models';
import { AnswerHttpService } from 'src/app/shared/services/answer-http.service';

@Component({
  selector: 'answers-create-container',
  templateUrl: './templates/answers-create-container.component.html',
})
export class AnswersCreateContainerComponent implements OnInit {

  @ViewChild('modalContent') modalContent!: ElementRef;

  public forms: FormArray;
  public statusList: string[];
  public questionId: string;
  public isLoading: boolean;
  public modalModel: Modal;

  constructor(
    protected answerHttpService: AnswerHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.questionId = '';
    // @ts-ignore
    this.forms = new FormArray([]);
    this.statusList = [];
    this.isLoading = false;
    this.modalModel = {
      title: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public addForm(): void {
    const form: FormGroup = new FormGroup({
      description: new FormControl('', [Validators.required]),
      isCorrect: new FormControl(false, [Validators.required]),
      status: new FormControl(AnswerStatus.ACTIVE, [Validators.required]),
    });
    this.forms.push(form);
  }

  public deleteForm(index: number): void {
    this.forms.controls.splice(index, 1);
  }

  public validate(): void {
    if (this.forms.valid) {
      this.register();
    } else {
      this.openSm('Aviso!', 'Rellene los campos');
    }
  }

  protected internalInit(): void {
    this.subscribeToParams();
    this.setStatusList();
    this.addForm();
  }

  protected openSm(title: string, description: string): void {
    this.modalModel = { title, description};
		this.modalService.open(this.modalContent, { size: 'sm' });
	}

  protected subscribeToParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.questionId = params['questionId'];
    });
  }

  protected setStatusList(): void {
    this.statusList = [];
    Object.values(AnswerStatus).forEach((status) => {
      this.statusList.push(status);
    });
  }

  protected buildRequest(): AnswerRequest[] {
    const answers = this.forms.value as Answer[];
    return answers.map((answer) => {
      return {
        ...answer,
        question: this.questionId as string,
      } as Answer;
    });
  }

  protected register() {
    this.isLoading = true;
    const request = this.buildRequest();
    this.answerHttpService.createAnswers(request).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {
        this.isLoading = false;
        this.openSm('Aviso!', 'Problema al guardar, vuelva a intentarlo');
      }
    });
  }

  protected handleRegisterSuccess(response: AnswerDataResponse) {
    this.forms.reset();
    if (this.questionId) {
      this.router.navigate(['/questions/question-show/' + this.questionId]);
      return;
    }
    this.router.navigate(['/answers']);
  }
}
