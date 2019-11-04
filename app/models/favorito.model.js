const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoritoSchema = new Schema(
    {
        usuario: String,
        alias: String,
        numero: String
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Favorito', FavoritoSchema);