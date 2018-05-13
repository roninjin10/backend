import { postsByType, postById, newPost } from './post'

const TYPE = 'Question';

let question = {
  get: {},
  post: {},
  patch: {}
};

question.get.questions = (req, res) => res.end('TODO for machine learning');

question.get.questions.all = postsByType(TYPE);

question.post.question = newPost(TYPE);

question.get.question = postById(TYPE);

export default question