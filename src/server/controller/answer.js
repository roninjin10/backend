import { postsByType, postById, newPost } from './post'

const TYPE = 'Answer';

let answer = {
  get: {},
  post: {},
  patch: {}
};

answer.get.answers = (req, res) => res.end('TODO for machine learning');

answer.get.answers.all = postsByType(TYPE);

answer.post.answer = newPost(TYPE);

answer.get.answer = postById(TYPE);

export default answer