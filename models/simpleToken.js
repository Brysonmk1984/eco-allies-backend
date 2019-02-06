const SimpleTokenModel = function(db, DataTypes){
  const SimpleToken = db.define('UserTokens', {
    token : {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        notEmpty :true,
      }
    },
    items : {
      type : DataTypes.STRING
    },
    owner : {
      type : DataTypes.STRING,
      validate : {
        notEmpty :true,
      }
    }
  });

  return SimpleToken;
};

module.exports = SimpleTokenModel;