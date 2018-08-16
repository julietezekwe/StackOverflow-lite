import store from '../model/store';

export default class AnswerController {
  constructor() {
    this.store = store;
    this.activeQuestion = null;
  }

  addAnswer(id, answer) {
    this.activeQuestion = this.findQuestion(id);
    const data = this.createAnswerObject(answer);
    this.activeQuestion.answers.push(data);
    return data;
  }

  findQuestion(id) {
    return this.store.find(item => item.id === parseInt(id, 10));
  }

  createAnswerObject(answer) {
    const id = this.getId();
    return {
      id,
      answer,
    };
  }

  getId() {
    return (this.activeQuestion.answers.length + 1);
  }
}
