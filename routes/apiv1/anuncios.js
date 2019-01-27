'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

/**
 * GET /anuncios
 * Obtener una lsita de anuncios
 */
router.get('/', async (req, res, next) => {
    try{

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

        if(nombre){ filter.nombre = nombre; }
        if(venta){ filter.venta = venta; }
        if(precio){ filter.precio = precio; }
        if(tags){ filter.tags = tags; }

        // buscamos la información de los anuncios en nuestra base de datos
        const anuncios = await Anuncio.listar(filter, skip, limit, fields, sort);

        res.json( { sucess: true, results: anuncios });
    } catch(err){
        next(err);
        return;
    }
});

/**
 * GET /anuncios/:id
 * Obtener un agente
 */
router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;

        const anuncio = await Anuncio.findById(id).exec();

        res.json({ sucess: true, result: anuncio });
    }catch(err){
        next(err);
        return;
    }
});

/**
 * POST /anuncios
 * Crear un anuncio
 */
router.post('/', async (req, res, next) => {
    try{
        const data = req.body;

        const anuncio = new Anuncio(data);

        const anuncioInsertado = await anuncio.save();

        res.json({sucess: true, result: anuncioInsertado });

    }catch(err){
        next(err);
        return;
    }
});



module.exports = router;