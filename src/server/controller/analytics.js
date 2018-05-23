import prepareAnalytics from '../../db/util/analytics'
import queryPost from '../../db/util/queryPost'

const exampleResponse = {
  userId: 1,
  1: 300,
  2: 400,
  3: 500,
}


const scorePost = (user, post) => {
  const usersPost = post.UserId === user.id;
  const popularity = post.viewCount + post.answerCount + post.upvoteCount;
  const views = post.Views.filter(view => view.UserId === user.id).length;
  const votes = post.Votes.filter(vote => vote.UserId === user.id).length;
  return usersPost * 50 + popularity * 10  + votes * 25 + views * 15;
}


const analytics = async (req, res) => {
  const userData = await prepareAnalytics()
  const postData = await queryPost({limitBy: 'all', sortBy: '-createdAt'});

  let out = [];

  for (const user of userData) {
    let push = {id: user.id};
    
    for (const post of postData) {
      const qid = post.PostId || post.id;
      push[qid] = scorePost(user, post) + (push[qid] || 0);
    }
    out.push(push);
  }
  res.status(200).json({pastData: out.slice(501), currentData: out.slice(0, 501)});
};

export default analytics