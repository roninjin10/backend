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
]

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
]

const parseFilterParams = (queryParams) => ({
  where: filterParams.reduce((a, e) => {
    if (e in queryParams) {
      a[e] = queryParams[e];
    }
  }, {})
});

const parseSortParams = (queryParams) => {
  const filters = filterParams.reduce((a, e) => {
    if (e === 'sortBy') {

      const field = queryParams[e];
      let direction = field.splice(0,1);
      
      if (!['+', '-'].includes(direction)) {
        throw new Error('no direction specified for sortBy');
      } else if (!sortParams.includes(field)) {
        throw new Error('sortBy parameter is invalid');
      }
      
      a.push([field, direction === '+' ? 'ASC' : 'DESC']);
    }
  }, []);
  
  return filters.length > 0 ? {
    order: filters
  } : {};
}

const parseLimitParams = (queryParams) => {
  if ('limitBy' in queryParams) {
    return {
      limit: queryParams[limitBy]
    };
  }
  return {};
}

const createQuery = (queryParams) => {
  const where = parseFilterParams(queryParams);
  const sort = parseSortParams(queryParams);
  const limit = parseLimitParams(queryParams);

  return {...where, ...sort, ...limit};
};

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
