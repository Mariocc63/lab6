module.exports = (app) => {
    const animes = require('../controllers/anime.controller.js');

    app.post('/animes', animes.create);
    
    app.get('/animes', animes.findAll);
    
    app.get('/animes/:animeId', animes.findOne);

    app.put('/animes/:animeId', animes.update);
    
    app.delete('/animes/:animeId', animes.delete);
}
