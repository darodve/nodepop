const express = require('express');
const router = express.Router();

const Anuncio = require('../models/Anuncio');

// const {
//     query,
//     params,
//     body,
//     validationResult
// } = require('express-validator/check');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.locals.descripcion = 'Anuncions de Compra/Venta';
    res.render('index');
});

// Get all ads (without filter)
router.get('/anuncios', async (req, res, next) => {
    res.locals.descripcion = 'Anuncions de Compra/Venta';
    try {
        // recogemos valores de entrada
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};

        if (nombre) { filter.nombre = new RegExp('^' + req.query.nombre, 'i'); }
        if (venta) { filter.venta = venta; }
        if (precio) { filter.precio = await Anuncio.filtrarPrecio(precio); }
        if (tags) { filter.tags = tags; }

        // filtramos los anuncios
        const result = await Anuncio.listar(filter, skip, limit, fields, sort);

        // enviamos a la vista los anuncios
        res.locals.anuncios = result;
        res.render('index');

    } catch (err) {
        console.log('Ups, an error', err);
        process.exit(1);
    }
});

router.get('/tags', async (req, res, next) => {
    res.locals.descripcion = 'Tags sobre Anuncions de Compra/Venta';
    try {
        const result = await Anuncio.obtenerTags();
        const listTags = [];

        result.forEach((tag) => {
            let tagsValue = tag.tags;

            tagsValue.forEach((tag) => {
                if (!listTags.includes(tag)) {
                    listTags.push(tag);
                }
            });
        });

        res.locals.tags = listTags;
        res.render('tags');

    } catch (err) {
        console.log('Ha ocurrido un error', err);
        process.exit(1);
    }
});

module.exports = router;
