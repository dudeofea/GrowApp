const express = require('express');
var path = require('path');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;
//const publicPath = path.resolve(__dirname, 'public');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  res.send({'Hello From Express' });
});

function get_table(table_name, res){
	db.all('SELECT * FROM '+table_name, function (err, rows) {
		console.log(err);
		if(err == null || rows != null){
			res.send(rows);
		}else{
			res.send([]);
		}
    })
}

app.get('/api/pots', (req, res) => {
	get_table("pots", res);
});

//valve api endpoints
app.get('/api/valve/open', (req, res) => {
	open_valve();
	res.send("done");
});
app.get('/api/valve/close', (req, res) => {
	close_valve();
	res.send("done");
});

//sensor api endpoints
var soil_moisture = 0;
var air_humidity = 0;
var temperature = 0;
app.get('/api/sensor/soil_moisture', (req, res) => {
	res.send(String(soil_moisture));
});
app.get('/api/sensor/air_humidity', (req, res) => {
	res.send(String(air_humidity));
});
app.get('/api/sensor/temperature', (req, res) => {
	res.send(String(temperature));
});

app.listen(port, () => console.log(`Express backend listening on port ${port}`));

db.serialize(function () {
  db.run('CREATE TABLE pots (info TEXT)')
  var stmt = db.prepare('INSERT INTO pots VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()
})

//db.close()

var serial_sem = false;
function open_valve(){
	while(serial_sem){}
	serial_sem = true;
	//open the valve
	serialport.write("1\n");
	serial_sem = false;
}
function close_valve(){
	while(serial_sem){}
	serial_sem = true;
	//close the valve
	serialport.write("2\n");
	serial_sem = false;
}

const SerialPort = require("serialport");
var serialport = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });
serialport.setEncoding("utf8");
serialport.on('open', function(){
  console.log('Serial Port Opened');
  var buf = "";
  serialport.on('data', function(data){
	  buf += data;
	  if(data.length > 0 && data[data.length-1] == "\n"){
		  //log the data
		  var values = buf.trim().split(",");
		  soil_moisture = parseInt(values[0]);
		  air_humidity = parseFloat(values[1]);
		  temperature = parseFloat(values[2]);
		  buf = "";
	  }
  });
});
