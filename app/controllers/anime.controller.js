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
        nombre: req.body.title || "Untitled Anime", 
        genero: req.body.content,
        temporadas: req.body.temporadas
    });

    // Save Anime in the database
    anime.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Anime."
        });
    });
};

// Retrieve and return all animes from the database.
exports.findAll = (req, res) => {
    Anime.find()
    .then(animes => {
        res.send(animes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving animes."
        });
    });
};


// Find a single anime with a animeId
exports.findOne = (req, res) => {
    Anime.findById(req.params.animeId)
    .then(anime => {
        if(!anime) {
            return res.status(404).send({
                message: "Anime not found with id " + req.params.animeId
            });            
        }
        res.send(anime);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Anime not found with id " + req.params.animeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving anime with id " + req.params.animeId
        });
    });
};

// Update a anime identified by the animeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Anime name can not be empty"
        });
    }

    // Find anime and update it with the request body
    Anime.findByIdAndUpdate(req.params.animeId, {
        nombre: req.body.nombre || "Untitled Anime",
        genero: req.body.genero,
        temporadas: req.body.temporadas
    }, {new: true})
    .then(anime => {
        if(!anime) {
            return res.status(404).send({
                message: "Anime not found with id " + req.params.animeId
            });
        }
        res.send(anime);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Anime not found with id " + req.params.animeId
            });                
        }
        return res.status(500).send({
            message: "Error updating anime with id " + req.params.animeId
        });
    });
};

// Delete a anime with the specified animeId in the request
exports.delete = (req, res) => {
    Anime.findByIdAndRemove(req.params.animeId)
    .then(anime => {
        if(!anime) {
            return res.status(404).send({
                message: "Anime not found with id " + req.params.animeId
            });
        }
        res.send({message: "Anime deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Anime not found with id " + req.params.animeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete anime with id " + req.params.animeId
        });
    });
};
