const mongoose = require('mongoose');

const AnimeSchema = mongoose.Schema({
    nombre: String,
    genero: String,
    temporadas: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Anime', AnimeSchema);