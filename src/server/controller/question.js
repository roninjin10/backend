import { postsByType, postById, newPost } from './post'
import db from '../../db/models'

Post = db.Post;

const TYPE = 'Question';

let question = {
  get: {},
  post: {},
  patch: {}
};

question.get.questions = (req, res) => res.end('TODO for machine learning');

question.get.questions.all = postsByType(TYPE);

question.post.question = newPost(TYPE);

question.get.question = async (res, res) => {
  const id = res.params.id
  try {
    const question = await Post.getPostById(id);
    const answers = await Post.getPostByQuery({PostId: id});
    res.status(200).json({
      question: question,
      answers: answers
    });
  } catch(err) {
    res.status(404).json(err);
  }
};

export default question