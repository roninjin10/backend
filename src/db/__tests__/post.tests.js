import db from '../models'

const Post = db.Post;

afterAll(async (done) => {
  await db.sequelize.close()
  done()
});

describe('test functions to interact with post model', () => {
  test('createNewPost should create a new post and getPostsByQuery should retrieve it', async (done) => {
    const UserId = 1;
    const title = 'title';
    const body = 'body';
    const type = 1;

    const post = {
      UserId,
      title,
      body,
    };

    let posts = await Post.getPostsByQuery(post);
    
    const lengthBefore = posts.length;

    await Post.createNewPost({...post, type});

    posts = await Post.getPostsByQuery(post);

    expect(posts.length).toBe(lengthBefore + 1);
    done() 
  }) 
})
