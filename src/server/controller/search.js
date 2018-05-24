import client from "../../search/";
import esb from "elastic-builder";

let search = {
  get: {}
};

search.get.documents = (req, res) => {
  const requestBody = esb
    .requestBodySearch()
    .query(esb.matchQuery("body", req.query.search));

  client
    .search({
      index: "posts",
      body: requestBody.toJSON()
    })
    .then(resp => {
      const hits = resp.hits.hits;
      res.status(200).json({
        results: hits
      })
    })
    .catch(err => {
      res.status(404).json(err)
    });
};

search.get.suggestions = (req, res) => {
  const suggest = esb.completionSuggester('title-suggest', 'suggest').prefix(req.query.search);

  client.search({
    index: 'title',
    body: {'suggest': suggest.toJSON()}
  })
  .then(resp => {
    const hits = resp.suggest;
    res.status(200).json({
      results: hits
    })
  })
  .catch(err => {
    res.status(404).json(err)
  });
}

export default search;

// client.search({
//   index: 'twitter',
//   type: 'tweets',
//   body: {
//     query: {
//       match: {
//         body: 'elasticsearch'
//       }
//     }
//   }
// }).then(function (resp) {
//     var hits = resp.hits.hits;
// }, function (err) {
//     console.trace(err.message);
// });
