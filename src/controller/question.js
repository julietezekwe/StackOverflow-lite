import store from '../model/store';
export class QuestionController {
    getAllQuestions() {
        return store;
    }
    getQuestion(id) {
        const question = store.find((item) => item.id === parseInt(id));
        return (question) ? question : false;
    }
    addQuestion(title, context) {
        const question = {
            id: store.length + 1,
            title,
            context,
            answers: []
        }
        store.push(question);
        return question;
    }
}