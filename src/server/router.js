import { Router } from 'express'

import user from './controller/user'
import question from './controller/question'
import answer from './controller/answer'
import queryPostController from './controller/queryPost'

const router = Router();

router.get('/', (req, res) => res.json('Brandon Can\'t hang'));

router.post('/user/signup', user.post.signup);
router.post('/user/signin', user.post.login);
router.post('/user/signout', user.post.logout);

// documentation in db/util/queryPost
router.get('/post', queryPostController);

router.get('/questions/all', question.get.questions.all);
router.get('/questions', question.get.questions);
// returns question and all answers
router.get('/questions/:id', question.get.question); 
router.post('/question', question.post.question);

router.get('/answers/all', answer.get.answers.all);
router.get('/answers', answer.get.answers);
router.get('/answers/:id', answer.get.answer);
router.post('/answer', answer.post.answer);

export default router

