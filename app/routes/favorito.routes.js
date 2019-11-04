module.exports = (app) => {
    const favoritos = require('../controllers/favorito.controller.js');

    // Create a new Note
    app.post('/favoritos', favoritos.create);

    // Retrieve all Notes
    app.get('/favoritos', favoritos.findAll);

    // Retrieve a single Note with noteId
    app.get('/favoritos/:favoritoId', favoritos.findOne);

    // Update a Note with noteId
    app.put('/favoritos/:favoritoId', favoritos.update);

    // Delete a Note with noteId
    app.delete('/favoritos/:favoritoId', favoritos.delete);

    // Check if a celular exists
    app.post('/misfavoritos', favoritos.findFavoritos);
    
}