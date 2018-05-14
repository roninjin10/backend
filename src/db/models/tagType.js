export default (sequelize, DataTypes) => {
  var TagType = sequelize.define('TagType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  TagType.associate = (models) => {
    TagType.hasMany(models.Tag);
  }
  return TagType
}
