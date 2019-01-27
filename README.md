# NodePop

Para inicializar el proyecto:

```shell
npm install
```

## Inicialización de la base de datos

Verifica la cadena de conexión a la base de datos en lib/connectMongoose.js

Puedes utilizar el script de inicialización de la base de datos con:

```shell
npm run install_db
```

## Arranque

Para arrancar el proyecto usar:

* En producción:

```shell
npm run start
```

* En desarrollo:

```shell
npm run dev
```

## Rutas de la página

* http://localhost:3000/
* http://localhost:3000/anuncios
* http://localhost:3000/tags

## Rutas del API

* http://localhost:3000/apiv1/anuncios

Retorna la lista de artículos en formato JSON.

## Otra información

### Para arrancar un servidor de MongoDB desde consola:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```
Sólo para sistemas operativos que no lo tengan instalado como servicio (MongoDB en Windows se instala como servicio por defecto).

### Parámetros de filtrado de los anuncios:

Nombre: String 

Venta: true/false

Precio: Number

Tags: work, lifestyle, motor y mobile



### Errores comunes:

* Si el proceso devuelve un error **2000** existe un error de conexión a la Base de Datos de *MongoDB*. 

*Solución*: Revise la conexión a la Base de Datos.


