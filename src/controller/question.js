import store from '../model/store';
export class QuestionController {
    getAllQuestions() {
        return store;
    }
    getQuestion(id) {
        const data = this.findQuestion(id);
        return (data) ? data : false;
    }
    addQuestion(title, context) {
        const data = this.createQuestionObject(title, context);
        store.push(data);
        return data;
    }
    findQuestion(id) {
        return store.find((item) => item.id === parseInt(id))
    }
    getId() {
        return (store.length + 1); 
    }
    createQuestionObject(title, context) {
        const id = this.getId();
        return {
            id,
            title,
            context,
            answers: []
        }
    }
}