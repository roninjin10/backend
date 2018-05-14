export default (sequelize, DataTypes) => {
  var PostType = sequelize.define('PostType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  PostType.associate = (models) => {
    PostType.hasMany(models.Post)
  }
  return PostType
}
