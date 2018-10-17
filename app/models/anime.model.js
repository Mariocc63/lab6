const mongoose = require('mongoose');

const AnimeSchema = mongoose.Schema({
    nombre: String,
    genero: String,
    temporadas: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Anime', AnimeSchema);