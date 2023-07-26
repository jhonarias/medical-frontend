import { ApiResponse } from 'src/app/shared/api-models';
import { Subtopic, Topic } from 'src/app/shared/models';

export interface TopicResponse extends ApiResponse {
  data: Topic;
}

export interface SubtopicResponse extends ApiResponse {
  data: Subtopic;
}

export interface TopicDataResponse extends ApiResponse {
  data: TopicData[];
}

export interface TopicData extends Topic {
  subtopics: Subtopic[];
}
