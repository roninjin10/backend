import axios from 'axios'
import queryPost, { db } from '../../db/util/queryPost'
import Promise from 'bluebird'

let recomendations = [];

const getRecomendations = (req, res) => {
  const uid = req.params.uid;
  let recs = recomendations[uid];

  if (recs) {
    Promise.map(recs, (rec) => db.Post.findById(rec[0]))
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json(err.message));
  } else {
    queryPost({limitBy: 10})
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(404).json(err.message));
  }
}

const updateRecomendations = async () => {
  const newRecomendations = await axios.get('https://hrr30-enzyme-learning.herokuapp.com/')
  if (Array.isArray(newRecomendations)) {
    recomendations = newRecomendations;
  }
}

const MINUTES = 10;
setInterval(updateRecomendations, 1000 * 60 * MINUTES)

export default getRecomendations