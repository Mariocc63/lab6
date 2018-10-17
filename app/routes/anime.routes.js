module.exports = (app) => {
    const animes = require('../controllers/anime.controller.js');

    // Create a new anime
    app.post('/animes', animes.create);

    // Retrieve all animes
    app.get('/animes', animes.findAll);

    // Retrieve a single anime with animeId
    app.get('/animes/:animeId', animes.findOne);

    // Update a anime with animeId
    app.put('/animes/:animeId', animes.update);

    // Delete a anime with animeId
    app.delete('/animes/:animeId', animes.delete);
}