import prepareAnalytics from '../../db/util/analytics'

const analytics = (req, res) => {
  return prepareAnalytics()
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(400).json(err));
};

export default analytics