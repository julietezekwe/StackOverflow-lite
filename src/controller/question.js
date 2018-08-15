import store from '../model/store';
export class QuestionController {
    getAllQuestions() {
        return store;
    }
    getQuestion(id) {
        const question = store.find((item) => item.id === parseInt(id));
        return (question) ? question : false;
    }
}