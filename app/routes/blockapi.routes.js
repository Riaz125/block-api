module.exports = (app) => {
    const blockapi = require('../controllers/blockapi.controller.js');

    app.post('/unhashed', blockapi.unhashed);

    app.post('/hashed', blockapi.createNameByPost);

    // app.post('/mixed', )
}
