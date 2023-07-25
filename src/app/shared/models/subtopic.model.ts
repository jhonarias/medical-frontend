import { Topic } from ".";

export interface Subtopic extends Topic {
    topic: Topic;
}