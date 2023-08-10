import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/shared/models';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';

@Component({
  selector: 'question-show-container',
  templateUrl: './templates/question-show-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class QuestionShowContainerComponent implements OnInit {
  protected questionId: string;
  protected question: Question;

  constructor(
    protected questionHttpService: QuestionHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.questionId = '';
    // @ts-ignore
    this.question = undefined;
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit(): void {
    this.subscribeToParams();
  }

  protected subscribeToParams(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'];
      this.getQuestionById();
    });
  }

  protected getQuestionById() {
    this.questionHttpService.getQuestionById(this.questionId).subscribe({
      next: (response) => {
        this.question = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public detete(): void {
    if (window.confirm('¿Estás seguro de que la desea eliminar?')) {
      this.questionHttpService
        .deleteQuestion(this.questionId)
        .subscribe({
          next: (response) => {
            alert(response.data.title + ' eliminado correctamente');
            this.router.navigate(['/questions']);
          },
          error: (err) => console.error(err),
        });
    }
  }

  public edit(): void {
    this.router.navigate(['/questions/question-edit/'+ this.questionId]);
  }
}
