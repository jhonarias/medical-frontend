import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubtopicResponse, TopicResponse } from 'src/app/shared/api-models';
import { MediaType, ResourceType, UserType } from 'src/app/shared/enums';
import { formGroupHelper } from 'src/app/shared/helpers';
import { Answer, Question, Subtopic, Topic } from 'src/app/shared/models';
import { QuestionHttpService } from 'src/app/shared/services/question-http.service';
import { AuthenticatedService } from '../../../shared/services/authenticated.service';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { FormQuestion, SummarySolvedQuestion } from '../models';
import { MediaService } from 'src/app/shared/services/media.service';

@Component({
  selector: 'topic-show-container',
  templateUrl: './templates/topic-show-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicShowContainerComponent implements OnInit {
  public topic: Topic;
  public subtopic: Subtopic;
  public questions: Question[];
  public isAdmin: boolean;
  public questionsForm: FormArray;
  public summarySolvedQuestions: SummarySolvedQuestion[];
  public mediaType: MediaType;
  public mediaTypeEnum = MediaType;

  protected resourceType: ResourceType;
  protected resourceId: string;

  constructor(
    public authenticatedService: AuthenticatedService,
    protected topicHttpService: TopicHttpService,
    protected questionHttpService: QuestionHttpService,
    protected mediaService: MediaService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.resourceType = ResourceType.TOPIC;
    this.resourceId = '';
    // @ts-ignore
    this.topic = undefined;
    // @ts-ignore
    this.subtopic = undefined;
    this.questions = [];
    this.isAdmin = false;
    // @ts-ignore
    this.questionsForm = new FormArray([]);
    this.summarySolvedQuestions = [];
    this.mediaType = this.mediaTypeEnum.UNKNOWN;
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public generateQuestions(): void {
    if (this.topic) {
      this.getQuestionsByTopic();
    }

    if (this.subtopic) {
      this.getQuestionsBySubtopic();
    }
  }

  public detete(): void {
    if (window.confirm('¿Estás seguro de que lo desea eliminar?')) {
      this.topicHttpService
        .deleteResourceById(this.resourceId, this.resourceType)
        .subscribe({
          next: (response) => {
            alert(response.data.name + ' eliminado correctamente');
            this.router.navigate(['/topics']);
          },
          error: (err) => console.error(err),
        });
    }
  }

  public edit(): void {
    if (this.resourceType === ResourceType.TOPIC) {
      this.router.navigate(['/topics/topic-edit/' + this.resourceId]);
    } else {
      this.router.navigate(['/topics/subtopic-edit/' + this.resourceId]);
    }
  }

  public createQuestions(): void {
    this.router.navigate(['/questions/question-create'], {
      queryParams: {
        resourceId: this.resourceId,
        resourceType: this.resourceType,
      },
    });
  }

  public validate(): void {
    formGroupHelper.markFormGroupAsTouched(this.questionsForm);
    if (this.questionsForm.valid) {
      this.buildAnswersSummary();
    }
  }

  public regenerateQuestions(): void {
    this.summarySolvedQuestions = [];
    this.buildQuestionsForm();
  }

  protected buildAnswersSummary(): void {
    this.summarySolvedQuestions = [];
    this.questionsForm.value.forEach((formQuestion: FormQuestion) => {
      const question = this.questions.find(
        (question) => question._id === formQuestion._id
      ) as Question;
      const selectedAnswer = question?.answers.find(
        (answer) => answer._id === formQuestion.selectedAnswer
      ) as Answer;
      const isQuestionCorrect = question?.answers.some(
        (answer) =>
          answer._id === formQuestion.selectedAnswer && answer.isCorrect
      );
      this.summarySolvedQuestions.push({
        question,
        isCorrect: isQuestionCorrect,
        selectedAnswer,
        correctAnswer: question?.answers.find(
          (answer) => answer.isCorrect
        ) as Answer,
      });
    });

    // @ts-ignore
    this.questionsForm = new FormArray([]);
  }

  protected getQuestionsByTopic(): void {
    this.questionHttpService.getQuestionsByTopic(this.topic._id).subscribe({
      next: (response) => {
        if (!response.data.length) {
          // alert('No hay preguntas');
        }
        this.questions = response.data;
        this.buildQuestionsForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  protected getOrderQuestionsRandomly() {
    return this.questions.sort(() => Math.random() - 0.5);
  }

  protected buildQuestionsForm(): void {
    // @ts-ignore
    this.questionsForm = new FormArray([]);
    const questions = this.getOrderQuestionsRandomly();
    questions.forEach((question) => {
      const question_form: FormGroup = new FormGroup({
        _id: new FormControl(question._id, []),
        description: new FormControl(question.description, []),
        selectedAnswer: new FormControl('', [Validators.required]),
      });

      // @ts-ignore
      const answers: FormArray = new FormArray([]);

      question.answers.forEach((answer) => {
        const answer_form: FormGroup = new FormGroup({
          _id: new FormControl(answer._id, []),
          description: new FormControl(answer.description, []),
        });

        answers.push(answer_form);
      });

      question_form.addControl('answers', answers);

      this.questionsForm.push(question_form);
    });
  }

  protected getQuestionsBySubtopic(): void {
    this.questionHttpService
      .getQuestionsBySubtopic(this.subtopic._id)
      .subscribe({
        next: (response) => {
          if (!response.data.length) {
            // alert('No hay preguntas');
          }
          this.questions = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected internalInit(): void {
    this.setIsAdmin();
    this.setResourceType();
    this.subscribeToParams();
  }

  protected setResourceType(): void {
    this.resourceType = this.router.url
      .split('/')[2]
      .split('-')[0] as ResourceType;
  }

  protected subscribeToParams(): void {
    this.route.params.subscribe((params) => {
      this.resourceId = params['id'];
      this.getResourceById();
    });
  }

  protected setIsAdmin(): void {
    this.isAdmin = this.authenticatedService.hasRole([UserType.ADMIN]);
  }

  protected handleGenerateQuestions(): void {
    if (this.isAdmin) {
      this.generateQuestions();
    }
  }

  protected getResourceById() {
    this.topicHttpService
      .getResourceById(this.resourceId, this.resourceType)
      .subscribe({
        next: (response) => {
          this.handleGetResourceById(response);
          this.handleGenerateQuestions();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected getVisualizationType(
    response: TopicResponse | SubtopicResponse
  ): string {
    if (response.data.files.startsWith('data:image')) {
      return 'image';
    } else if (response.data.files.startsWith('data:video')) {
      return 'video';
    } else {
      return 'otro';
    }
  }

  protected handleGetResourceById(
    response: TopicResponse | SubtopicResponse
  ): void {
    this.mediaType = this.mediaService.getMediaTypeFromBase64(
      response.data.files
    );
    if (this.resourceType === ResourceType.TOPIC) {
      this.topic = response.data as Topic;
    } else {
      this.subtopic = response.data as Subtopic;
    }
  }
}
