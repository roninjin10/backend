import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 2000],
          msg: 'Please enter a password with at least 8 characters'
        }
      }
    },
  }, {
    /*
     *  this hook is making sure we encrypt the password before storing in database
     */
    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Post);
  };
  return User;
};