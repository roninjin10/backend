export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [3, 150],
          msg: 'Please enter a title between 3 and 150 characters'
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 2000],
          msg: 'Please enter a post between 1 and 2000 characters'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'comment'
    },
    viewCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    answerCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    isTopAnswer: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    commentCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    favoriteCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    upvoteCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    closedDate: {
      allowNull: true,
      type: DataTypes.DATE
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.belongsTo(models.Post);
    Post.hasMany(models.Post);
    Post.belongsTo(models.PostType);
    Post.hasMany(models.Tag);
    Post.hasMany(models.Vote);
    Post.hasMany(models.View);
  };

  Post.getAllPosts = () => Post.findAll({
    include: [{all: true}]
  });

  Post.getPost = (id) => Post.findOne({
    where: {id}
  })

  Post.getPostsByType = (type) => Post.findAll({
    where: {type}
  });

  Post.getPostsByQuery = (query) => Post.findAll({
    where: query
  });

  Post.createNewPost = async ({userid, title, body, type, postId}) => {
    await Post.create({
      userid,
      title,
      body,
      type,
      PostId: postId
    });

    if (postId) {
      await Post.incComment(postId);
    }
  }

  Post.destroyPost = async (id) => {
    let post;
    try {
      post = await Post.getPost(id);
    } catch(err) {
      throw new Error('post does not exist');
    }
    
    await Post.destroy({
      where: {id}
    });
    
    const question = post.PostId;
    if (question) {
      await Post.decComment(id);
    }
  }

  Post.getPostById = (postId) => Post.findById(postId);

  Post.incView = async (questionId) => {
    await Post.increment('viewCount', {
      where: {
        PostId: questionId
      }
    });
    await Post.increment('viewCount', {
      where: {
        id: questionId
      }
    });
  };

  const incField = (field) => (id) => Post.increment(field, {where: {id}});
  const decField = (field) => (id) => Post.decrement(field, {where: {id}});
  
  Post.incVote = incField('upvoteCount');
  Post.decVote = decField('upvoteCount');

  Post.incComment = incField('commentCount');
  Post.decComment = decField('commentCount');

  Post.incFavorite = incField('favoriteCount');
  Post.decFavorite = decField('favoriteCount');

  Post.close = (id, isTopAnswer = false) => Post.update({
    closedDate: DataTypes.fn('NOW'),
    isTopAnswer
  });

  return Post;

}