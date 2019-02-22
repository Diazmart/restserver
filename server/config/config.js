


//Definiendo el puerto para 
//producción(PORT) o para desarrollo(3000)
process.env.PORT = process.env.PORT || 3000; //si no existe process.env.PORT entonces toma el puerto 3000 - el local-


//---------------------------
//		Entorno
//---------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //si process.env.NODE_ENV no existe entonces estamos en dev -developer-


//---------------------------
//		Data Base
//---------------------------

let urlDB;

//if (process.env.NODE_ENV === 'dev'){
//	urlDB = 'mongodb://localhost:27017/comitdb';
//} else {
	//base en mongoDB atlas con djdim
	//urlDB = 'mongodb://restUser:M4st3rk3y.%25@ds021010.mlab.com:21010/heroku_d46wp3bg';
	//El M4st3rk3y.%25 es el password, pero el punto (.) es aceptado mientras que el porcentaje (%) no es aceptado.
	//Entonces pongo el Hex del ascci de porcentaje (%) que es 25 y cualquier caracter escapado
	//se representa con un %HEX, asi queda % = %25
	urlDB = 'mongodb://donbicho:M4st3rk3y@cluster0-shard-00-00-9mtiz.mongodb.net:27017,cluster0-shard-00-01-9mtiz.mongodb.net:27017,cluster0-shard-00-02-9mtiz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
	//Esta de abajo es con la cuenta de diazmart
	//urlDB = 'mongodb://restUserComit:M4st3rk3y@cluster0-shard-00-00-rv1wz.mongodb.net:27017,cluster0-shard-00-01-rv1wz.mongodb.net:27017,cluster0-shard-00-02-rv1wz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
//}

process.env.URLDB = urlDB; //La que pongo en el server.js linea 17


