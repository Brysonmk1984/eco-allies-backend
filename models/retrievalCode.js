const RetrievalCodeModel = function(db, DataTypes){
  const RetrievalCode = db.define('Codes', {
    code : {
      type : DataTypes.STRING,
      unique : true,
      validate : {
          notEmpty :true,
          }
    },
    claimed : {
      type : DataTypes.BOOLEAN,
      validate : { 
        notEmpty :true,
      }
    },
    claimedBy : {
      type : DataTypes.STRING,
    }
  });

  return RetrievalCode;
};

module.exports = RetrievalCodeModel;