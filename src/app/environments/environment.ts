export const protocol = location.protocol;

export const environment = {
    apiURLAuthentication: protocol + '//localhost:3002/auth',
    apiURLTopic: protocol + '//localhost:3002/topic',
    apiURLSubtopic: protocol + '//localhost:3002/subtopic',
    apiURLQuestion: protocol + '//localhost:3002/question',
    apiURLAnswer: protocol + '//localhost:3002/answer',
}