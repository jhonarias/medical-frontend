import { TopicStatus } from "../../modules/topics/enums";
import { Subtopic } from "./subtopic.model";

export interface Topic {
    _id: string;
    name: string;
    description: string;
    status: TopicStatus;
    files: string;
    subtopics: Subtopic[],
    createdAt: Date;
    updatedAt: Date;
}
