import store from '../model/store';
export class AnswerController {
    addAnswer(id,data) {
        const question = store.find((item) => item.id === parseInt(id));
        const answer = {
            id: question.answers.length + 1,
            answer: data
        }
        question.answers.push(answer);
        return question;
    }
}