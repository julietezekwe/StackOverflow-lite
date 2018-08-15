import store from '../model/store';
export class AnswerController {
    addAnswer(id,answer) {
        const question = this.findQuestion(id);
        const data = this.createAnswerObject(question, answer)
        question.answers.push(data);
        return data;
    }
    findQuestion(id) {
        return store.find((item) => item.id === parseInt(id))
    }
    createAnswerObject(question, answer) {
        const id = this.getId(question);
        return {
            id,
            answer
        }
    }
    getId(question) {
        return (question.answers.length + 1); 
    }
}