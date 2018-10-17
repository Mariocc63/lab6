const Anime = require('../models/anime.model.js');

// Create and Save a new anime
exports.create = (req, res) => {

};

// Retrieve and return all animes from the database.
exports.findAll = (req, res) => {

};

// Find a single anime with a animeId
exports.findOne = (req, res) => {

};

// Update a anime identified by the animeId in the request
exports.update = (req, res) => {

};

// Delete a anime with the specified animeId in the request
exports.delete = (req, res) => {

};

// Create and Save a new anime
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Anime content can not be empty"
        });
    }

    // Create a Anime
    const anime = new Anime({
        nombre: req.body.title || "Untitled Note", 
        genero: req.body.content,
        temporadas: req.body.temporadas
    });

    // Save Anime in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all animes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(animes => {
        res.send(animes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving animes."
        });
    });
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};
