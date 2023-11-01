import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TopicHttpService } from '../../../shared/services/topic-http.service';
import { Modal, Topic } from 'src/app/shared/models';
import { AuthenticatedService } from 'src/app/shared/services/authenticated.service';
import { UserType } from 'src/app/shared/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'topics-container',
  templateUrl: './templates/topics-container.component.html',
  //   styleUrls: ['./auth.component.scss']
})
export class TopicsContainerComponent implements OnInit {

  @ViewChild('modalContent') modalContent!: ElementRef;

  public topicData: Topic[];
  public userType = UserType;
  public isLoading: boolean;
  public modalModel: Modal;

  constructor(
    public authenticatedService: AuthenticatedService,
    protected topicHttpService: TopicHttpService,
    private modalService: NgbModal) {
    this.topicData = [];
    this.isLoading = true;
    this.modalModel = {
      title: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected internalInit() {
    this.retrieveTopics();
  }

  protected openSm(title: string, description: string): void {
    this.modalModel = { title, description};
		this.modalService.open(this.modalContent, { size: 'sm' });
	}

  protected retrieveTopics() {
    this.topicHttpService.retrieveTopics().subscribe({
      next: (response) => {
        this.topicData = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.openSm('Aviso!', 'Problema al obtener los temas, vuelva a intentarlo');
      },
    });
  }
}
