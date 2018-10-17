const web3 = require('web3');
const HashCommit = require('HashCommit');

let ethContract;
HashCommit.deployed().then(c => {ethContract = c;});


const entry1_getJsonAndHash = (req, res) => {
  let first = req.body.first;
  let last = req.body.last;

  const hashVal = web3.utils.soliditySha3(first, last);
  
  const json = 
    { first: first
    , last: last
    , _hashVal: hashVal
    };

  return json;
}

function updateEthHash(hash) {
  return ethContract.updateHash(hash).then(tx => { return tx; });
}

exports.createNameByPost = (req, res) => console.log(req.query);

exports.unhashed = function(req, res) {
  json = entry1_getJsonAndHash(req, res);
  // updateEthHash(json._hashVal).then(tx=>console.log(tx));

  // todo
  // use ipfs hash
  // put on ipfs
  // less frequenet hashing
  // error handling if tx fails
};
/*
exports.createNameByPost = function(req, res) {
  if(!req.body.first || !req.body.last) {
      return res.status(400).send({
          message: "First and last name needed."
      });
  }
  let first = req.body.first;
  let last = req.body.last;

  // Save Note in the database
  createName(req, res, first, last);
};
*/
