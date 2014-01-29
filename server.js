var fs = require('fs'),
path = require('path'),
sio = require('socket.io'),
static = require('node-static'),
sanitize = require('validator').sanitize,

MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/cf', function(err, db) {
	if (err) throw err;

	var app = require('http').createServer(handler);
	var visitas = 1;
	var day = 0;
	publicIps = [];
	app.listen(3000);

	var file = new static.Server(path.join(__dirname,'/'));

	function handler(req, res) {
		file.serve(req, res);
	}

	var io = sio.listen(app);

io.set('log level', 1);

	io.sockets.on('connection', function (socket) {

		visitas++

		socket.on('ipinfo', function(info){

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();
			var fecha = dd + '/' + mm + '/' + yyyy;

			if(dd != day){
				publicIps = [info];
				visitas = 1;
				day = dd;
				db.collection('visitas', function(err,collection){
                    doc = {"fecha": fecha, "unicas": publicIps.length, "impresiones": visitas};
                    collection.insert(doc, function(){});
                });

			} else {
					var index = publicIps.indexOf(info);
					if(index == -1){
						publicIps.push(info)				                    
			    	}
			    	updateIps(fecha);
			 }
		});

	function updateIps(fecha){
		console.log(visitas)
		
		db.collection('visitas').update({fecha: fecha}, {$set: {unicas: publicIps.length, impresiones:visitas}}, {w:1}, function(err) {
                                if (err) console.warn(err.message);
                        });
	}

	});
});
