const arkadiaAddress = '0x667deb5a98f77052cf561658575cf1530ee42c7a';
const LIVE_NET = false;

// Setup web3 and the provider
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const keys = require('./keys');
var infura_apikey = keys.infura_apikey;
var mnemonic = keys.mnemonic;
var rinkebyProvider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infura_apikey);
var liveProvider    = new HDWalletProvider(mnemonic, "https://mainnet.infura.io/" + infura_apikey);

// **************************************************
// Web3/Ethreum
let ethContract;
const HashCommit = require('./HashCommit.json');

if (LIVE_NET) {
  const web3 = new Web3(liveProvider);
  ethContract = new web3.eth.Contract(HashCommit.abi, HashCommit.networks['1'].address);
}
else{
  const web3 = new Web3(rinkebyProvider);
  ethContract = new web3.eth.Contract(HashCommit.abi, HashCommit.networks['4'].address);
}

const eth_getMasterHash = async () => await ethContract.methods.masterHash().call();
const eth_updateHash = async (hashValue) => await ethContract.methods.updateHash(hashValue).send({from: arkadiaAddress});

// **************************************************
// Misc
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

// **************************************************
// Routes
exports.createNameByPost = (req, res) => console.log(req.query);

exports.unhashed = function(req, res) {
  json = entry1_getJsonAndHash(req, res);
  
  eth_updateHash(json._hashVal.toString()).then(i=>{
    return eth_getMasterHash(i);
  }).then(console.log);

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
