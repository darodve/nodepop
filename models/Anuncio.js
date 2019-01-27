'use strict';

const mongoose = require('mongoose');

// definimos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },
    venta: {
        type: Boolean,
        index: true
    },
    precio: {
        type: Number,
        index: true
    },
    foto: String,
    tags: {
        type: [String],
        index: true
    }
}, {
    collection: 'anuncios'
});

anuncioSchema.statics.listar = (filtro, skip, limit, fields, sort) => {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);

    return query.exec();
};

anuncioSchema.statics.obtenerTags = function () {
    const dataTags = Anuncio.find();
    dataTags.select('tags');
    return dataTags.exec();
};

anuncioSchema.statics.filtrarPrecio = function(precio) {
    if (precio.includes('-')) {
        precio = precio.split('-');
        const precioMaximo = precio[0] !== '' ? parseInt(precio[0]) : '';
        const precioMinimo = precio[1] !== '' ? parseInt(precio[1]) : '';

        if (precioMaximo !== '' && precioMinimo !== '') {
            return { '$gte': precioMaximo, '$lte': precioMinimo }
        } else if (precioMaximo !== '') {
            return { '$gte': precioMaximo }
        } else {
            return { '$lte': precioMinimo }
        }
    } else { //si no tengo intervalo no lo trato
        return parseInt(precio);
    }
};

// creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
