import store from '../model/store';

export default class QuestionController {
  constructor() {
    this.store = store;
  }

  getAllQuestions() {
    return this.store;
  }

  getQuestion(id) {
    const data = this.findQuestion(id);
    return (data) || false;
  }

  addQuestion(title, context) {
    const data = this.createQuestionObject(title, context);
    store.push(data);
    return data;
  }

  findQuestion(id) {
    return this.store.find(item => item.id === parseInt(id, 10));
  }

  getId() {
    return (this.store.length + 1);
  }

  createQuestionObject(title, context) {
    const id = this.getId();
    return {
      id,
      title,
      context,
      answers: [],
    };
  }
}
