import { newPost } from '../controller/post'

const fakeQuestion = {
  userid: 1,
  title: 'Title',
  body: 'This is the body',
  type: 'Question',
  associatedQuestionId: null
};

const fakeAnswer = {
  userid: 2,
  title: 'Title',
  body: 'this is the body of an answer',
  type: 'Answer',
  associatedQuestionId: 1
};

class Res {
  status(status) {
    this.status = status;
    return this;
  }

  send(message) {
    this.sentMessage = message;
    return this;
  }

  json(message) {
    return this.send(message);
  }
}

describe('newPost function from controller/post.js', () => {
  const newQuestion = newPost('Question');
  const newAnswer = newPost('Answer');

  test('should create a newQuestion', async () => {
    debugger;
    const req = {body: fakeQuestion};
    const res = new Res();

    await newQuestion(req, res);

    expect(res.status).toBe(201);
  });

  test('should create a newAnswer', async () => {
    const req = {body: fakeAnswer};
    const res = new Res();

    await newAnswer(req, res);

    expect(res.status).toBe(201);
  })
})