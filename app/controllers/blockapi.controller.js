const LIVE_NET = false;

// Setup web3 and the provider
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const keys = require('./keys');
var infura_apikey = keys.infura_apikey;
var mnemonic = keys.mnemonic;
var rinkebyProvider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infura_apikey);
var liveProvider    = new HDWalletProvider(mnemonic, "https://mainnet.infura.io/" + infura_apikey);

const arkadiaAddress = '0x667deb5a98f77052cf561658575cf1530ee42c7a';

// /* Web3
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

// eth_updateHash('0x13').then(i=>console.log(i.events.Hash.returnValues));

//  const eth_getAllHashses = async () => {  return ; }

// myFn().then(i => console.log(i));

// */

/* Truffle5
var contract = require("truffle-contract");
const HashCommitJson = artifacts.require('./HashCommit.json');
MetaCoin.setProvider(rinkebyProvider);
const HashCommit = contract(HashCommitJson);
let ethContract;
HashCommit.deployed().then(c=>{ethContract=c;});
// */

/* Truffle5 attempt 2
var contract = require("truffle-contract");
const HashCommit = require('./HashCommit.json');
const Blah = artifacts.require('./HashCommit.sol');

var ethContract = contract({
  abi: HashCommit.abi,
  unlinked_binary: HashCommit.deployedBytecode,
  address: HashCommit.networks['4'].address, // optional
})
ethContract.setProvider(rinkebyProvider);

//const myFn = async () => console.log(ethContract);
// myFn().then(i=>{return;});
// */

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


exports.createNameByPost = (req, res) => console.log(req.query);

exports.unhashed = function(req, res) {
  json = entry1_getJsonAndHash(req, res);
  
  eth_updateHash(json._hashVal.toString()).then(i=>{
    return eth_getMasterHash(i);
  }).then(console.log);

  //console.log(ethContract);
  // console.log(json);
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
