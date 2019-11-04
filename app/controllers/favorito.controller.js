const Favorito = require('../models/favorito.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.usuario || !req.body.alias || !req.body.numero) {
        return res.status(400).send({
            message: "Favorito content can not be empty"
        });
    }

    
    Favorito.find({usuario:req.body.usuario,numero: req.body.numero})
    .then(favorito => {
        var existe = false;
        if(favorito.length > 0) {
            existe = true;
        }

        if(!existe) {
            // Save Note in the database
            // Create a Note
            const favoritoModel = new Favorito({
                usuario: req.body.usuario,
                alias: req.body.alias || "Untitled Favorito", 
                numero: req.body.numero
            });
            favoritoModel.save()
            .then(data => {
                res.send({
                    error: false,
                    'mensaje': 'Favorito agregado'
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Favorito."
                });
            });
        } else {
            res.send({ 
                error: true,
                'mensaje': 'Ya existe este favorito'
             });
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.body.numero
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.body.numero
        });
    });



  
    
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Favorito.find()
    .then(favoritos => {
        res.send(favoritos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Favorito.findById(req.params.favoritoId)
    .then(favorito => {
        if(!favorito) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.favoritoId
            });            
        }
        res.send(favorito);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.favoritoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.favoritoId
        });
    });
};

// Check if a given numero already exists
exports.findFavoritos = (req, res) => {
    Favorito.find({usuario: req.body.usuario})
    .then(favorito => {
        if(!favorito) {
            console.log('aqui1')
            return res.status(404).send({
                error: true,
                message: "Hubo un problema"
            });            
        }

        //if(favorito)
        if(favorito.length > 0) {
            res.send({
                error: false,
                mensaje: 'Favoritos encontrados',
                favoritos: favorito
            });
        } else {
            res.send({
                error: true,
                mensaje: 'Ningun favorito encontrado',
                favoritos: favorito
            });
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.body.numero
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.body.numero
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Favorito content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.favoritoId, {
        alias: req.body.alias || "Untitled Favorito",
        numero: req.body.numero
    }, {new: true})
    .then(favorito => {
        if(!favorito) {
            return res.status(404).send({
                message: "Favorito not found with id " + req.params.favoritoId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Favorito not found with id " + req.params.favoritoId
            });                
        }
        return res.status(500).send({
            message: "Error updating favorito with id " + req.params.favoritoId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};