import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/app/shared/models';
import { AnswerHttpService } from 'src/app/shared/services/answer-http.service';

@Component({
  selector: 'answer-show-container',
  templateUrl: './templates/answer-show-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class AnswerShowContainerComponent implements OnInit {
  protected answerId: string;
  protected answer: Answer;

  constructor(
    protected answerHttpService: AnswerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.answerId = '';
    // @ts-ignore
    this.answer = undefined;
  }

  ngOnInit(): void {
    this.internalInit();
  }

	public detete(): void {
    if (window.confirm('¿Estás seguro de que la desea eliminar?')) {
      this.answerHttpService
        .deleteAnswer(this.answerId)
        .subscribe({
          next: (response) => {
            alert(response.data.description + ' eliminado correctamente');
            this.router.navigate(['/answers']);
          },
          error: (err) => console.error(err),
        });
    }
  }

  public edit(): void {
    this.router.navigate(['/answers/answer-edit/'+ this.answerId]);
  }

  protected internalInit(): void {
    this.subscribeToParams();
  }

  protected subscribeToParams(): void {
    this.route.params.subscribe((params) => {
      this.answerId = params['id'];
      this.getQuestionById();
    });
  }

	protected getQuestionById() {
    this.answerHttpService.getAnswerById(this.answerId).subscribe({
      next: (response) => {
        this.answer = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
