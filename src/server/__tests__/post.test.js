import { db, newPost } from '../controller/post'

afterAll(async (done) => {
  await db.sequelize.close();
  done();
});

const fakeQuestion = {
  UserId: 1,
  title: 'Title',
  body: 'This is the body',
  type: 'Question',
  PostId: null
};

const fakeAnswer = {
  UserId: 2,
  title: 'Title',
  body: 'this is the body of an answer',
  type: 'Answer',
  PostId: 1
};

class Res {
  status(status) {
    this.status = status;
    console.log('status sent:', status);
    return this;
  }

  send(message) {
    this.sentMessage = message;
    console.log('new message', message);
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