import db from '../models'

/*
 * not case sensitive though
 * 
 * Examples of how to use filter params:
 * 
 *  http://catalyst/posts/?UserId=1&PostTypeId=5
 * 
 * http://catalyst/posts/?isTopAnswer=true
 *
 */

const filterParams = [
  'id',
  'PostId',
  'UserId',
  'title',
  'PostTypeId',
  'isTopAnswer',
  'tagName',
];

/*
 * Examples of how to use sort params:
 * 
 * sort by viewCount ascending
 * http://catalyst/posts/?sortBy=+viewCount 
 * 
 * sort by createdAt descending
 * http://catalyst/posts/?sortBy=-createdAt
 * 
 */
const sortParams = [
  'viewCount',
  'answerCount', 
  'favoriteCount',
  'upvoteCount',
  'createdAt',
  'closedDate',
];

/*
 * Examples of how to use other params:
 * 
 * get the top 50 upvoted posts
 * 
 * http://catalyst/posts/?sortBy=-upVoteCount&limitBy=50
 * 
 */

const otherParams = [
  'limitBy',
];

const parseFilterParams = (queryParams) => ({
  where: filterParams.reduce((a, e) => {
    if (e in queryParams) {
      console.log('e in queryParams', queryParams, e, a[e], queryParams[e])
      return {
        ...a,
        [e]: queryParams[e],
      };
    }
    return a;
  }, {})
});

const parseSortParams = (queryParams) => {
  let field = queryParams['sortBy'];
  if (field) {
    let fieldArr = field.split('')
    let direction = fieldArr.splice(0,1)[0];
    
    field = fieldArr.join('');
    if (!['+', '-'].includes(direction)) {
      throw new Error('no direction specified for sortBy');
    } else if (!sortParams.includes(field)) {
      throw new Error('sortBy parameter is invalid');
    }
    
    return {
      order:  [
        [field, direction === '+' ? 'ASC' : 'DESC']
      ],
    };
  }
  return {};
}

const parseLimitParams = (queryParams) => {
  if ('limitBy' in queryParams) {
    if (queryParams['limitBy'] === 'all') {
      return {};
    }
    return {
      limit: queryParams['limitBy']
    };
  }
  return {limit: 50};
}

const createQuery = (queryParams) => {
  const where = parseFilterParams(queryParams);
  const sort = parseSortParams(queryParams);
  const limit = parseLimitParams(queryParams);

  return {...where, ...sort, ...limit};
};

const queryPost = (queryParams) => {
  const query = createQuery(queryParams);
  return db.Post.findAll(query);
}

export { db } 
export default queryPost

/*


we want to be able to sort by views

we want to be able to sort by comments

we want to be able to sort by favorites

we want to be able to sort by upvotes

we want to be able to sort by date posted

we want to be able to sort by date question closed

we want to be able to filter by tag

we want username, tagname, questionname and other identification not just the id number on our queries.

*/
