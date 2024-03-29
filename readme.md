# Respirar - Módulo mapas - Backend

**Proyecto Final**.

Trabajo práctico

Alumnos: Mateo Amarillo - Patricio Córdoba

Profesores: Jorge Velurtas - Martín Sarquis Rivas

****

## Este proyecto utiliza: ##

- **NodeJs** - https://nodejs.org/
- **express** - https://expressjs.com/
- **express-validator** - https://express-validator.github.io/
- **bcrypt** - https://github.com/kelektiv/node.bcrypt.js
- **cookie-parser** - https://github.com/expressjs/cookie-parser
- **dotenv** - https://github.com/motdotla/dotenv
- **jsonwebtoken** - https://github.com/auth0/node-jsonwebtoken
- **mongodb** - https://www.mongodb.com/
- **morgan** - https://github.com/expressjs/morgan
- **eslint** - https://eslint.org/
- **prettier** - https://prettier.io/

****

## Setup Local
**Requisitos**
- Node 16
- Docker (con docker-compose)
- Postman

#### 1- Instalar dependencias ####
```bash
$ npm install
```
#### 2- Completar archivo .env (si no existe, crear uno en la raíz del proyecto)
```env
ORION_BASE_URL = {orion_url}
CYGNUS_DATABASE = {nombre_database}
MONGODB_URI = {mongoDb_uri}
```
#### 3- Correr el proyecto en modo dev (actualiza automáticamente ante cambios en el código) ####
```bash
$ npm run start-dev
```

#### 4- Correr el Docker Compose con los módulos de Fiware necesarios ####
```bash
$ cd localOrion
$ docker-compose up
```
Esto descarga las imágenes de docker de Orion, Cygnus y MongoDb y disponibiliza sus puertos.

#### 5- Generar información en Orion ####
Importar la [Colección de Postman](localOrion/Orion%20Local.postman_collection.json) y ejecutar los request de creación de estaciones y subscripción a Cygnus

****

## Correr imagen de docker
#### 1- Crear imágen ####
En el directorio raíz del proyecto, correr:
```bash
$ docker build -f Dockerfile -t patricioc7/respirar-mapas-backend .
```

#### 2- Correr imágen ####
En el directorio raíz del proyecto, correr:
```bash
$ docker run -e CYGNUS_DATABASE=sth_default -p 3031:3031 -e MONGODB_URI="{MONGODB_URI}" -e ORION_BASE_URL="{ORION_BASE_URL}" -e CYGNUS_DATABASE="{CYGNUS_DATABASE}" patricioc7/espirar-mapas-backend
```

****

## Endpoints

**GET** `/stations` Devuelve todas las estaciones

**GET** `/stations/{stationId}` Devuelve los datos actualizados de la estación y una lista de los parametros de los que se tiene evolución histórica


**GET** `/stations/{stationId}/history` Devuelve la evolución histórica de un parámetro de una estación  (detalles en query params)
```url
stations/{stationId}/history?fromDate={fromDate}&toDate={toDate}&parameter={parameter}
```

**POST** `/user/login` Logueo de usuario (devuelve JWT) - 
```json 
{
    "username": "carlosgomez@gmail.com",
    "password": "pass1234"
}
```
