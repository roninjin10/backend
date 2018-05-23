import axios from 'axios'
import queryPost from '../../db/util/queryPost'

let recomendations = [];

const getRecomendations = (req, res) => {
  const uid = req.params.uid;
  let recs = recomendations[uid];

  if (recs) {
    res.status(200).json(recs);
  } else {
    queryPost({limitBy: 10})
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(404).json(err.message));
  }
}

const updateRecomendations = async () => {
  const newRecomendations = await axios.get('https://hrr30-enzyme-learning.herokuapp.com/')
}

export default getRecomendations