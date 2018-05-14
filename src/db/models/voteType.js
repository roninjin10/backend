export default (sequelize, DataTypes) => {
  var VoteType = sequelize.define('VoteType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  VoteType.associate = (models) => {
    VoteType.hasMany(models.Vote);
  }
  return VoteType;
};
