const web3 = require('web3');
const Blockapi = require('../models/blockapi.model.js');

const createName = (req, res, first, last) => {
  const params_hash = web3.utils.soliditySha3('first', 'last');
  const name = new Blockapi({
      first: first || "First Name Missing",
      last: last


  });

  // Save Note in the database
  name.save()
  .then(data => {
      res.send({hash: params_hash, data: data});
      console.log({hash: params_hash, data: data});
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while inputing Name."
      });
  });
}

exports.unhashed = function(req, res) {

    // Access the provided 'page' and 'limt' query parameters
    let first = req.query.first;
    let last = req.query.last;

    createName(req, res, first, last);

};

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
