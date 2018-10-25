const Anime = require('../models/anime.model.js');

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.create = (req, res) => {
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Anime name can not be empty"
        });
    }

    const anime = new Anime({
        nombre: req.body.nombre || "Untitled Anime", 
        genero: req.body.genero,
        temporadas: req.body.temporadas
    });

    anime.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al crear"
        });
    });
};

exports.findAll = (req, res) => {
    Anime.find()
    .then(animes => {
        res.send(animes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al desplegar la lista"
        });
    });
};

exports.findOne = (req, res) => {
    Anime.findById(req.params.animeId)
    .then(anime => {
        if(!anime) {
            return res.status(404).send({
                message: "Anime no encontrado con id " + req.params.animeId
            });            
        }
        res.send(anime);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Anime no encontrado con id " + req.params.animeId
            });                
        }
        return res.status(500).send({
            message: "Error " + req.params.animeId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Anime nombre no puede estar vacío"
        });
    }
    
    Anime.findByIdAndUpdate(req.params.animeId, {
        nombre: req.body.nombre || "Untitled Anime",
        genero: req.body.genero,
        temporadas: req.body.temporadas
    }, {new: true})
    .then(anime => {
        if(!anime) {
            return res.status(404).send({
                message: "Anime no encontrado con id " + req.params.animeId
            });
        }
        res.send(anime);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Anime no encontrado con id " + req.params.animeId
            });                
        }
        return res.status(500).send({
            message: "Error al actualiazar con id " + req.params.animeId
        });
    });
};

exports.delete = (req, res) => {
    Anime.findByIdAndRemove(req.params.animeId)
    .then(anime => {
        if(!anime) {
            return res.status(404).send({
                message: "Anime no encontrado con id " + req.params.animeId
            });
        }
        res.send({message: "Anime borrado exitosamente"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Anime no encontrado con id " + req.params.animeId
            });                
        }
        return res.status(500).send({
            message: "No se pudo borrar " + req.params.animeId
        });
    });
};
