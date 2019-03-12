const express = require('express');
const router = express.Router(); 
const RetrievalCode = require('../db').RetrievalCode;
const SimpleToken = require('../db').SimpleToken;
const sendMail = require('../mail.js');

// LOGIN TO EXISTING ACCOUNT
router.post('/retrieval-code', function(req, res, next){

  RetrievalCode.find({
    where : {
      code : req.body.code
    },
    attributes:['code', 'claimed', 'claimedBy']
  }).then((codeData, err) => {
    if(codeData){
      if(codeData.claimed){
        res.json({
          error: 'Invalid Code',
          claimedBy : codeData.claimedBy,
          requestType : 'POST',
          success : false
        });
      }else{
        res.json({
          code : codeData.code,
          claimed : codeData.claimed,
          claimedBy : codeData.claimedBy,
          requestType : 'POST',
          success : true
        });
      }
    }else{
      res.json({
        error: 'Invalid Code',
        requestType : 'POST',
        success : false
      });
    }
    next();
  });
});

router.post('/check-param', function(req, res, next){

  RetrievalCode.find({
    where : {
      qrParam : req.body.param
    },
    attributes:['code', 'claimed', 'claimedBy']
  }).then((codeData, err) => {
    console.log('!!! getting ready to send code data', err);
    if(codeData){
      if(codeData.claimed){
        res.json({
          error: 'Invalid Code',
          claimedBy : codeData.claimedBy,
          requestType : 'POST',
          success : false
        });
      }else{
        res.json({
          code : codeData.code,
          claimed : codeData.claimed,
          claimedBy : codeData.claimedBy,
          qrParam : codeData.qrParam,
          requestType : 'POST',
          success : true
        });
      }
    }else{
      res.json({
        error: 'Invalid Code',
        requestType : 'POST',
        success : false
      });
    }
    next();
  });
});



router.post('/proof', function(req, res, next){
  new Promise((resolve, reject) =>{
    sendMail({filename : req.files.file.name, message : req.body.message, file : req.files.file.data}, resolve, reject);
  }).then((data) =>{
    res.json({
      success : true,
      requestType : 'POST',
      info : data
    });
    next();
  });
});

router.post('/retrieve-simple-tokens', function(req, res, next){
  SimpleToken.findAll({
    where : {
      owner : req.body.owner
    },
    attributes : ['token', 'items', 'id']
  })
  .then((tokenData, err) =>{
    console.log('Simple Token Data', tokenData);
    const tokenArray = tokenData.map((t, i) =>{
      return {dna : t.dataValues.token, id : `S${t.dataValues.id}`};
    });

    if(err){
      res.json({
        success : false,
        requestType : 'POST',
      });
    }
    if(tokenData){
      res.json({
        success : true,
        requestType : 'POST',
        tokenArray : tokenArray
      });
    }
    next();
  })
  .catch((err) =>{console.log('CAUGHT ERR', err);
    res.json({ requestType : 'POST', success : false, error : err });
    next();
  });
  
});

router.post('/insert-simple-token', function(req, res, next){
  
  SimpleToken.create({...req.body})
  .then((token)=>{
    res.json({
      requestType : 'POST', success : true, data : {token : token.dataValues}
    });
    next();
  })
  .catch((err) =>{console.log('CAUGHT ERR', err);
    res.json({ requestType : 'POST', success : false, error : err });
    next();
  });
  
});

module.exports = router;